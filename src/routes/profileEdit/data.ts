import ProfileHeaderStyles from '../../components/ProfileHeader/ProfileHeader.module.css';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

import pageStyles from './ProfileEdit.module.css';
import formItemStyles from '../../components/Forms/FormItem/FormItem.module.css';

export const data = {
  profileHeader: {
    name: 'John Doe',
    avatarSrc: '',
    styles: {
      profileHeader: ProfileHeaderStyles.profileHeader,
      name: ProfileHeaderStyles.profileHeader__name,
      avatar: ProfileHeaderStyles.profileHeader__avatar,
      subheading: ProfileHeaderStyles.profileHeader__subheading,
      fileInputHidden: ProfileHeaderStyles.fileInputHidden,
      avatarLabel: ProfileHeaderStyles.profile__avatarLabel,
}
  },
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
      fieldName: 'Email Address',
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
      fieldName: 'First Name',
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
      fieldName: 'NickName',
      id: 'displayName',
      type: 'text',
      name: 'display_name',
      required: false,
      placeholder: 'NickName',
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
  ],
  styles: {
    card: pageStyles.card,
    profile: pageStyles.profile,
    actionBlock: pageStyles.profile__actions,
    section: pageStyles.profile__section,
    info: pageStyles.profile__info,
    separator: infoCellStyles.infoCell__separator
  },
  buttonStyles: buttonStyles.button,
}
