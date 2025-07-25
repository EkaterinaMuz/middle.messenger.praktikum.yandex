import Block from '../../framework/Block.ts';
import { ChatItem } from '../../components/ChatItem';
import {Button, FormItem, Input, Link} from '../../components';
import { Avatar } from '../../components/Avatar';
import { ChatMessage } from '../../components/ChatMessage';

import template from './PageTemplate.hbs?raw';
import styles from './Chat.module.css';
import { navigate } from "../../infrastructure/utils";
import {ChatsController} from "../../domains/chats/ChatsController.ts";
import {ModalBox} from "../../components/ModalBox";
import store from "../../store/Store.ts";
import {StoreEvents} from "../../framework";
import {handleSubmit as submit, isFieldName, validateFormField} from "../../shared/utils/forms";
import {getIdParam} from "../../infrastructure/utils/navigate";
import {getSocket} from "../../shared/utils/sockets/socket";
import {LoginController} from "../../domains/login/LoginController";



export class ChatPage extends Block {
  public constructor(props = {}) {
    super({
       CreateChatModalBox: new ModalBox({
           id: 'create_chat',
           FormItem: new FormItem({
               fieldName: 'Enter chat name',
               placeholder: 'Enter chat name',
               id: 'chat',
               type: 'text',
               name: 'chat',
               required: true,
           }),
           Button: new Button({
               type: "submit",
               label: "Create chat",
           }),
           events: {
               submit: (e: Event) => this.createChat(e)
           },
        }),
        AddUserToChatModalBox: new ModalBox({
            id: 'add_user',
            FormItem: new FormItem({
                fieldName: 'Enter user id',
                placeholder: 'Enter user id',
                id: 'add_user',
                type: 'text',
                name: 'add_user',
                required: true,
            }),
            Button: new Button({
                type: "submit",
                label: "Add new user to chat",
            }),
            events: {
                submit: (e: Event) => this.addNewUser(e)
            },
        }),
        DeleteUserFromChatModalBox: new ModalBox({
            id: 'delete_user',
            FormItem: new FormItem({
                fieldName: 'Enter user id',
                placeholder: 'Enter user id',
                id: 'delete_user',
                type: 'text',
                name: 'delete_user',
                required: true,
            }),
            Button: new Button({
                type: "submit",
                label: "Delete user from chat",
            }),
            events: {
                submit: (e: Event) => this.deleteUser(e)
            },
        }),
      chats: ChatPage.createChatList(),
      messages: ChatPage.createMessagesList(),
      userAvatar: new Avatar({
        src: '/static/profile/avatar.png',
        alt: 'avatar'
      }),
      chatUserAvatar: new Avatar({
        src: '/static/profile/avatar.png',
        alt: 'avatar'
      }),
      chatUserInfo: {
        name: ''
      },
      userInfo: {
        name: ''
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
        events: {
            keyup: (e: Event) => this.sendMessage(e as KeyboardEvent)
          }
      }),
      profileLink: new Link({
        dataPage: "profile",
        href: "/profile",
        label: 'profile',
          events: {
              click: (e: Event) => navigate(e, '/profile')
          },
      }),
        createChatLink: new Button({
            label: 'Create new chat',
            attr: {
                'data-modal': 'create_chat'
            },
            events: {
                click: (e: Event) => this.toggleModalBox(e, true)
            },
        }),
        AddUserLink: new Button({
            label: 'Add new user to chat',
            attr: {
                'data-modal': 'add_user'
            },
            events: {
                click: (e: Event) => this.toggleModalBox(e, true)
            },
        }),
        DeleteUserLink: new Button({
            label: 'Delete user from chat',
            attr: {
                'data-modal': 'delete_user'
            },
            events: {
                click: (e: Event) => this.toggleModalBox(e, true)
            },
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

    void this.getChats();
    void this.getUserInfo();

      this.chatId = Number(getIdParam()) || 0;

      this.setProps({ chatId: this.chatId });


    if (this.chatId) {
       void this.getMessages();
    }

       store.on(StoreEvents.Updated, () => {
           console.log(store.getState().chats, 'store.getState().chats');
           this.setLists('chats', ChatPage.createChatList(store.getState().chats));
           this.setLists('messages', ChatPage.createMessagesList(store.getState().messages));

           this.setProps( {userInfo: { name: `${ChatPage.userInfo.first_name} ${ChatPage.userInfo.second_name}` } });
           this.setProps( {chatUserInfo: { name: ChatPage.chatName } });
      });

  }

  private async getChats() {
      const controller = new ChatsController();
      return await controller.getChatsList({ limit: 21 });
  }

  private async getUserInfo() {
      const controller = new LoginController();
     await controller.getUserInfo();

      ChatPage.userInfo = store.getState()?.user;
      console.log( ChatPage.userInfo);

  }

  private async createChat(e: Event) {
      const chatTitle = submit(e);


      const controller = new ChatsController();
      await controller.createChat({ title: chatTitle?.chat as string});

      void this.getChats();

      this.toggleModalBox(e, false);
  }

  private async addNewUser(e: Event) {
      const data = submit(e);

      if (!this.chatId) {
          return;
      }

      const controller = new ChatsController();
      await controller.addUsers({ users: [ Number(data?.add_user) ], chatId: this.chatId });

      this.toggleModalBox(e, false);

  }

  private async deleteUser(e: Event) {
      const data = submit(e);

      if (!this.chatId) {
          return;
      }

      const controller = new ChatsController();
      await controller.deleteUsers({ users: [ Number(data?.delete_user) ], chatId: this.chatId });

       this.toggleModalBox(e, false);
  }

  private async getChatToken() {
      const controller = new ChatsController();
      return await controller.getToken(this.chatId);
  }

  private  toggleModalBox(e: Event, show: boolean) {
      const modal = document.getElementById((e.target as HTMLButtonElement).getAttribute('data-modal') as string);
      if (!modal) {
          return;
      }
      modal.style.display = show ? 'flex' : 'none';
  }

  private sendMessage(e: KeyboardEvent) {
      const fieldName = ( e.target as HTMLInputElement).getAttribute('name') || '';

      if (!isFieldName(fieldName)) {
          return;
      }
      const error = validateFormField(fieldName || 'message', (e.target as HTMLInputElement)?.value);

      if (error) {
          return;
      }

      if (e.key === 'Enter') {
            this.socket?.send(JSON.stringify({
                content: (e.target as HTMLInputElement)?.value,
                type: 'message',
            }));

          void this.getMessages();

          (e.target as HTMLInputElement).value = '';
      }

  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }

  public async getMessages() {
      await this.getChatToken();

    const tokenStore = store.getState().token;

      if (!tokenStore.token) {
          return;
    }

    this.socket = getSocket({userId: ChatPage.userInfo.id, chatId: this.chatId, token: tokenStore.token});

  }

    public static createChatList(chats?: Record<string, unknown>[]) {

      if (!chats) {
          return [];
      }

      return chats?.map((chat: Record<string, unknown>) => {
          if (chat.id === Number(getIdParam())) {
              ChatPage.chatName = chat?.title as string;
          }

          return new ChatItem({
              avatar: new Avatar({
                  src: chat.src || '/static/profile/avatar.png'
              }),
              id: chat.id || '',
              title: chat.title || '',
              unread_count: chat.unread_count || '',
              time: "",
              content: (chat.last_message as Record<string, string>)?.content || 'No messages yet',
              events: {
                  click: (e) => navigate(e, `/messenger/${chat.id}`)
              }
          });
      });
    }
    public static createMessagesList(messages?: Record<string, unknown>[]) {

      if (!messages) {
          return [];
      }

        return messages?.map(message =>
            new ChatMessage({
                text: message.content,
                time: message.time,
                isRead: message.is_read,
                isMine: message.user_id === Number(ChatPage.userInfo.id),
            })
        );
    }

    private readonly chatId: number = 0;
    private static userInfo: Record<string, string>;
    private socket: WebSocket | null = null;
    private static chatName: string | null = null;
}

