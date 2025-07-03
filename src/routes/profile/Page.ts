import Block from '../../framework/Block.ts';
import { ProfileHeader } from '../../components';
import infoCellStyles from '../../components/InfoCell/InfoCell.module.css';
import InfoCell from '../../components/InfoCell/InfoCell.ts';

import template from './PageTemplate.hbs?raw';
import styles from './Profile.module.css';



class Page extends Block {
  public constructor(props = {}) {
    super({
      ProfileHeader: new ProfileHeader(),
      fields: [
        new InfoCell({
          fieldName: 'Email',
          fieldValue: 'pochta@yandex.ru',
        }),
        new InfoCell({
          fieldName: 'Login',
          fieldValue: 'ivanivanov',
        }),
        new InfoCell({
          fieldName: 'First name',
          fieldValue: 'John',
        }),
        new InfoCell({
          fieldName: 'Last name',
          fieldValue: 'Doe',
        }),
        new InfoCell({
          fieldName: 'Nickname',
          fieldValue: 'John Doe',
        }),
        new InfoCell({
          fieldName: 'Phone Number',
          fieldValue: '+7 (909) 967 30 30',
        })
      ],
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
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

export const ProfilePage = new Page();

