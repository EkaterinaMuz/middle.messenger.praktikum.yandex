import { HTTPTransport } from "../../shared/utils/api";

export interface SignupRequest {
    "login": string,
    "password": string
    "email": string
    "phone": string
    "first_name": string
    "second_name": string
}

export class SignupFetchService {
    public constructor() {
        this.authAPIInstance = new HTTPTransport('auth/signup');
    }
    public async request(data: SignupRequest) {
        return await this.authAPIInstance.post('', { data });
    }

    private readonly authAPIInstance: HTTPTransport;
}
