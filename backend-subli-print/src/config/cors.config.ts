import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envs } from './envs';

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
    if (!ok) {
      if (envs.nodeEnv === 'test') {
        return callback(null, false);
      }
      return callback(new Error('CORS not allowed'), false);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'x-csrf-token',
  ],
  preflightContinue: false,
};
