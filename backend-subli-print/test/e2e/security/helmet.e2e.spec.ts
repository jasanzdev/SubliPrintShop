import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { csrfRoute } from '../../utils/constants';
import { envs } from 'src/config/envs';
import { createTestApp } from '../../utils/create-app';

describe('Helmet Middleware (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    app = await createTestApp({ useCsrf: false });
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
    await app.close();
  });
});
