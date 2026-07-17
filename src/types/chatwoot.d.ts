export {};

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: {
      setUser: (identifier: string, user: { name?: string; email?: string; phone_number?: string; avatar_url?: string }) => void;
      toggle: (state?: 'open' | 'close') => void;
    };
  }
}
