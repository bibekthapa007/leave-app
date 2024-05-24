import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import paths from 'utils/path';
import { createRoute } from 'utils/route';

import Dashboard from 'pages/dashboard/Dashboard';

function Home() {
  return (
    <Switch>
      <Route exact path={createRoute([paths.home])} component={Dashboard} />

      <Redirect to={createRoute([paths.home])} />
    </Switch>
  );
}

export default Home;
