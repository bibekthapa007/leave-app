/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Leave, LeaveTypeEnum } from 'types/Leave';

import api from 'constants/api';

export async function fetchLeaves(params: any, signal?: AbortSignal): Promise<Leave[]> {
  const url = buildUrl(api.leave.leave);

  return [
    { id: 1, date: '2024-01-01', status: 'pending', description: 'des', type: LeaveTypeEnum.SICK },
  ];

  const { data } = await http.get(url, { signal, params });

  return data;
}

export const createLeave = async (data: Leave) => {
  const response = await http.post(api.leave.leave, data);

  return response.data;
};

export const updateLeave = async (data: Leave) => {
  const response = await axios.post(api.leave.leave, data);

  return response.data;
};
