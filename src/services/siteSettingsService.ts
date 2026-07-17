import type { SiteSettings } from '../types/siteSettings';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch(`${API_URL}/site-settings`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar configurações do site:', error);
    return null;
  }
}
