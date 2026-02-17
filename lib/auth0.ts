import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  ...(process.env.AUTH0_AUDIENCE && {
    authorizationParameters: {
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
});
