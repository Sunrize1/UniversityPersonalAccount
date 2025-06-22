import { ProfileResponse } from "../../types/api/profileResponse";
import { api } from "../instance";

export function getUserForAdmin(id: string) {
    return api.get<ProfileResponse>(`User/${id}`);
}