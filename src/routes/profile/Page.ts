import {LoginController} from "../../domains/login/LoginController";
import Block from '../../framework/Block';
import {Link, ProfileHeader} from '../../components';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';
import InfoCell from '../../components/InfoCell/InfoCell';

import { navigate } from "../../infrastructure/utils";
import template from './PageTemplate.hbs?raw';
import styles from './Profile.module.css';
import {StoreEvents} from "../../framework";
import store from "../../store/Store";



export class ProfilePage extends Block {
  public constructor(props = {}) {
    super({
      ProfileHeader: new ProfileHeader({
          name: '',
          avatarSrc: ''
      }),
      fields: ProfilePage.createFields(),
        profileEditLink: new Link({
            label: 'Update Information',
            dataPage: "settings",
            href: '#',
            events: {
                click: (e: Event) => navigate(e,'/settings')
            },
        }),
        passwordEditLink: new Link({
            dataPage: "password-edit",
            href: "#",
            label: 'Change password',
            events: {
                click: (e: Event) => navigate(e, '/password-edit')
            },
        }),
        signOutLink: new Link({
            dataPage: "login",
            href: "/login",
            label: 'Sign Out',
            events: {
                click: (e: Event) => this.logOut(e)
            },
        }),
      styles: {
        card: styles.card,
        profile: styles.profile,
        actionBlock: styles.profile__actions,
        section: styles.profile__section,
        info: styles.profile__info,
        separator: infoCellStyles.infoCell__separator
      },
      ...props
    });

    void this.getProfileInfo();

      store.on(StoreEvents.Updated, () => {
          this.setLists('fields', ProfilePage.createFields(store.getState().user));

          this.setChildren('ProfileHeader', new ProfileHeader({
              name: `${store.getState().user.first_name} ${store.getState().user.second_name}`,
              avatarSrc: `https://ya-praktikum.tech/api/v2/resources${store.getState().user?.avatar}`
              },
      ));
      });
  }

  public async getProfileInfo() {
      const controller = new LoginController();
      await controller.getUserInfo();
  }

  private async logOut(e: Event) {
      e.preventDefault();

      const controller = new LoginController();
      const response = await controller.logOut();

      if(response?.status === 200) {
          navigate(e, '/login');
      }
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
  public static createFields(user?: Record<string, string>) {
    return [
        new InfoCell({ fieldName: 'Email', fieldValue: user?.email || '' }),
        new InfoCell({ fieldName: 'Login', fieldValue: user?.login || '' }),
        new InfoCell({ fieldName: 'First name', fieldValue: user?.first_name || '' }),
        new InfoCell({ fieldName: 'Last name', fieldValue: user?.second_name || '' }),
        new InfoCell({ fieldName: 'Nickname', fieldValue: user?.display_name || '' }),
        new InfoCell({ fieldName: 'Phone Number', fieldValue: user?.phone || '' })
    ];
}
}

