import { FileDto } from "./certificateTypes";

export type UsefulService = {
    id: string;
    category: UsefulServiceCategory;
    title: string;
    description: string;
    link: string;
    termsOfDisctribution: string;
    logo: FileDto;

}

export enum UsefulServiceCategory {
    ForAll = "ForAll",
    Students = "Students",
    Employees = "Employees"
}

export type UsefulServicesResponse = {
    results: UsefulService[];
    pagination: Pagination;
}

export type Pagination = {
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
}