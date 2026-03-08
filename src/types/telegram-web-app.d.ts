export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        colorScheme: "light" | "dark";
        themeParams: Record<string, string>;
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
}
