import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, User } from 'types/common';

import api from 'constants/api';

export async function fetchUsers(params: Any, signal?: AbortSignal): Promise<User[]> {
  const url = buildUrl(api.auth.users);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchUserById(
  id: number,
  params: Any,
  signal?: AbortSignal
): Promise<User[]> {
  const url = buildUrl(api.auth.users, id);

  const { data } = await http.get(url, { signal, params });

  return data;
}
