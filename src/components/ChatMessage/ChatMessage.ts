import Block from '../../framework/Block';
import type { BlockProps } from '../../framework';

import template from './ChatMessage.hbs?raw';
import styles from './ChatMessage.module.css';

export default class ChatMessage extends Block {
  public constructor(props: BlockProps = {}) {
    super({
      styles: {
        message: styles.message,
        messageText: styles.message_text,
        messageInfo: styles.message_info,
        messageTime: styles.message_time,
        mine: props.isMine ? styles.message_mine : null,
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




