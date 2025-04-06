import { NotificationTypeEnum } from "./NotificationTypeEnum";

export interface Notification {
    id: string;
    message: string;
    type: NotificationTypeEnum;
    duration?: number;
  }
  
export interface NotificationState {
notifications: Notification[];
}