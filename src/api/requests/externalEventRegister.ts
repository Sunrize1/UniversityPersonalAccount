import { ExternalEventRegisterRequest } from "../../types/api/eventsTypes";
import { api } from "../instance";


export function externalEventRegister(data: ExternalEventRegisterRequest) {
    return api.post(`Events/register/external`, data);
}