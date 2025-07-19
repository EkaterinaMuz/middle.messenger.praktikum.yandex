import { Button, FormItem, Link } from '../../components';
import Block from '../../framework/Block.ts';
import { handleSubmit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './LoginForm.module.css';


class Page extends Block {
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
      Link: new Link({
        dataPage: "signup",
        href: "/signUp",
        label: 'Create profile'
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
          submit: (e: Event) => handleSubmit(e)
      },
      ...props
    });
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

export const LoginPage = new Page();

