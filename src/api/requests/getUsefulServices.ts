import { api } from "../instance";
import { UsefulServiceCategory, UsefulServicesResponse } from "../../types/api/UsefulServicesResponse";

export function getUsefulServices(pageNumber: number, pageSize: number, usefulServiceCategory?: UsefulServiceCategory) {
    return api.get<UsefulServicesResponse>('UsefulServices', {
        params: {
            category: usefulServiceCategory,
            page: pageNumber,
            pageSize: pageSize
        }
    });
}