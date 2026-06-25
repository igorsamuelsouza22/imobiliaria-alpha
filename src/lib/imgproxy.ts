const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ImgproxyOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif' | 'auto';
  resizingType?: 'fit' | 'fill' | 'fill-down' | 'force' | 'auto';
}

const cache = new Map<string, string>();

export async function getImgproxyUrl(imageUrl: string, options: ImgproxyOptions = {}): Promise<string> {
  if (!imageUrl) return '';

  const { width = 800, height = 600, quality = 80, format = 'webp', resizingType = 'fill' } = options;
  const cacheKey = `${imageUrl}|${width}|${height}|${quality}|${format}|${resizingType}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`${API_URL}/api/imgproxy/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, width, height, quality, format, resizingType }),
    });

    if (!response.ok) return imageUrl;

    const data = await response.json();
    if (data.url) {
      cache.set(cacheKey, data.url);
      return data.url;
    }
  } catch {
    // fallback to raw URL
  }

  return imageUrl;
}

export function getImgproxyUrlSync(imageUrl: string): string {
  return imageUrl;
}
