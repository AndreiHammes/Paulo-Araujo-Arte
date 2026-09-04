import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom nesta versão não expõe localStorage; o LanguageProvider depende dele.
const languageStore = new Map<string, string>();
Object.defineProperty(window, "localStorage", {
  writable: true,
  value: {
    getItem: (key: string) => languageStore.get(key) ?? null,
    setItem: (key: string, value: string) => void languageStore.set(key, value),
    removeItem: (key: string) => void languageStore.delete(key),
    clear: () => languageStore.clear(),
  },
});
