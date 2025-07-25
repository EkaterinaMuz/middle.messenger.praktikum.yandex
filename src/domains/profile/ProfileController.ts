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
    public async changeProfileInfo(formElement: HTMLFormElement) {
        const formData = new FormData(formElement);

        try {
            const requests: Promise<XMLHttpRequest>[] = [];

            const plainData: changeProfileInfoProps = {
                first_name: formData.get('first_name') as string,
                second_name: formData.get('second_name') as string,
                display_name: formData.get('display_name') as string,
                login: formData.get('login') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
            };
            requests.push(profileApi.changeProfileInfo(plainData));

            const avatarFile = formData.get('avatar');

            if (avatarFile instanceof File && avatarFile.size > 0) {
                const avatarFormData = new FormData();
                avatarFormData.append('avatar', avatarFile);
                requests.push(profileApi.changeAvatar(avatarFormData));
            }

            return await Promise.all(requests);

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
