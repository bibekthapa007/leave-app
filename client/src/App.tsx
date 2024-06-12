import { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';

import useUserStore from 'stores/useUserStore';

import AuthRoute from 'components/AuthRoute';
import Home from 'components/Home';
import Toast from 'components/Toast';

import { createRoute } from 'utils/route';

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
  const { loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Toast />
        <BrowserRouter>
          <Route exact path={createRoute([paths.signin])} component={SignIn} />

          <Route exact path={createRoute([paths.signup])} component={SignUp} />

          <AuthRoute path={paths.home}>
            <Route path={createRoute([])} component={Home} />
          </AuthRoute>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
