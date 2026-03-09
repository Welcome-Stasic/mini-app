import EventsCatalogStore from "./domains/events/EventsCatalogStore";
import MyEventsStore from "./domains/events/MyEventsStore";
import ThemeStore from "./domains/theme/ThemeStore";
import UserStore from "./domains/user/UserStore";

export interface IRootStore {
  eventsCatalogStore: EventsCatalogStore;
  myEventsStore: MyEventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
}

class RootStore {
  eventsCatalogStore: EventsCatalogStore;
  myEventsStore: MyEventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
  constructor() {
    this.eventsCatalogStore = new EventsCatalogStore();
    this.myEventsStore = new MyEventsStore();
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore();
  }
}

export default RootStore;
