import Block from '../../framework/Block.ts';

import template from './Link.hbs?raw';
import styles from './Link.module.css';

export default class Link extends Block {
  public constructor(props = {}) {
    super({
      styles: styles.link,
      ...props
    });
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

