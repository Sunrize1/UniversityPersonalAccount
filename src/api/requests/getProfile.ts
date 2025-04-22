import { ProfileResponse } from "../../types/api/profileResponse";
import { api } from "../instance";

export function getProfile() {
    return api.get<ProfileResponse>('Profile');
}