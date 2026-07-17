import type { SiteSettings } from '../types/siteSettings';
import { API_URL } from '../lib/apiUrl';

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
