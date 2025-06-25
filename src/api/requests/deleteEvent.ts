import { api } from "../instance";

export const deleteEvent = async (id: string) => {
    return api.delete(`Events`, { params: { id } });
}; 