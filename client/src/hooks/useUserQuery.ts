import { useQuery } from '@tanstack/react-query';

import { fetchUserById } from 'services/users';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useUserQuery = (id: number, params?: DefaultObject) => {
  const userQuery = useQuery({
    queryKey: [queryKey.user],
    queryFn: ({ signal }: Any) => fetchUserById(id, params, signal),
    enabled: !!params,
  });

  return userQuery;
};
