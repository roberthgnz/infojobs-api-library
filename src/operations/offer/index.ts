import type { APICredentials } from '../../api';
import type { OfferDetailParameters, OfferDetailResponse, OfferListParameters, OfferListResponse } from './types';

import { API_URL } from '../../shared/contstants';
import { toBase64 } from '../../shared/utils';

type Parameters = {
  [key: string]: string;
};

/**
 * Provides results list of job offers according to job search criteria. Includes job offer details: job description, candidate requirements and company details.
 */
export const offer = (credentials: APICredentials) => {
  const auth = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

  return {
    /**
     * Returns a list of Job Offers that comply with the search criteria.
     */
    async list(parameters: OfferListParameters): Promise<OfferListResponse> {
      const ENDPOINT_API_VERSION = '9';

      const query = new URLSearchParams(parameters as unknown as Parameters).toString();

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/offer?${query}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      return response.json();
    },
    /**
     * Returns the detail of the offer with the given id.
     */
    async get({ offerId }: OfferDetailParameters): Promise<OfferDetailResponse> {
      const ENDPOINT_API_VERSION = '7';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/offer/${offerId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      return response.json();
    },
  };
};
