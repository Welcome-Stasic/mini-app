import {
  signIn,
  getCurrentUser,
  signOut,
  updateUser,
  getAvatar,
  changeAvatar,
} from "./requests/auth";
import {
  addEventToUser,
  getEventImage,
  getEvents,
  getMyEvents,
  removmeEventById,
} from "./requests/events";
import {
  subscribeNotification,
  unsubscribeNotification,
} from "./requests/notification";

export const API = {
  auth: {
    signIn,
    getCurrentUser,
    signOut,
    updateUser,
    getAvatar,
    changeAvatar,
  },
  events: {
    getEvents,
    addEventToUser,
    getMyEvents,
    removmeEventById,
    getEventImage,
  },
  notification: {
    subscribeNotification,
    unsubscribeNotification,
  },
};
