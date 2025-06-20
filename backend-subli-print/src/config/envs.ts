import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGO_URL: string;
  REDIS_URL: string;
  FRONT_URL: string;
  NODE_ENV?: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
    REDIS_URL: joi.string().required(),
    FRONT_URL: joi.string().required(),
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
  nodeEnv: envVars.NODE_ENV || 'development',
  graphqlComplexity: {
    development: 25,
    production: 15,
  },
};
