import { loginResponse } from "../../types/api/loginResponse";
import { LoginInput } from "../../types/components/forms/LoginInput";
import { api } from "../instance";

export function login(loginData: LoginInput) {
    return api.post<loginResponse>('Auth/login', loginData)
}