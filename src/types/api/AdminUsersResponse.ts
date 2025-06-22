import { Pagination } from "./UsefulServicesResponse"

export type AdminUsersResponse = {
    results: ProfileShortDto[],
    metaData: Pagination
}

export type ProfileShortDto = {
    id: number,
    email: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    birthDate: string,
}