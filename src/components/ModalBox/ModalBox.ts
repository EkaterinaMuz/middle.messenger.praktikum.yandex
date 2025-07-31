import Block from '../../framework/Block';

import styles from './ModalBox.module.css';
import template from './ModalBox.hbs?raw';
import { Button } from '../Button';

export default class ModalBox extends Block {
  public constructor(props = {}) {
    super({
        overlay: styles.overlay,
        window: styles.window,
        close: styles.close,
        closeButton: new Button({
            label: "Close",
            events: {
                click: () => this.handleClose()
            }
        }),
      ...props
    });
  }

  public override render() {
    return template;
  }

  public readonly handleClose = () => {
      document.querySelectorAll('[data-modal="modalBox"]').forEach(modal => {
          (modal as HTMLElement).style.display = 'none';
      });
  };

  public componentDidMount() {

  }
}

