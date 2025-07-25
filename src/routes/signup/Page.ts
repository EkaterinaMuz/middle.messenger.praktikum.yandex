import Block from '../../framework/Block.ts';
import { Button, FormItem } from '../../components';
import { handleSubmit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './Signup.module.css';
import {SignupFetchService} from "../../domains/signup/SignupFetchService.ts";
import {navigate} from "../../infrastructure/utils";



export class SignupPage extends Block {
  public constructor(props = {}) {
    super({
      formName: 'Create Account',
      fields: [
        new FormItem({
          fieldName: 'Email Address *',
          id: 'email',
          type: 'email',
          name: 'email',
          required: true,
          placeholder: 'john879@gmail.com',

        }),
        new FormItem({
          fieldName: 'Username *',
          id: 'login',
          type: 'text',
          name: 'login',
          required: true,
          placeholder: 'Choose a username',

        }),
        new FormItem({
          fieldName: 'First Name *',
          id: 'firstName',
          type: 'text',
          name: 'first_name',
          required: true,
          placeholder: 'First name',
        }),
        new FormItem({
          fieldName: 'Last Name',
          id: 'secondName',
          type: 'text',
          name: 'second_name',
          required: false,
          placeholder: 'Last name',
        }),
        new FormItem({
          fieldName: 'Phone Number',
          id: 'phone',
          type: 'phone',
          name: 'phone',
          required: false,
          placeholder: '+ 7 950 38 38 893',
        }),
        new FormItem({
          fieldName: 'Password',
          id: 'password',
          type: 'password',
          name: 'password',
          required: true,
          placeholder: 'Create a password',
        }),
        new FormItem({
          fieldName: 'Confirm Password',
          id: 'password',
          type: 'password',
          name: 'password',
          required: true,
          placeholder: 'Confirm your password',
        }),
      ],
      Button: new Button({
        type: "submit",
        label: "Sign up",
      }),
      styles: {
        card: styles.card,
        loginForm: styles.signForm,
        legend: styles.signForm__legend,
        text: styles.signForm__text,
        link: styles.signForm__link,
        fieldset: styles.signForm__fieldset,
        info: styles.signForm__info,
      },
      events: {
          submit: (e: Event) => this.signUp(e)
      },
      ...props
    });
  }

  private async signUp(e: Event) {

      const data = handleSubmit(e);

      if (!data) {
          return;
      };

      if (
          typeof data.login !== 'string' ||
          typeof data.password !== 'string' ||
          typeof data.email !== 'string' ||
          typeof data.phone !== 'string' ||
          typeof data.first_name !== 'string' ||
          typeof data.second_name !== 'string'
      ) {
          console.error('Некорректные данные для регистрации');
          return;
      }

     const controller = new SignupFetchService();

     const response = await controller.request( {login: data.login,
          password: data.password, email: data.email, first_name: data.first_name, second_name:data.second_name, phone: data.phone, });

     if (response.status === 200) {
         navigate(e,'/');
     }


  }


    public override render() {
    return template;
  }

  public componentDidMount() {

  }

}

