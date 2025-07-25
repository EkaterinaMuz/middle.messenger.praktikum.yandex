import Block from '../../framework/Block.ts';

import template from './ErrorTemplate.hbs?raw';
import styles from './Error.module.css';

export class ErrorPage extends Block {
  constructor(props = {}) {
    super({
      styles: {
        container: styles.container,
        description: styles.description,
        instruction: styles.instruction,
        title: styles.title,
        subtitle: styles.subtitle,

      },
      ...props
    });
  }

  override render() {
    return template;
  }

  public componentDidMount() {

  }
}
