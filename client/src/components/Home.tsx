import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import Leave from 'pages/leave/Leave';
import AppyLeave from 'pages/leave/AppyLeave';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';
import routes from 'constants/routes';

function Home() {
  return (
    <Switch>
      <Route exact path={routes.home} component={Dashboard} />

      <Route exact path={routes.leave} component={Leave} />

      <Route exact path={routes.applyleave} component={AppyLeave} />

      <Redirect to={createRoute([paths.home])} />
    </Switch>
  );
}

export default Home;
