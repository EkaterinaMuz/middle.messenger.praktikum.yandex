export const RouteConfigPaths = {
  chat: 'chat',
  login: 'login',
  signup: 'signup',
  profile: 'profile',
  edit: 'edit',
  password: 'password',
  error: 'error',
} as const;

export type RouteConfigPaths = keyof typeof RouteConfigPaths;
