import { api } from "../instance";
import { UsefulServiceCategory, UsefulServicesResponse } from "../../types/api/UsefulServicesResponse";

export function getUsefulServices(usefulServiceCategory: UsefulServiceCategory, pageNumber: number, pageSize: number) {
    return api.get<UsefulServicesResponse>('UsefulServices', {
        params: {
            category: usefulServiceCategory,
            page: pageNumber,
            pageSize: pageSize
        }
    });
}