import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, Designation } from 'types/common';

import api from 'constants/api';

export async function fetchRoles(params: Any, signal?: AbortSignal): Promise<Designation[]> {
  const url = buildUrl(api.auth.roles);

  const { data } = await http.get(url, { signal, params });

  return data;
}
