import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import useUserStore from 'stores/useUserStore';

import { User } from 'types/User';
import { Role } from 'types/common';

import paths from 'constants/paths';

interface ProtectedRouteProps {
  exact?: boolean;
  path: string;
  component?: React.ComponentType;
  render?: () => React.ReactNode;
  requiredRoles: string[];
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { exact = false, path, component, requiredRoles: requiredPermissions, render } = props;

  const user = useUserStore(state => state.data);

  const { roles: currentUserRoles } = user as User;

  const isAuthorized =
    currentUserRoles &&
    requiredPermissions.some(requiredRole =>
      currentUserRoles.some((role: Role) => role.name === requiredRole)
    );

  if (!isAuthorized) {
    console.log('Unauthorized access');

    return <Redirect to={paths.signin} />;
  }

  return <Route exact={exact} path={path} component={component} render={render} />;
}

export default ProtectedRoute;
