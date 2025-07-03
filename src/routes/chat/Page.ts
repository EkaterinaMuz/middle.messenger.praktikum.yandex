import Block from '../../framework/Block.ts';
import { ChatItem } from '../../components/ChatItem';
import { Input, Link } from '../../components';
import { Avatar } from '../../components/Avatar';
import { ChatMessage } from '../../components/ChatMessage';

import template from './PageTemplate.hbs?raw';
import styles from './Chat.module.css';



class Page extends Block {
  public constructor(props = {}) {
    super({
      chats: [
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 3
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 5
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 2
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 1
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 5
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 2
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 5
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 2
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 5
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 2
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 5
        }),
        new ChatItem({
          avatar: new Avatar({
            src: '/static/profile/avatar.png',
            alt: 'avatar'
          }),
          name: 'Joe',
          lastMessage: 'Hi!',
          time: '13:45',
          unread: 2
        }),

      ],
      messages: [
        new ChatMessage({
          text: 'Hi!',
          time: '19:31',
          isMine: true,
          status: ">>"
        }),
        new ChatMessage({
          text: 'Hi! My room is nice. I’ve got a bed, a table and a new computer on it ' +
            'and some posters on the walls. My room has got yellow walls and a green carpet.',
          time: '19:32',
        }),
        new ChatMessage({
          text: 'Good!',
          time: '19:33',
          isMine: true,
        }),
        new ChatMessage({
          text: 'My room is nice. I’ve got a bed, a table and a new computer on it and some posters ' +
            'on the walls. My room has got yellow walls and a green carpet. - My room is nice. I’ve got a bed, a table ' +
            'and a new computer on it and some posters on the walls. ' +
            'My room has got yellow walls and a green carpet.',
          time: '19:32',
        }),
        new ChatMessage({
          text: 'My room is nice. I’ve got a bed, a table and a new computer on it and some posters on the walls',
          time: '19:33',
          isMine: true,
        }),
        new ChatMessage({
          text: 'Good!',
          time: '19:33',
          isMine: true,
        }),
      ],
      userAvatar: new Avatar({
        src: '/static/profile/avatar.png',
        alt: 'avatar'
      }),
      chatUserAvatar: new Avatar({
        src: '/static/profile/avatar.png',
        alt: 'avatar'
      }),
      chatUserInfo: {
        name: 'Nicol Adams'
      },
      userInfo: {
        name: 'Nicol Adams'
      },
      searchField: new Input({
        id: 'search',
        type: 'text',
        name: 'search',
        placeholder: 'Search chats...',
      }),
      chatInput: new Input({
        id: 'message',
        type: 'text',
        name: 'message',
        placeholder: 'Write a message...',
      }),
      profileLink: new Link({
        dataPage: "profile",
        href: "/profile",
        label: 'profile'
      }),
      chatSettingsLink: new Link({
        dataPage: "edit",
        href: "/edit",
        label: 'settings'
      }),
      styles: {
        container: styles.container,
        chatAside: styles.chat_aside,
        chatList: styles.chat_list,
        chatSearchBlock: styles.chat_search_block,
        chatMain: styles.chat_main,
        chatHeader: styles.chat_header,
        chatHeaderUser: styles.chat_header_user,
        chatMessages: styles.chat_messages,
        chatInput: styles.chat_input
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

export const ChatPage = new Page();

