import { ProfileResponse } from '../api/profileResponse'
import { LanguageEnum } from './LanguageEnum'
import { StatusEnum } from './StatusEnum'

export interface UserState {
    user?: ProfileResponse | null,
    accessToken?: string,
    refreshToken?: string,
    status: StatusEnum,
    language: LanguageEnum;
}