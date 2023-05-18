import { offer } from './operations/offer';
import { curriculum } from './operations/curriculum';

export interface APICredentials {
  clientId: string;
  clientSecret: string;
}

export const APIClient = (credentials: APICredentials) => {
  return {
    offer: offer(credentials),
    curriculum: curriculum(credentials),
  };
};
