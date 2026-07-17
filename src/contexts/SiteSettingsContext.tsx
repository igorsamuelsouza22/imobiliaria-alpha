import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSiteSettings } from '../services/siteSettingsService';
import type { SiteSettings } from '../types/siteSettings';

// Fallback = today's hardcoded copy, so nothing on the page renders blank
// while the fetch is in flight or if it fails.
const DEFAULT_SETTINGS: SiteSettings = {
  phone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  email: 'contato@alpha.com.br',
  zip: '01310-100',
  street: 'Av. Paulista',
  number: '1000',
  district: null,
  city: 'São Paulo',
  state: 'SP',
  instagramUrl: 'https://www.instagram.com/',
  facebookUrl: null,
  youtubeUrl: 'https://www.youtube.com/',
  linkedinUrl: null,
  businessHours: 'Seg a Sex: 9h às 18h',
  tagline: null,
};

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    getSiteSettings().then((s) => { if (s) setSettings(s); });
  }, []);

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
