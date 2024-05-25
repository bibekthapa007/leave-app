import { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SignIn from 'pages/signin/SignIn';

import useUserStore from 'stores/useUserStore';

import AuthRoute from 'components/AuthRoute';
import Home from 'components/Home';

import { createRoute } from 'utils/route';

import { User } from 'types/User';

import paths from 'constants/paths';

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { data: user, loading, fetchUser, updateUser, removeUser } = useUserStore();

  useEffect(() => {
    const fakeUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'Bibek',
      department: 'PMT',
      phone: '123',
      country: 'Nepal',
      designation: {
        id: 1,
        name: 'Software Engineer',
      },
      roles: [
        {
          id: 1,
          name: 'Admin',
        },
      ],
    };

    updateUser(fakeUser);
    // removeUser();
  }, [updateUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Route exact path={createRoute([paths.signin])} component={SignIn} />

          <AuthRoute path={paths.home}>
            <Route path={createRoute([])} component={Home} />
          </AuthRoute>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
