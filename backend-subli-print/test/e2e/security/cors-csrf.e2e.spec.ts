import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { csrfRoute, invalidOrigin, validOrigin } from '../../utils/constants';
import { envs } from 'src/config/envs';
import { createTestApp } from '../../utils/create-app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('CORS and CSRF E2E', () => {
  let app: NestExpressApplication;
  let mongod: MongoMemoryServer;
  envs.whitelist = ['https://myfrontend.com'];

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const result = await createTestApp({ useCsrf: true, mongoUri: uri });
    app = result.app;
  });

  it('should return a CSRF token and set the sessionId cookie.', async () => {
    const res = await request(app.getHttpServer())
      .get(csrfRoute)
      .set('Origin', validOrigin);

    expect(res.status).toBe(200);

    const csrfToken = (res.body as Record<'csrfToken', string>).csrfToken;

    expect(csrfToken).toBeDefined();

    expect(res.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('XSRF-TOKEN='),
        expect.stringContaining('sessionId='),
      ]),
    );
  });

  it('should reject not allowed origin by CORS', async () => {
    const res = await request(app.getHttpServer())
      .get(csrfRoute)
      .set('Origin', invalidOrigin);

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });
});
