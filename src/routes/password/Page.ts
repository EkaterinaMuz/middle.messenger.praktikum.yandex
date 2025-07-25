import { Button, FormItem, ProfileHeader } from '../../components';
import Block from '../../framework/Block.ts';
import { handleSubmit as submit } from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './Password.module.css';
import {ProfileController} from "../../domains/profile/ProfileController";


export class PasswordPage extends Block {
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
          submit: (e: Event) => this.handleSubmit(e)
      },
      ...props
    });
  }

  private async handleSubmit(e: Event) {
      const formData = submit(e);

      if (!formData) return;

      const oldPassword = formData['oldPassword'];
      const newPassword = formData['newPassword'];

      if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
          console.error('Некорректные поля формы');
          return;
      }

      const controller = new ProfileController();
      await controller.changePassword({
          oldPassword,
          newPassword,
      });
    }

  public override render() {
    return template;
  }

  public componentDidMount() {}

}

