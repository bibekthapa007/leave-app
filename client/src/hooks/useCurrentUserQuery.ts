import { useQuery } from '@tanstack/react-query';

import { fetchCurrentUser } from 'services/currentUser';

import { User } from 'types/common';

import queryKey from 'constants/queryKey';

export const useCurrentUserQuery = () => {
  const currentUserQuery = useQuery<User>({
    queryKey: [queryKey.currentUser],
    queryFn: ({ signal }) => fetchCurrentUser(signal),
  });

  return currentUserQuery;
};
