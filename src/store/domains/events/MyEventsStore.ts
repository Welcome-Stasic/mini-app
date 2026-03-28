import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "../../../types/events";

class MyEventsStore {
  myEvents: EventItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  loadMyEvents(events: EventItem[]) {
    try {
      const data = events;
      runInAction(() => {
        this.myEvents = data;
      });
    } catch(error) {
      console.log(error);
    }
  }

  isEventAdded = (eventId: string): boolean => {
    return this.myEvents.some((e) => e.id === eventId);
  };
}

export default MyEventsStore;
