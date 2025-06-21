import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envs } from '../config/envs';

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) return callback(null, true);
    const allowed = envs.whitelist ?? [];
    const ok =
      allowed.includes(origin) ||
      allowed.some((a) => {
        try {
          return new URL(origin).hostname === new URL(a).hostname;
        } catch {
          return false;
        }
      });
    return callback(ok ? null : new Error('CORS not allowed'), ok);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token',
  ],
  preflightContinue: false,
};
