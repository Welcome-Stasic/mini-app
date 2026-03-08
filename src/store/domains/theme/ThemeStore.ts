import { makeAutoObservable } from "mobx";
import { storage } from "../../lib/localStorage";

type Theme = "light" | "dark";

class ThemeStore {
  theme: Theme = "light";

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init() {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      this.theme = tg.colorScheme === "dark" ? "dark" : "light";
      this.applyTheme();
      tg.onEvent("themeChanged", () => {
        this.theme = tg.colorScheme === "dark" ? "dark" : "light";
        this.applyTheme();
      });
      tg.ready();
    } else {
      const saved = storage.get<Theme>("theme", "light");
      this.theme = saved;
      this.applyTheme();
    }
  }

  private applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  private saveTheme() {
    if (!window.Telegram?.WebApp) {
      storage.set("theme", this.theme);
    }
  }

  setTheme = (theme: Theme) => {
    this.theme = theme;
    this.applyTheme();
    this.saveTheme();
  };

  toggleTheme = () => {
    console.log("toggleTheme called, current theme:", this.theme);
    if (window.Telegram?.WebApp) {
      console.log(
        "Inside Telegram, theme is managed by system. Not toggling manually.",
      );
      return;
    }
    this.setTheme(this.theme === "light" ? "dark" : "light");
  };
}

export default ThemeStore;
