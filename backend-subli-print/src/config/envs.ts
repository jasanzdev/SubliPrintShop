import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGO_URL: string;
  REDIS_URL: string;
  FRONT_URL: string;
  NODE_ENV?: string;
  CSRF_SECRET: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URI: string;
  FRONTEND_CALLBACK_URI: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
    REDIS_URL: joi.string().required(),
    FRONT_URL: joi.string().required(),
    CSRF_SECRET: joi.string().required(),
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URI: joi.string().required(),
    FRONTEND_CALLBACK_URI: joi.string().required(),
    NODE_ENV: joi.string().default('development'),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  mongoUrl: envVars.MONGO_URL,
  whitelist: [envVars.FRONT_URL],
  redisUrl: envVars.REDIS_URL,
  csrfSecret: envVars.CSRF_SECRET,
  nodeEnv: envVars.NODE_ENV || 'development',
  jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
  googleId: envVars.GOOGLE_CLIENT_ID,
  googleSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: envVars.GOOGLE_CALLBACK_URI,
  frontendRedirectUri: envVars.FRONTEND_CALLBACK_URI,
};
