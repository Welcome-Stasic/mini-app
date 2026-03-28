import apiClient from "../axios";
import { SUBSCRIBE, UNSUBSCRIBE } from "../endpoints";

////////// Взаимодействие с подпиской на уведомления //////////

// Подписка на уведомления
export const subscribeNotification = async (): Promise<void> => {
    await apiClient.put(SUBSCRIBE);
};
// Отписка от уведомлений
export const unsubscribeNotification = async (): Promise<void> => {
    await apiClient.put(UNSUBSCRIBE);
};