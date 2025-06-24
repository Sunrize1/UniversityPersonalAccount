import { FileDto } from "../../api/certificateTypes"
import { EditCreateUsefulServiceRequest } from "../../api/CreateUsefulServiceRequest"

export type UsefulServiceModalProps = {
    onClose : () => void,
    onServciceCreated: () => void,
    isOpen: boolean,
    serviceData?: EditCreateUsefulServiceRequest | null
    image?: FileDto | null
    serviceId?: string
}