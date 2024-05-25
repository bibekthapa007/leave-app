const isClient = () => typeof window !== 'undefined';

const api = {
  baseUrl: isClient()
    ? 'https://ticketing-local.dev'
    : 'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
  auth: {
    signUp: '/api/auth/users/signup',
    signIn: '/api/auth/users/signin',
    currentUser: '/api/auth/users/currentuser',
  },
  leave: {
    leave: '/api/leave',
    updateLeave: '/api/leave/:id',
  },
};

export default api;
