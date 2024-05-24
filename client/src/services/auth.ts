import axios from 'axios';
import { redirect } from 'next/navigation';

import { buildUrl } from '@/utils/string';
import paths from '@/utils/path';

import api from '@/constants/api';

import { deleteCookie, getServerHeader } from './server';

export const signUp = async (data: { email: string; name: string; password: string }) => {
  try {
    const response = await axios.post(api.auth.signUp, data, {
      withCredentials: false,
    });

    return response.data;
  } catch (error: any) {
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
      redirect(paths.signin);
    }

    throw error;
  }
};
