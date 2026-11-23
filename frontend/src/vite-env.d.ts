/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AI_BASE_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_ENABLE_MOCK_FALLBACK: string;
  readonly VITE_SHOW_PROTOTYPE_BAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
