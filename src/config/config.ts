import * as dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required(),
  SENDINBLUE_API_KEY: Joi.string().required(),
  EMAIL_FROM: Joi.string().email().required(),
  EMAIL_TO: Joi.string().email().required(),
  FLW_PUBLIC_KEY: Joi.string().required(),
  FLW_SECRET_KEY: Joi.string().required(),
  FLW_SECRET_HASH: Joi.string().required()
});

const { value: validatedEnv, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
  throw new Error(
    `Env variables error: \n ${error.details.map((e) => e.message).join('\n')}`
  );
}

const config = {
  node_env: validatedEnv.NODE_ENV,
  port: validatedEnv.PORT,
  cors: {
    cors_origin: validatedEnv.CORS_ORIGIN
  },
  email: {
    sendinblue_api_key: validatedEnv.SENDINBLUE_API_KEY,
    from: validatedEnv.EMAIL_FROM,
    to: validatedEnv.EMAIL_TO
  },
  flutterwave: {
    public_key: validatedEnv.FLW_PUBLIC_KEY,
    secret_key: validatedEnv.FLW_SECRET_KEY,
    secret_hash: validatedEnv.FLW_SECRET_HASH
  }
} as const;

export default config;
