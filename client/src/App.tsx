import React, { useEffect } from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AuthRoute from 'components/AuthRoute';
import Home from 'components/Home';

import paths from 'utils/path';
import { createRoute } from 'utils/route';

import { User } from 'types/User';

import Dashboard from 'pages/dashboard/Dashboard';
import SignIn from 'pages/signin/SignIn';

import useUserStore from './stores/useUserStore';
import { ColorModeSwitcher } from './ColorModeSwitcher';

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
    removeUser();
  }, [updateUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <BrowserRouter>
        <Route exact path={createRoute([paths.signin])} component={SignIn} />

        <AuthRoute path={paths.home}>
          <Route path={createRoute([])} component={Home} />
        </AuthRoute>
      </BrowserRouter>
    </ChakraProvider>
  );
}
