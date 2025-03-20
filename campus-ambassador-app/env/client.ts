import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_AWS_COGNITO_REGION: z.string(),
    NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID: z.string(),
    NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID: z.string(),
    NEXT_PUBLIC_AWS_COGNITO_DOMAIN: z.string(),
    NEXT_PUBLIC_REDIRECT_SIGN_IN: z.string().url(),
    NEXT_PUBLIC_REDIRECT_SIGN_OUT: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_WEB_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_AWS_COGNITO_REGION: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID:
      process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
    NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID:
      process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID,
    NEXT_PUBLIC_AWS_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN,
    NEXT_PUBLIC_REDIRECT_SIGN_IN: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
    NEXT_PUBLIC_REDIRECT_SIGN_OUT: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
});
