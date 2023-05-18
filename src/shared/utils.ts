import type { OperationPath } from '../types';

import { API_URL } from './contstants';

export const buildUrl = ({ version, path }: { version: string; path: OperationPath }) => {
  return `${API_URL}/${version}/${path}`;
};

export const toBase64 = (str: string) => Buffer.from(str || '', 'utf8').toString('base64');

/**
 * Replace the parameters in the url with the values in the parameters array
 * @example
 * urlpr(
 *  "/api/1/curriculum/{curriculumId}",
 *  { curriculumId: "9248429800" }
 * );
 * // "/api/1/curriculum/9248429800"
 */
export const urlpr = (
  url: string,
  parameters: {
    [key: string]: string;
  },
) => {
  return url.replace(/{([^{}]*)}/g, (a, b) => {
    const r = parameters[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
};
