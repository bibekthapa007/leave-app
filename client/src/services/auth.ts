import axios from 'axios';

import api from '@/constants/api';

export const signUp = async (data: { email: string; name: string; password: string }) => {
  try {
    const response = await axios.post(api.auth.signUp, data);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      return error.response.data.errors;
    }

    if (error?.response?.data) {
      return error.response.data;
    }

    return error;
  }
};

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(api.auth.signUp, data);

    return response.data;
  } catch (error) {
    return error;
  }
};
