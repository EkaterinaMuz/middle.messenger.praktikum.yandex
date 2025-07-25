import Block from '../../framework/Block.ts';

import template from './ProfileHeader.hbs?raw';
import styles from './ProfileHeader.module.css';
import {NavigateButton} from "../NavigateButton";

export default class ProfileHeader extends Block {
  public constructor(props = {}) {
    super({
      name: 'John Doe',
      avatarSrc: '/static/profile/avatar.png',
      NavigateButton: new NavigateButton(),
      styles: {
        profileHeader: styles.profileHeader,
        name: styles.profileHeader__name,
        avatar: styles.profileHeader__avatar,
        subheading: styles.profileHeader__subheading,
        navigation: styles.navigation
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
