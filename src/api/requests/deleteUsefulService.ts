import { api } from "../instance";

export const deleteUsefulService = async (id: string) => {
    return api.delete(`UsefulServices/${id}`);
}; 