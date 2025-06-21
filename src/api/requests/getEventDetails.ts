import { EventFullDto } from "../../types/api/eventsTypes";
import { api } from "../instance";

export function getEventDetails(id: string) {
    return api.get<EventFullDto>(`Events/public/${id}`);
}