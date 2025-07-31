import  {back } from "../../infrastructure/utils/navigate";

import Block from '../../framework/Block';

import styles from './Button.module.css';
import template from './Button.hbs?raw';

export default class NavigateButton extends Block {
  public constructor(props = {}) {
    super({
        button: styles.button,
        arrow: styles.arrow,
        events: {
            click: (e) => back(e)
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

