import Block from '../../framework/Block';
import type{ BlockProps } from '../../framework';

import template from './InfoCell.hbs?raw';
import styles from './InfoCell.module.css';

export default class InfoCell extends Block {
  public constructor(props: BlockProps = {}) {
    super({
      styles: {
        row: styles.infoCell__row,
        label: styles.infoCell__label,
        value: styles.infoCell__value,
        separator: styles.infoCell__separator,
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
