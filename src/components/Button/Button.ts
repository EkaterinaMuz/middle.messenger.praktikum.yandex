import Block from '../../framework/Block.ts';

import styles from './Button.module.css';
import template from './Button.hbs?raw';

export default class Button extends Block {
  public constructor(props = {}) {
    super({
      styles: styles.button,
      ...props
    });
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

