import { HTTPTransport } from "../../shared/utils/api";

interface ChatsRequest {
    "offset"?: number
    "limit"?: number
    "title"?: string
}

interface CreateChat {
    "title"?: string
}

export class ChatsFetchService {
    public constructor() {
        this.chatsAPIInstance = new HTTPTransport('chats');
    }
    public async getToken(chatId: string) {
        return await this.chatsAPIInstance.post(`token/${chatId}`);
    }
    public async getChats(data?: ChatsRequest) {
        return await this.chatsAPIInstance.get('', { data });
    }

    public async createChats(data: CreateChat) {
        return await this.chatsAPIInstance.post('', { data });
    }

    public async addUsers(data: {users: number[], chatId: number}) {
        return await this.chatsAPIInstance.put('users', { data });
    }

    public async deleteUsers(data:  {users: number[], chatId: number}) {
        return await this.chatsAPIInstance.delete('users', { data });
    }

    private readonly chatsAPIInstance: HTTPTransport;
}
