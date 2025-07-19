import { Button, FormItem, ProfileHeader } from '../../components';
import Block from '../../framework/Block.ts';
import { handleSubmit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './Password.module.css';


class Page extends Block {
  public constructor(props = {}) {
    super({
      ProfileHeader: new ProfileHeader(),
      Button: new Button({
        type: "submit",
        label: "Save",
      }),
      fields: [
        new FormItem({
          fieldName: 'Current Password',
          placeholder: '••••••••••••',
          id: 'oldPassword',
          type: 'password',
          name: 'oldPassword',
          required: true,
        }),
        new FormItem({
          fieldName: 'New Password',
          placeholder: '',
          id: 'newPassword',
          type: 'password',
          name: 'newPassword',
          required: true,
        })
      ],
      styles: {
        card: styles.card,
        profile: styles.profile,
        actionBlock: styles.profile__actions,
        section: styles.profile__section,
        info: styles.profile__info,
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

export const PasswordPage = new Page();

