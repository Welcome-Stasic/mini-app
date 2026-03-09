export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        colorScheme: "light" | "dark";
        initData: string;
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
}
