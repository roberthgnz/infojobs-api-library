import type { OAuth2ClientOptions } from 'infojobs-auth-library';

import { auth } from './infojobs';

import { buildUrl } from './utils';

export interface APIClientOptions extends OAuth2ClientOptions {
  version: string;
  verificationCode: string;
}

export const APIClient = async (credentials: APIClientOptions) => {
  const { version, ...options } = credentials;

  if (!options.clientId) {
    throw new Error('clientId is required');
  }

  if (!options.clientSecret) {
    throw new Error('clientSecret is required');
  }

  if (!options.redirectUri) {
    throw new Error('redirectUri is required');
  }

  if (!options.verificationCode) {
    throw new Error('verificationCode is required');
  }

  const authClient = new auth(options);

  const token = await authClient.getAccessToken(options.verificationCode);

  console.log('TOKEN', token);

  return {
    candidate: {
      async list() {
        const url = buildUrl({ version, path: 'candidate' });

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        return response.json();
      },
      async skill() {},
      async skillcategory() {},
    },
  };
};
