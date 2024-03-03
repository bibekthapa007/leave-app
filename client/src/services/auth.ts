import axios from 'axios';

import api from '@/constants/api';

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
