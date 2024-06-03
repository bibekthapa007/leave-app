import config from 'config/config';

const api = {
  baseUrl: config.apiBaseURI as string,
  auth: {
    basePath: '/auth',
    signUp: '/auth/users/signup',
    signIn: '/auth/users/signin',
    currentUser: `/auth/users/currentuser`,
    logout: `/auth/users/logout`,
    designations: '/auth/designations',
    roles: '/auth/roles',
    users: '/auth/users',
    countries: '/auth/countries',
    leaveTypes: '/auth/leave-types',
    leaves: '/auth/leaves',
  },
  leave: {
    leave: '/leave',
    updateLeave: '/leave/:id',
  },
};

export default api;
