import { api } from "../instance";


export function updateAvatar(fileId: string) {
    return api.put('Profile/avatar', { fileId });
}
