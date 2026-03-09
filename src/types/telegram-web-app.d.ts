export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        colorScheme: "light" | "dark";
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
}
