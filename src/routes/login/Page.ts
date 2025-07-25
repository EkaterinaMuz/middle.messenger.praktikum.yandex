import { Button, FormItem, Link } from '../../components';
import Block from '../../framework/Block.ts';
import { handleSubmit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './LoginForm.module.css';
import {navigate} from "../../infrastructure/utils";
import {LoginController} from "../../domains/login/LoginController.ts";


export class LoginPage extends Block {
  public constructor(props = {}) {
    super({
      formName: 'Login',
      fields: [
        new FormItem({
          fieldName: 'Login',
          id: 'login',
          type: 'login',
          name: 'login',
          required: true,
          placeholder: 'john879@gmail.com',
        }),
        new FormItem({
          fieldName: 'Password',
          id: 'password',
          type: 'password',
          name: 'password',
          required: true,
          placeholder: '••••••••••••',
        }),
      ],
      Button: new Button({
        type: "submit",
        label: "Sign in",
      }),
      ResetPasswordLink: new Link({
        dataPage: "signup",
        href: "#",
        label: 'Create profile',
          events: {
              click: (e: Event) => navigate(e,'/sign-up')
          },
      }),
      styles: {
        card: styles.card,
        loginForm: styles.loginForm,
        legend: styles.loginForm__legend,
        text: styles.loginForm__text,
        link: styles.loginForm__link,
        fieldset: styles.loginForm__fieldset,
        info: styles.loginForm__info
      },
      events: {
          submit: (e: Event) => this.login(e)
      },
      ...props
    });
  }

    private async login(e: Event) {

        const data = handleSubmit(e);

        if (!data) {
            return;
        };

        if (
            typeof data.login !== 'string' ||
            typeof data.password !== 'string'
        ) {
            console.error('Некорректные данные для регистрации');
            return;
        }

        const controller = new LoginController();

       const response = await controller.login({  login: 'string',
            password: 'string'});

        if (response?.status === 200) {
            navigate(e,'/');
        }


    }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

