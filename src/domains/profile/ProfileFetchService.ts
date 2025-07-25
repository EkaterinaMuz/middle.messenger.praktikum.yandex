import { HTTPTransport } from "../../shared/utils/api";

const profileAPIInstance = new HTTPTransport('user');

export interface changeProfileInfoProps {
    "first_name": string,
    "second_name": string,
    "avatar"?: string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string
}

interface changePasswordProps {
    oldPassword: string,
    newPassword: string
}

export class ProfileFetchService {
    public async changeProfileInfo(data: changeProfileInfoProps) {
        return await profileAPIInstance.put('/profile', { data });

    }
    public async changePassword(data: changePasswordProps) {
        return await profileAPIInstance.put('/password', { data });
    }

    public async changeAvatar(data: Pick<changeProfileInfoProps, 'avatar'>) {
        return await profileAPIInstance.put('/profile/avatar', { data, headers: {'Content-type': 'multipart/form-data'} });
    }
}
