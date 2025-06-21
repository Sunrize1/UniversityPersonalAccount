import { InnerEventRegisterRequest } from "../../types/api/eventsTypes";
import { api } from "../instance";


export function innerEventRegister(data: InnerEventRegisterRequest) {
    return api.post(`Events/register/inner`, data);
}