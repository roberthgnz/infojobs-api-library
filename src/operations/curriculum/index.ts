import type { APICredentials } from '../../api';

import { API_URL } from '../../shared/contstants';
import { toBase64 } from '../../shared/utils';

type DetailType = 'education' | 'experience' | 'futurejob' | 'personaldata' | 'skill';

interface Education {
  // Education interface properties
}

interface Experience {
  // Experience interface properties
}

interface FutureJob {
  // FutureJob interface properties
}

interface PersonalData {
  // PersonalData interface properties
}

interface Skill {
  // Skill interface properties
}

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
    /**
     * Allows to read the education of a CV that belongs to the authenticated user. Only non null fields will not be displayed in the response.
     */

    // TODO: Hacerlo con Proxye
    // details.education
    // details.experience
    // details.futurejob
    // details.personaldata
    // details.skill
    async getEducation({
      token,
      curriculumId,
      details,
      educationId,
    }: {
      token: string;
      curriculumId: string;
      details?: boolean;
      educationId?: string;
    }) {
      const ENDPOINT_API_VERSION = '1';

      let url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/education`;

      if (details) {
        if (!educationId) {
          throw new Error('educationId is required when details is set to true');
        }
        url += `/${educationId}`;
      }

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    async getExperience({
      token,
      curriculumId,
      details,
      experienceId,
    }: {
      token: string;
      curriculumId: string;
      details?: boolean;
      experienceId?: string;
    }) {
      const ENDPOINT_API_VERSION = '1';

      let url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/experience`;

      if (details) {
        if (!experienceId) {
          throw new Error('experienceId is required when details is set to true');
        }
        url += `/${experienceId}`;
      }

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    async getFutureJob({ token, curriculumId }: { token: string; curriculumId: string }) {
      const ENDPOINT_API_VERSION = '1';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/futurejob`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    async getPersonalData({ token, curriculumId }: { token: string; curriculumId: string }) {
      const ENDPOINT_API_VERSION = '1';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/personaldata`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },
    async getSkill({ token, curriculumId }: { token: string; curriculumId: string }) {
      const ENDPOINT_API_VERSION = '1';

      const url = `${API_URL}/${ENDPOINT_API_VERSION}/curriculum/${curriculumId}/skill`;

      const basic = toBase64(`${credentials.clientId}:${credentials.clientSecret}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${basic}, Bearer ${token}`,
        },
      });

      return response.json();
    },

    details: new Proxy(
      {},
      {
        get: (_, detail: DetailType) => {
          if (!['education', 'experience', 'futurejob', 'personaldata', 'skill'].includes(detail)) {
            throw new Error('Invalid detail type');
          }

          return async ({ token, curriculumId }: { token: string; curriculumId: string }) => {
            const ENDPOINT_API_VERSION: Record<DetailType, number> = {
              education: 1,
              experience: 1,
              futurejob: 4,
              personaldata: 2,
              skill: 2,
            };

            const url = `${API_URL}/${ENDPOINT_API_VERSION[detail]}/curriculum/${curriculumId}/${detail}`;

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
                : never
            >;
          };
        },
      },
    ),
  };
};
