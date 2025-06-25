import { api } from "../instance";
import { UsefulServiceCategory, UsefulServicesResponse } from "../../types/api/UsefulServicesResponse";

function paramsSerializer(params: any) {
    const esc = encodeURIComponent;
    return Object.keys(params)
        .map(key => {
            const value = params[key];
            if (Array.isArray(value)) {
                return value.map((v: any) => `${esc(key)}=${esc(v)}`).join('&');
            }
            return `${esc(key)}=${esc(value)}`;
        })
        .join('&');
}

export function getUsefulServices(pageNumber: number, pageSize: number, usefulServiceCategory?: UsefulServiceCategory[]) {
    return api.get<UsefulServicesResponse>('UsefulServices', {
        params: {
            categories: usefulServiceCategory,
            page: pageNumber,
            pageSize: pageSize
        },
        paramsSerializer
    });
}