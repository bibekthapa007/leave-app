/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import paths from 'utils/path';
import { buildUrl } from 'utils/string';

import api from 'constants/api';

import { getServerHeader } from './server';

export const signUp = async (data: { email: string; name: string; password: string }) => {
  try {
    const response = await axios.post(api.auth.signUp, data, {
      withCredentials: false,
    });

    return response.data;
  } catch (error: any) {
    console.log(error, 'error');
    throw error;
  }
};

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(api.auth.signIn, data, {
      withCredentials: false,
    });

    return response.data;
  } catch (error) {
    console.log(error, 'error');
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const headers = await getServerHeader();

    const response = await axios.get(buildUrl(api.baseUrl, api.auth.currentUser), {
      headers,
    } as any);

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // TODO: handle redirect
      const history = useHistory();
      history.push(paths.signin);
    }

    throw error;
  }
};
