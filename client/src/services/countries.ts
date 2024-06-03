import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, Country } from 'types/common';

import api from 'constants/api';

export async function fetchCountries(params: Any, signal?: AbortSignal): Promise<Country[]> {
  const url = buildUrl(api.auth.countries);

  const { data } = await http.get(url, { signal, params });

  console.log(data);
  return data;
}
