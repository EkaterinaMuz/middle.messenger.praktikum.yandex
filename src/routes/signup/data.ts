import formItemStyles from '../../components/Forms/FormItem/FormItem.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

import pageStyles from './Signup.module.css';

export const data = {
  formName: 'Create Account',
  fields: [
    {
      fieldName: 'Email Address *',
      id: 'email',
      type: 'email',
      name: 'email',
      required: true,
      placeholder: 'john879@gmail.com',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input

    },
    {
      fieldName: 'Username *',
      id: 'displayName',
      type: 'text',
      name: 'display_name',
      required: true,
      placeholder: 'Choose a username',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input

    },
    {
      fieldName: 'First Name *',
      id: 'firstName',
      type: 'text',
      name: 'first_name',
      required: true,
      placeholder: 'First name',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    },
    {
      fieldName: 'Last Name',
      id: 'secondName',
      type: 'text',
      name: 'second_name',
      required: false,
      placeholder: 'Last name',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    },
    {
      fieldName: 'Phone Number',
      id: 'phone',
      type: 'phone',
      name: 'phone',
      required: false,
      placeholder: '+ 7 950 38 38 893',
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
      placeholder: 'Create a password',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    },
    {
      fieldName: 'Confirm Password',
      id: 'password',
      type: 'password',
      name: 'password',
      required: true,
      placeholder: 'Confirm your password',
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    }
  ],
  styles: {
    card: pageStyles.card,
    loginForm: pageStyles.signForm,
    legend: pageStyles.signForm__legend,
    text: pageStyles.signForm__text,
    link: pageStyles.signForm__link,
    fieldset: pageStyles.signForm__fieldset,
    info: pageStyles.signForm__info,
  },
  buttonStyles: buttonStyles.button
}
