import { IsParticipatingDto } from "../../types/api/eventsTypes";
import { api } from "../instance";

export function isUserParticipating(id: string) {
    return api.get<IsParticipatingDto>(`Events/is_participant/${id}`);
}

