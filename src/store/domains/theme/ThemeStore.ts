import { makeAutoObservable } from "mobx";
import { storage } from "../../lib/localStorage";
import type { Theme } from "./ThemeStore.types";

class ThemeStore {
  theme: Theme = "light";

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  private loadTheme() {
    this.theme = storage.get<Theme>("theme", "light");
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  setTheme = (theme: Theme) => {
    this.theme = theme;
    storage.set("theme", theme);
    this.applyTheme();
  };

  toggleTheme = () => {
    this.setTheme(this.theme === "light" ? "dark" : "light");
  };
}

export default ThemeStore;
