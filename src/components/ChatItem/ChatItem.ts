import type { BlockProps } from '../../framework';
import Block from '../../framework/Block';

import template from './ChatItem.hbs?raw';
import styles from './ChatItem.module.css';

export default class ChatItem extends Block {
  public constructor(props: BlockProps = {}) {
    super({
      styles: {
        chatItem: styles.chatItem,
        chatItemInfo: styles.chatItemInfo,
        chatItemHeader: styles.chatHeader,
        chatItemName: styles.chatItemName,
        chatItemMessage: styles.chatItemMessage,
        chatItemContent: styles.chatItemContent,
        chatItemTime: styles.chatItemTime,
        chatItemUnread: styles.chatItemUnread,
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




