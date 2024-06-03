import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import Leave from 'pages/leave/Leave';
import AppyLeave from 'pages/leave/AppyLeave';
import Profile from 'pages/profile/Profile';
import Employee from 'pages/employee/Employee';
import LeaveBalance from 'pages/leave/LeaveBalance';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';
import routes from 'constants/routes';

function Home() {
  return (
    <Switch>
      <Route exact path={routes.home} component={Dashboard} />

      <Route exact path={routes.leave} component={Leave} />

      <Route exact path={routes.applyleave} component={AppyLeave} />

      <Route exact path={routes.profile} component={Profile} />

      <Route exact path={routes.employee} component={Employee} />

      <Route exact path={routes.leavebalance} component={LeaveBalance} />

      <Redirect to={createRoute([paths.home])} />
    </Switch>
  );
}

export default Home;
