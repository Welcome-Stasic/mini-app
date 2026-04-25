import type { EventItem } from "../../types/events";
import apiClient from "../axios";
import {
  ADD_EVENT_TO_USER,
  GET_EVENT_IMAGE,
  GET_EVENTS,
  GET_USER_EVENTS_ACCOUNT,
  REMOVE_EVENT_FROM_USER,
} from "../endpoints";

////////// Взаимодействие с ивентами //////////

// Получение всех ивентов
export const getEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get(GET_EVENTS);
  return response.data;
};
// Добавить ивент польщователю по id
export const addEventToUser = async (id: string): Promise<void> => {
  await apiClient.put(ADD_EVENT_TO_USER, id);
};
// Получить ивенты пользователя
export const getMyEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get(GET_USER_EVENTS_ACCOUNT);
  return response.data;
};
// Удалить ивент у пользователя по id
export const removmeEventById = async (id: string): Promise<void> => {
  await apiClient.put(REMOVE_EVENT_FROM_USER, id);
};
export const getEventImage = async (
  eventId: string,
  index: number,
): Promise<Blob | null> => {
  try {
    const response = await apiClient.get(
      `${GET_EVENT_IMAGE}/${eventId}/${index}`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};
