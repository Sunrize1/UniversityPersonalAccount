import { api } from "../instance";
import { EditCreateUsefulServiceRequest } from "../../types/api/CreateUsefulServiceRequest";

export const updateUsefulService = async (data: EditCreateUsefulServiceRequest, id: string) => {
    return api.put(`UsefulServices/${id}`, data);
}; 