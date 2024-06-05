import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { User } from 'types/common';

import api from 'constants/api';

export async function fetchCurrentUser(signal?: AbortSignal): Promise<User> {
  const url = buildUrl(api.auth.currentUser);

  const { data } = await http.get(url, { signal });
  return data;
}
