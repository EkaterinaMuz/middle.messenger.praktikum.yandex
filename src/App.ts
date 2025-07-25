import { Router } from './infrastructure/routing';

import {ChatPage, ErrorPage, LoginPage, PasswordPage, ProfileEditPage, ProfilePage, SignupPage} from "./routes";

export default class App {
  constructor() {}

  public async init() {
      this.router
          .register('/messenger', ChatPage)
          .register(new RegExp('/(\\d+)'), ChatPage)
          .register('/login', LoginPage)
          .register('/sign-up', SignupPage)
          .register('/profile', ProfilePage)
          .register('/settings', ProfileEditPage)
          .register('/password-edit', PasswordPage)
          .registerFallback(ErrorPage);

      this.router.init();
  }

  private router = Router.getInstance();

  }
