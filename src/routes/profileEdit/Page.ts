import Block from '../../framework/Block.ts';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';

import ProfileHeaderStyles from '../../components/ProfileHeader/ProfileHeader.module.css';
import {Button, FormItem} from '../../components';
import {handleSubmit as submit} from "../../shared/utils/forms";

import template from './PageTemplate.hbs?raw';
import styles from './ProfileEdit.module.css';
import {LoginController} from "../../domains/login/LoginController.ts";
import store from "../../store/Store.ts";
import {StoreEvents} from "../../framework";
import {NavigateButton} from "../../components/NavigateButton";
import {ProfileController} from "../../domains/profile/ProfileController.ts";



export class ProfileEditPage extends Block {
  public constructor(props = {}) {
    super({
      fields: ProfileEditPage.createFields(),
      Button: new Button({
        type: "submit",
        label: "Save",
      }),
      src: '',
      NavigateButton: new NavigateButton(),
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
          submit: (e: Event) => this.handleSubmit(e)
      },
      ...props
    });

      void this.getProfileInfo();

      store.on(StoreEvents.Updated, () => {
          console.log(store.getState().user.avatar);
          this.setLists('fields', ProfileEditPage.createFields(store.getState().user));
          this.setProps({src: `https://ya-praktikum.tech/api/v2/resources${store.getState().user?.avatar}`});
      });
  }

    private async handleSubmit(e: Event) {
        submit(e);

        const formElement = e.target as HTMLFormElement;

        const controller = new ProfileController();
        const results = await controller.changeProfileInfo(formElement);

        console.log(results);

        if (!results) return;

        const [result, avatar] = results;

        console.log(avatar.status, 'status');

        if (result.status === 200 || avatar.status === 200) {
            void this.getProfileInfo();
        }
    }


    private async getProfileInfo() {
        const controller = new LoginController();
        await controller.getUserInfo();
    }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }

    public static createFields(user?: Record<string, string>) {
        return [
                new FormItem({
                    fieldName: 'Email Address',
                    id: 'email',
                    type: 'email',
                    name: 'email',
                    value: user?.email || '',
                    placeholder: 'john879@gmail.com',

                }),
                new FormItem({
                    fieldName: 'Login',
                    id: 'login',
                    type: 'login',
                    name: 'login',
                    value: user?.login || '',
                    placeholder: 'login',

                }),
                new FormItem({
                    fieldName: 'First Name',
                    id: 'firstName',
                    type: 'text',
                    name: 'first_name',
                    value: user?.first_name || '',
                    placeholder: 'First name',
                }),
                new FormItem({
                    fieldName: 'Last Name',
                    id: 'secondName',
                    type: 'text',
                    name: 'second_name',
                    value: user?.second_name || '',
                    placeholder: 'Last name',
                }),
                new FormItem({
                    fieldName: 'NickName',
                    id: 'displayName',
                    type: 'text',
                    name: 'display_name',
                    value: user?.display_name || '',
                    placeholder: 'NickName',
                }),
                new FormItem({
                    fieldName: 'Phone Number',
                    id: 'phone',
                    type: 'phone',
                    name: 'phone',
                    value: user?.phone || '',
                    placeholder: '+ 7 950 38 38 893',
                }),
        ];
    }
}

