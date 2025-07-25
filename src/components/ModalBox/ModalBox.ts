import Block from '../../framework/Block';

import styles from './ModalBox.module.css';
import template from './ModalBox.hbs?raw';

export default class ModalBox extends Block {
  public constructor(props = {}) {
    super({
        overlay: styles.overlay,
        window: styles.window,
        close: styles.close,
      ...props
    });
  }


    // private async handleSubmit(e: Event) {
    //   const { callback} = this.props;
    //
    //    const chatTitle = submit(e);
    //
    //
    //
    //     const controller = new ChatsController();
    //     console.log(chatTitle, 'chat title');
    //     return await controller.createChat({ title: chatTitle.chat });
    // }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }
}

