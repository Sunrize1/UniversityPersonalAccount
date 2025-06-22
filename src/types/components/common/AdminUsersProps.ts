import { ProfileShortDto } from "../../api/AdminUsersResponse"
import { Pagination } from "../../api/UsefulServicesResponse"

export type AdminUsersProps = {
    users: ProfileShortDto[],
    pagination?: Pagination,
    onUserClick?: (user: ProfileShortDto) => void,
    onPageChange?: (page: number) => void,
    isLoading?: boolean
}

export type AdminUserProps = {
    user: ProfileShortDto,
    onClick?: (user: ProfileShortDto) => void
}

export interface UsersFilterForm {
    name: string;
    email: string;
    filterLastName: string;
}

export interface UsersFilterProps {
    onSearch: (filters: { name: string; email: string; filterLastName: string }) => void;
    isLoading?: boolean;
}


export enum CardType  {
    row = "row",
    col = "col"
}