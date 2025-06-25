import { UsefulServiceCategory } from "./UsefulServicesResponse"

export type EditCreateUsefulServiceRequest = {
    title: string,
    category: UsefulServiceCategory
    description: string,
    link: string,
    termsOfDisctribution: string,
    logoId: string | null
}