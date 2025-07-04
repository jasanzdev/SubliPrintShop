import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { csrfRoute, invalidOrigin, validOrigin } from '../../utils/constants';
import { envs } from 'src/config/envs';
import { createTestApp } from '../../utils/create-app';

describe('CORS and CSRF E2E', () => {
  let app: NestExpressApplication;
  envs.whitelist = ['https://myfrontend.com'];

  beforeAll(async () => {
    app = await createTestApp({ useCsrf: true });
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
    await app.close();
  });
});
