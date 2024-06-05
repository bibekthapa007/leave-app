import { useQuery } from '@tanstack/react-query';

import { fetchUsers } from 'services/auth';

import { Any, DefaultObject } from 'types/common';

import paths from 'constants/paths';

export const useUsersQuery = (params: DefaultObject = {}) => {
  const usersQuery = useQuery({
    queryKey: [paths.leave],
    queryFn: ({ signal }: Any) => fetchUsers(params),
    enabled: !!params,
  });

  return usersQuery;
};
