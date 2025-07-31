import { LoginFetchService } from "./LoginFetchService";
import store from "../../store/Store";
import {navigate} from "../../infrastructure/utils";

interface LoginFormModel {
    login: string;
    password: string;
}

interface CustomError extends Error {
    reason: string;
}

const loginApi = new LoginFetchService();

export class LoginController {
    public async login(e: Event, data: LoginFormModel) {
        try {
            return await loginApi.request(data);

        } catch (error: unknown) {
            if(typeof error === 'object' && error !== null && 'response' in error) {
                const err = JSON.parse(error.response as string) as CustomError;
                if (err.reason === "User already in system") {
                    navigate(e,'/messenger');
                }
            }
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
