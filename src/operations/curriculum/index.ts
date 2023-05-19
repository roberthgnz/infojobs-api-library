import type { APICredentials } from '../../api';
import type { DetailType, Education, Experience, FutureJob, PersonalData, Skill } from './types';

import { API_URL } from '../../shared/contstants';
import { toBase64 } from '../../shared/utils';

/**
 * For an authenticated candidate, it provides visualization and edition of CV data: candidate's experience, qualifications, skills and personal details. Candidates may have up to 5 different CVs.
 */
export const curriculum = (credentials: APICredentials) => {
  return {
    /**
     * Returns a list with the Curriculums available for the authenticated user.
     */
    async list({ token }: { token: string }) {
      const ENDPOINT_API_VERSION = '2';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    /**
     * Provides the authenticated candidate’s full CV, which is optionally added by the user as an extended CV.
     */
    async get({ token, curriculumId }: { token: string; curriculumId: string }) {
      const ENDPOINT_API_VERSION = '1';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    /**
     * Provides a plain text format version of the authenticated candidate’s full CV, which is optionally added by the user as an extended CV.
     */
    async getAsText({ token, curriculumId }: { token: string; curriculumId: string }) {
      const ENDPOINT_API_VERSION = '1';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/cvtext`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    details: ['education', 'experience', 'futurejob', 'personaldata', 'skill'].reduce((acc, detail) => {
      acc[detail as DetailType] = async ({ token, curriculumId }: { token: string; curriculumId: string }) => {
        const ENDPOINT_API_VERSION: Record<DetailType, number> = {
          education: 1,
          experience: 1,
          futurejob: 4,
          personaldata: 2,
          skill: 2,
        };

        const url = `${API_URL}/${ENDPOINT_API_VERSION[detail as DetailType]}/curriculum/${curriculumId}/${detail}`;

        const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${basic}, Bearer ${token}`,
          },
        });

        return response.json() as Promise<
          DetailType extends 'education'
            ? Education
            : DetailType extends 'experience'
            ? Experience
            : DetailType extends 'futurejob'
            ? FutureJob
            : DetailType extends 'personaldata'
            ? PersonalData
            : DetailType extends 'skill'
            ? Skill
            : any
        >;
      };
      return acc;
    }, {} as Record<DetailType, ({ token, curriculumId }: { token: string; curriculumId: string }) => Promise<DetailType extends 'education' ? Education : DetailType extends 'experience' ? Experience : DetailType extends 'futurejob' ? FutureJob : DetailType extends 'personaldata' ? PersonalData : DetailType extends 'skill' ? Skill : any>>),
  };
};
