import { doubleCsrf } from 'csrf-csrf';
import type { Request } from 'express';
import { envs } from './envs';

const getSessionIdentifier = (req: Request): string => {
  const cookies = req.cookies as Record<string, unknown>;
  const sid = cookies['sessionId'];
  return typeof sid === 'string' && sid.length > 0 ? sid : req.ip || '';
};

const getCsrfTokenFromRequest = (req: Request): string | undefined => {
  const csrfFromHeader = req.headers['x-csrf-token'];
  const body = req.body as Record<string, unknown>;

  const csrfFromBody =
    typeof body === 'object' &&
    body !== null &&
    typeof body['_csrf'] === 'string'
      ? body['_csrf']
      : undefined;

  return csrfFromHeader || csrfFromBody;
};

export const csrf = doubleCsrf({
  getSecret: () => envs.csrfSecret,
  getSessionIdentifier,
  getCsrfTokenFromRequest,
  cookieName: 'XSRF-TOKEN',
  cookieOptions: {
    httpOnly: false,
    sameSite: 'lax',
    secure: envs.nodeEnv === 'production',
    path: '/',
  },
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

export const csrfUtils = {
  getSessionIdentifier,
  getCsrfTokenFromRequest,
};
