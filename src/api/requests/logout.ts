import { api } from "../instance";

export function logout() {
    return api.post('Auth/logout')
}