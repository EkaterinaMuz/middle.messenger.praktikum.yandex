import { ChatsFetchService } from "./ChatsFetchService.ts";
import store from "../../store/Store.ts";

interface ChatsModel {
    "offset"?: number
    "limit"?: number
    "title"?: string
}

const chatsApi = new ChatsFetchService();

export class ChatsController {
    public async getToken(id: string) {
        try {
           const response = await chatsApi.getToken(id);

            store.set('token', JSON.parse(response.response));

        } catch (e) {
            console.log(e);
        }
    }

    public async getChatsList(data?: ChatsModel) {
        try {
           const response = await chatsApi.getChats(data);

            store.set('chats', JSON.parse(response.response));

        } catch (e) {
            console.log(e);
        }
    }

    public async createChat(data: {title?: string}) {
        try {
            await chatsApi.createChats(data);

        } catch (e) {
            console.log(e);
        }
    }

    public async addUsers(data: {users: number[], chatId: number}) {
        try {
            await chatsApi.addUsers(data);

        } catch (e) {
            console.log(e);
        }
    }

    public async deleteUsers(data: {users: number[], chatId: number}) {
        try {
            await chatsApi.deleteUsers(data);

        } catch (e) {
            console.log(e);
        }
    }
}
