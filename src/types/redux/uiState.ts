import { LanguageEnum } from "./LanguageEnum";

export interface UIState {
    isModalOpen: boolean;
    language: LanguageEnum
    errorMessage: string | null;
}