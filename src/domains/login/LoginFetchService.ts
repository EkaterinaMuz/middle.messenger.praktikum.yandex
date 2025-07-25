import { HTTPTransport } from "../../shared/utils/api";

const authAPIInstance = new HTTPTransport('auth');

interface LoginRequest {
    "login": string,
    "password": string
}

export class LoginFetchService {
    public async request(data: LoginRequest) {
        return await authAPIInstance.post('/signin', { data });
    }
    public async getUserInfo() {
        return await authAPIInstance.get('/user');
    }

    public async logOut() {
        return await authAPIInstance.get('/logout');
    }
}
