import { StatusEnum } from './StatusEnum'

export interface UserState {
    accessToken?: string,
    refreshToken?: string,
    status: StatusEnum,
}