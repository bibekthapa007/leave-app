const dbTables = {
  users: 'users',
  designations: 'designations',
  roles: 'roles',
  userRoles: 'user_roles',
  countries: 'countries',
  leaveTypes: 'leave_types',
  leaveCredits: 'leave_credits',
  fiscalYears: 'fiscal_years',
  leaveRequests: 'leave_requests',
  notifications: 'notifications',
} as const;

export default dbTables;
