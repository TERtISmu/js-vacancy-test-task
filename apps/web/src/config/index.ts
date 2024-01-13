import { z } from 'zod';

import { configUtil } from 'utils';

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const schema = z.object({
  APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  IS_DEV: z.preprocess(
    () => process.env.APP_ENV === 'development',
    z.boolean(),
  ),
  API_URL: z.string(),
  WS_URL: z.string(),
  WEB_URL: z.string(),
  MIXPANEL_API_KEY: z.string().optional(),

  API_KEY: z.string().optional(),
  AUTH_DOMAIN: z.string().optional(),
  PROJECT_ID: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
  MESSAGING_SENDER_ID: z.string().optional(),
  APP_ID: z.string().optional(),
  MEASUREMENT_ID: z.string().optional(),
  FIREBASE_USER: z.string().optional(),
  FIREBASE_AUTH: z.string().optional(),
});

type Config = z.infer<typeof schema>;

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side, so we need to destruct manually.
 */
const processEnv = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  MIXPANEL_API_KEY: process.env.NEXT_PUBLIC_MIXPANEL_API_KEY,
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  FIREBASE_USER: process.env.FIREBASE_USER,
  FIREBASE_AUTH: process.env.FIREBASE_AUTH,
} as Record<keyof Config, string | undefined>;

const config = configUtil.validateConfig<Config>(schema, processEnv);

export default config;
