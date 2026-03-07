import EventsStore from "./domains/events/EventsStore";
import ThemeStore from "./domains/theme/ThemeStore";
import UserStore from "./domains/user/UserStore";

export interface IRootStore {
  eventsStore: EventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
}

class RootStore {
  eventsStore: EventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
  constructor() {
    this.eventsStore = new EventsStore();
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore();
  }
}

export default RootStore;
