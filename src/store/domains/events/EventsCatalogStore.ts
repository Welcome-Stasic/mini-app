import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "../../../types/events";
import { mockEvents } from "../../../hooks/EventsDate";

class EventsCatalogStore {
  events: EventItem[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadEvents() {
    this.loading = true;
    try {
      const data = mockEvents;
      runInAction(() => {
        this.events = data;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
export default EventsCatalogStore;
