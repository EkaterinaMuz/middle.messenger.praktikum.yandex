import Block from '../../framework/Block.ts';

import styles from './Avatar.module.css';
import template from './Avatar.hbs?raw';

export default class Avatar extends Block {
  public constructor(props = {}) {
    super({
      class: styles.avatar,
      ...props
    });
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

