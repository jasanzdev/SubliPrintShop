import * as request from 'supertest';
import { createTestApp } from '../utils/create-app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { invalidOrigin, routeTest, validOrigin } from '../utils/constants';
import { envs } from 'src/config/envs';

describe('CORS and CSRF E2E', () => {
  let app: NestExpressApplication;
  envs.whitelist = ['https://myfrontend.com'];

  beforeAll(async () => {
    app = await createTestApp();
  });

  it('should return a CSRF token and set the sessionId cookie.', async () => {
    const res = await request(app.getHttpServer())
      .get(routeTest)
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
      .get(routeTest)
      .set('Origin', invalidOrigin);

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
