import { FileDto } from "../../api/certificateTypes"
import { EditCreateUsefulServiceRequest } from "../../api/CreateUsefulServiceRequest"

export type AddUsefulServiceModalProps = {
    onClose : () => void,
    isOpen: boolean,
    serviceData?: EditCreateUsefulServiceRequest | null
    image?: FileDto | null

}