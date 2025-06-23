import { api } from "../instance";
import { EditCreateUsefulServiceRequest } from "../../types/api/CreateUsefulServiceRequest";
import { UsefulService } from "../../types/api/UsefulServicesResponse";

export const createUsefulService = async (data: EditCreateUsefulServiceRequest) => {
    return api.post<UsefulService>('UsefulServices', data);
}; 