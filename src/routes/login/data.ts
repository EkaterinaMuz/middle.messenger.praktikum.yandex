import formItemStyles from '../../components/Forms/FormItem/FormItem.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

import pageStyles from './LoginForm.module.css';

export const data = {
  formName: 'Login',
  fields: [
    {
      fieldName: 'Login',
      id: 'login',
      type: 'login',
      name: 'login',
      required: true,
      placeholder: 'john879@gmail.com',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input

    },
    {
      fieldName: 'Password',
      id: 'password',
      type: 'password',
      name: 'password',
      required: true,
      placeholder: '••••••••••••',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input

    }
  ],
  styles: {
    card: pageStyles.card,
    loginForm: pageStyles.loginForm,
    legend: pageStyles.loginForm__legend,
    text: pageStyles.loginForm__text,
    link: pageStyles.loginForm__link,
    fieldset: pageStyles.loginForm__fieldset,
    info: pageStyles.loginForm__info
  },
  buttonStyles: buttonStyles.button
}
