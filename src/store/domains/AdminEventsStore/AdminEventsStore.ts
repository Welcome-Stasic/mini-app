import { makeAutoObservable } from "mobx";
import type { EventItem } from "../../../types/events";

class AdminEventsStore {
  events: EventItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
