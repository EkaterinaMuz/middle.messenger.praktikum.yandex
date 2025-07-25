import { LoginFetchService } from "./LoginFetchService";
import store from "../../store/Store";

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginFetchService();

export class LoginController {
    public async login(data: LoginFormModel) {
        try {
            return await loginApi.request(data);

        } catch (e) {
            console.log(e);
        }
    }

    public async getUserInfo() {
        try {
            const response = await loginApi.getUserInfo();
            store.set('user', JSON.parse(response.response));

        } catch (e) {
            console.log(e);
        }
    }

    public async logOut() {
        try {
            return await loginApi.logOut();

        } catch (e) {
            console.log(e);
        }
    }
}
