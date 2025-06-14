import type { RouteConfigPaths } from './types';

export const routes: Record<RouteConfigPaths, () => Promise<string>> = {
  login: async () => {
    const { LoginPage } = await import('../../routes');

    return LoginPage;
  },
  signup: async () => {
    const { SignPage } = await import('../../routes');

    return SignPage;
  },
  chat: async () => {
    const { ChatPage } = await import('../../routes');

    return ChatPage;
  },

  profile: async () => {
    const { ProfilePage } = await import('../../routes');

    return ProfilePage;
  },
  edit: async () => {
    const { ProfileEditPage } = await import('../../routes');

    return ProfileEditPage;
  },
  password: async () => {
    const { PasswordPage } = await import('../../routes/password');

    return PasswordPage;
  },
  error: async () => {
    const { ErrorPage } = await import('../../routes/error');

    return ErrorPage;
  },
};
