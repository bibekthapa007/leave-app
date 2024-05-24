import axios from 'axios';

import api from 'constants/api';

import { getServerHeader } from './server';

const isClient = () => typeof window !== 'undefined';

const customAxios = async () => {
  if (isClient()) {
    return axios.create({
      baseURL: api.baseUrl,
    });
  }

  console.log('yeeee');

  const headers = await getServerHeader();

  console.log(headers, 'eeeeeeeeeeeee');

  return axios.create({ baseURL: api.baseUrl });
};

export default customAxios;
