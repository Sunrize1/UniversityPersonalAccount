import { EventFullDto } from "../../types/api/eventsTypes";
import { api } from "../instance";

export function getEventDetailsForAdmin(id: string) {
    return api.get<EventFullDto>(`Events/${id}`);
}