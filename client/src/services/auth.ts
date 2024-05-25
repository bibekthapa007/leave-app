import { buildUrl } from 'utils/string';
// eslint-disable-next-line import/no-cycle
import http from 'utils/http';

import api from 'constants/api';

export const signUp = async (data: { email: string; name: string; password: string }) => {
  const response = await http.post(api.auth.signUp, data, {
    withCredentials: false,
  });

  return response.data;
};

export const signIn = async (data: { email: string; password: string }) => {
  const response = await http.post(api.auth.signIn, data, {
    withCredentials: false,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get(buildUrl(api.baseUrl, api.auth.currentUser));

  return response.data;
};

export const logout = async () => {
  const response = await http.get(buildUrl(api.baseUrl, api.auth.currentUser));

  return response.data;
};
