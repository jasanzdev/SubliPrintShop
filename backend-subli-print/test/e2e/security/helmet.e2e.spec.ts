import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { csrfRoute } from '../../utils/constants';
import { envs } from 'src/config/envs';
import { createTestApp } from '../../utils/create-app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Helmet Middleware (e2e)', () => {
  let app: NestExpressApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const result = await createTestApp({ useCsrf: true, mongoUri: uri });
    app = result.app;
    envs.whitelist = ['https://myfrontend.com'];
  });

  it('should have the security headers established by helmet', async () => {
    const res = await request(app.getHttpServer())
      .get(csrfRoute)
      .set('Cross-Origin-Opener-Policy', 'same-origin');

    expect(res.headers['x-dns-prefetch-control']).toBe('off');
    expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(res.headers['strict-transport-security']).toBe(
      'max-age=31536000; includeSubDomains',
    );
    expect(res.headers['x-download-options']).toBe('noopen');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-xss-protection']).toBe('0');
    expect(res.headers['x-permitted-cross-domain-policies']).toBe('none');
    expect(res.headers['referrer-policy']).toBe('no-referrer');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });
});
