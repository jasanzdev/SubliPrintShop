import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGO_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
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
};
