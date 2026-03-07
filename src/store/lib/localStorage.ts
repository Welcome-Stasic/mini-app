export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {}
  },
};
