interface ExpoDomWebView {
  expoModulesProxy: Record<string, unknown>;
}

declare global {
  interface Window {
    ExpoDomWebView?: ExpoDomWebView;
  }
}

export {};