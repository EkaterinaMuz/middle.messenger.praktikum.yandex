import Block from '../../framework/Block.ts';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';

import ProfileHeaderStyles from '../../components/ProfileHeader/ProfileHeader.module.css';
import { Button, FormItem } from '../../components';
import { handleSubmit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './ProfileEdit.module.css';



class Page extends Block {
  public constructor(props = {}) {
    super({
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
          fieldName: 'Email Address',
          id: 'email',
          type: 'email',
          name: 'email',
          required: true,
          placeholder: 'john879@gmail.com',

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
          fieldName: 'NickName',
          id: 'displayName',
          type: 'text',
          name: 'display_name',
          required: false,
          placeholder: 'NickName',
        }),
        new FormItem({
          fieldName: 'Phone Number',
          id: 'phone',
          type: 'phone',
          name: 'phone',
          required: false,
          placeholder: '+ 7 950 38 38 893',
        }),
      ],
      Button: new Button({
        type: "submit",
        label: "Save",
      }),
      headerStyles: {
        profileHeader: ProfileHeaderStyles.profileHeader,
        name: ProfileHeaderStyles.profileHeader__name,
        avatar: ProfileHeaderStyles.profileHeader__avatar,
        subheading: ProfileHeaderStyles.profileHeader__subheading,
        fileInputHidden: ProfileHeaderStyles.fileInputHidden,
        avatarLabel: ProfileHeaderStyles.profile__avatarLabel,
      },
      styles: {
        profileHeader: ProfileHeaderStyles.profileHeader,
        name: ProfileHeaderStyles.profileHeader__name,
        avatar: ProfileHeaderStyles.profileHeader__avatar,
        subheading: ProfileHeaderStyles.profileHeader__subheading,
        fileInputHidden: ProfileHeaderStyles.fileInputHidden,
        avatarLabel: ProfileHeaderStyles.profile__avatarLabel,
        card: styles.card,
        profile: styles.profile,
        actionBlock: styles.profile__actions,
        section: styles.profile__section,
        info: styles.profile__info,
        separator: infoCellStyles.infoCell__separator
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

export const ProfileEditPage = new Page();

