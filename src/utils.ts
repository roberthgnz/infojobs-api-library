import type { OperationPath } from './types';

import { API_URL } from './contstants';

export const buildUrl = ({ version, path }: { version: string; path: OperationPath }) => {
  return `${API_URL}/${version}/${path}`;
};
