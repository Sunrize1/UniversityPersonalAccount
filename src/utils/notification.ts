import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../store/store';
import { addNotification, removeNotification } from '../store/notificationSlice/notificationSlice';
import { NotificationTypeEnum } from '../types/redux/NotificationTypeEnum';

export const showNotification = (
  dispatch: AppDispatch,
  message: string,
  type: NotificationTypeEnum,
  duration = 5000
) => {
  const id = uuidv4();
  
  dispatch(
    addNotification({
      id,
      message,
      type,
      duration,
    })
  );

  setTimeout(() => {
    dispatch(removeNotification(id));
  }, duration);
};