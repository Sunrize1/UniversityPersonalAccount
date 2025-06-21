import { FileDto } from "../../types/api/certificateTypes";
import { api } from "../instance";


export function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('File', file);
    return api.post<FileDto>('Files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
