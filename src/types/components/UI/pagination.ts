import { Pagination } from "../../api/UsefulServicesResponse";

export interface PaginationProps {
    pagination: Pagination;
    onPageChange: (page: number) => void;
  }