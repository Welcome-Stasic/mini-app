import { makeAutoObservable } from "mobx";
import type { EventItem } from "../../../types/events";
import { storage } from "../../lib/localStorage";

class EventsStore {
  myEvents: EventItem[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  private loadFromStorage() {
    this.myEvents = storage.get("myEvents", []);
  }

  addEvent = (event: EventItem) => {
    if (!this.myEvents.some((e) => e.id === event.id)) {
      this.myEvents.push(event);
      storage.set("myEvents", this.myEvents);
    }
  };

  removeEvent = (eventId: string) => {
    this.myEvents = this.myEvents.filter((e) => e.id !== eventId);
    storage.set("myEvents", this.myEvents);
  };

  isEventAdded = (eventId: string): boolean => {
    return this.myEvents.some((e) => e.id === eventId);
  };
}

export default EventsStore;
