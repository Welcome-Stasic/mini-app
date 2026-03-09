import { makeAutoObservable, runInAction } from "mobx";
import { storage } from "../../lib/localStorage";
import type { UserProfile } from "../../../types/user";
import { MOCK_USER } from "../../../hooks/Authorizade";

class UserStore {
  user: UserProfile | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  private loadUser() {
    this.user = storage.get<UserProfile | null>("currentUser", null);
  }

  private saveUser() {
    if (this.user) {
      storage.set("currentUser", this.user);
    } else {
      storage.remove("currentUser");
    }
  }

  setUser = (user: UserProfile | null) => {
    this.user = user;
    this.saveUser();
  };

  get isAuthenticated() {
    return Boolean(this.user);
  }

  async fetchUserProfile(userId: string) {
    this.loading = true;
    this.error = null;

    try {
      // TODO: заменить на реальный API
      // const response = await fetch(`/api/users/${userId}`);
      // const userData = await response.json();
      const mockUserData: UserProfile = MOCK_USER;

      runInAction(() => {
        this.user = mockUserData;
        this.saveUser();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Неизветсвна Ошибка";
        this.loading = false;
      });
      console.error("Ошибка загрузки профиля:", error);
    }
  }

  async updateUserProfile(updates: Partial<UserProfile>) {
    if (!this.user) return;

    this.loading = true;
    this.error = null;

    try {
      // TODO: заменить на реальный API
      // const response = await fetch(`/api/users/${this.user.id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // const updatedUser = await response.json();

      const updatedUser = { ...this.user, ...updates };

      runInAction(() => {
        this.user = updatedUser;
        this.saveUser();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Неизветсвна Ошибка";
        this.loading = false;
      });
    }
  }
}

export default UserStore;
