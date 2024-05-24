'use server';
import { cookies, headers } from 'next/headers';

const isClient = () => typeof window !== 'undefined';

export const getCookieHeader = async () => {
  const cookie = headers().get('Cookie');

  return cookie;
};

export const getServerHeader = async () => {
  if (isClient()) {
    return {};
  }

  const cookie = await getCookieHeader();

  return { host: 'ticketing-local.dev', cookie };
};

export const deleteCookie = async () => {
  cookies().delete('Cookie');
};
