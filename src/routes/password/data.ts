import ProfileHeaderStyles from '../../components/ProfileHeader/ProfileHeader.module.css';
import buttonStyles from '../../components/Button/Button.module.css';
import formItemStyles from '../../components/Forms/FormItem/FormItem.module.css';

import pageStyles from './Password.module.css';

export const data = {
  profileHeader: {
    name: 'John Doe',
    avatarSrc: '',
    styles: {
      profileHeader: ProfileHeaderStyles.profileHeader,
      name: ProfileHeaderStyles.profileHeader__name,
      avatar: ProfileHeaderStyles.profileHeader__avatar,
      subheading: ProfileHeaderStyles.profileHeader__subheading
    }
  },
  fields: [
    {
      fieldName: 'Current Password',
      placeholder: '••••••••••••',
      id: 'oldPassword',
      type: 'password',
      name: 'oldPassword',
      required: true,
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    },
    {
      fieldName: 'New Password',
      placeholder: '',
      id: 'newPassword',
      type: 'password',
      name: 'newPassword',
      required: true,
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      inputStyle: formItemStyles.formItem__input
    }
  ],
  styles: {
    card: pageStyles.card,
    profile: pageStyles.profile,
    actionBlock: pageStyles.profile__actions,
    section: pageStyles.profile__section,
    info: pageStyles.profile__info,
  },
  buttonStyles: buttonStyles.button,
}
