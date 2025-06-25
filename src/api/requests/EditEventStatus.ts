import { EventStatus } from "../../types/api/eventsTypes";
import { api } from "../instance";

export const editEventStatus = async (id: string, newStatus: EventStatus) => {
    return api.put(`Events/Status`, {id, newStatus});
}; 