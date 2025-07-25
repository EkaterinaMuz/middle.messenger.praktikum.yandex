import { ProfileFetchService } from "./ProfileFetchService.ts";

export interface changeProfileInfoProps {
    "first_name": string,
    "avatar"?: string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string
}

interface changePasswordProps {
    "oldPassword": string,
    "newPassword": string
}

const profileApi = new ProfileFetchService();

export class ProfileController {
    public async changeProfileInfo(data: changeProfileInfoProps) {
        try {

            // const formData = new FormData();
            // formData.append('avatar', data.avatar);

            await Promise.all([profileApi.changeProfileInfo(data)]);

        } catch (e) {
            console.log(e);
        }
    }

    public async changePassword(data: changePasswordProps) {
        try {
            await profileApi.changePassword(data);

        } catch (e) {
            console.log(e);
        }
    }
}
