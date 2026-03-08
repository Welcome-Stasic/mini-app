import { makeAutoObservable } from "mobx";
import { storage } from "../../lib/localStorage";

type Theme = "light" | "dark";

class ThemeStore {
  theme: Theme = "light";
  private _isTelegramAvailable = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init() {
    if (this.checkTelegram()) {
      this.initTelegram();
    } else {
      this.loadTheme();
    }
  }

  private checkTelegram(): boolean {
    if (typeof window === "undefined") return false;
    const hasTelegram = !!(window as any).Telegram?.WebApp;
    this._isTelegramAvailable = hasTelegram;
    return hasTelegram;
  }

  private initTelegram() {
    const tg = (window as any).Telegram.WebApp;
    this.setTheme(tg.colorScheme);
    tg.onEvent("themeChanged", () => {
      this.setTheme(tg.colorScheme);
    });
    tg.ready();
  }

  private loadTheme() {
    const saved = storage.get<Theme>("theme", "light");
    this.theme = saved;
    this.applyTheme();
  }

  private saveTheme() {
    if (this._isTelegramAvailable) return;
    storage.set("theme", this.theme);
  }

  private applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    this.applyTheme();
    this.saveTheme();
  }

  toggleTheme() {
    if (this._isTelegramAvailable) return;
    this.setTheme(this.theme === "light" ? "dark" : "light");
  }

  get isTelegramAvailable() {
    return this._isTelegramAvailable;
  }
}

export default ThemeStore;
