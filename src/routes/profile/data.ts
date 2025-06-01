import ProfileHeaderStyles from '../../components/ProfileHeader/ProfileHeader.module.css';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

import pageStyles from './Profile.module.css';

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
      fieldName: 'Email',
      fieldValue: 'pochta@yandex.ru',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }

    },
    {
      fieldName: 'Login',
      fieldValue: 'ivanivanov',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }
    },
    {
      fieldName: 'First name',
      fieldValue: 'John',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }
    },
    {
      fieldName: 'Last name',
      fieldValue: 'Doe',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }
    },
    {
      fieldName: 'Nickname',
      fieldValue: 'John Doe',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }
    },
    {
      fieldName: 'Phone Number',
      fieldValue: '+7 (909) 967 30 30',
      styles: {
        row: infoCellStyles.infoCell__row,
        label: infoCellStyles.infoCell__label,
        value: infoCellStyles.infoCell__value,
        separator: infoCellStyles.infoCell__separator
      }
    }
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
