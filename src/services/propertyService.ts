import type { Property, Feature } from '../types/property';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type BackendProperty = Record<string, unknown>;

function mapBackendProperty(backend: BackendProperty): Property {
  const address = String(backend.address || '');
  const parts = address.split(/[-,]/).map(p => p.trim());
  const neighborhood = parts.length > 1 ? parts[1] : '';
  const city = parts.length > 2 ? parts[2] : String(backend.city || '');
  const location = [neighborhood, city].filter(Boolean).join(', ') || 'Localização não informada';

  const typeMap: Record<string, string> = {
    house: 'Casa', HOUSE: 'Casa',
    apartment: 'Apartamento', APARTMENT: 'Apartamento',
    commercial: 'Comercial', COMMERCIAL: 'Comercial',
    land: 'Terreno', LAND: 'Terreno',
    studio: 'Apartamento', STUDIO: 'Apartamento',
    farm: 'Casa', FARM: 'Casa',
  };

  const categoryMap: Record<string, 'Residencial' | 'Comercial'> = {
    house: 'Residencial', HOUSE: 'Residencial',
    apartment: 'Residencial', APARTMENT: 'Residencial',
    land: 'Residencial', LAND: 'Residencial',
    studio: 'Residencial', STUDIO: 'Residencial',
    farm: 'Residencial', FARM: 'Residencial',
    commercial: 'Comercial', COMMERCIAL: 'Comercial',
  };

  const statusOperationMap: Record<string, string> = {
    active: 'Venda', inactive: 'Venda', sold: 'Venda',
    rented: 'Aluguel', reserved: 'Venda e Aluguel', draft: 'Venda',
  };

  const images = Array.isArray(backend.images) ? backend.images as string[] : [];
  const coverImage = String(backend.coverImage || '');
  const imageUrl = coverImage || (images[0] || '');

  const roomImagesRaw = backend.roomImages;
  let roomImages: { room: string; images: string[] }[] = [];
  if (Array.isArray(roomImagesRaw)) {
    roomImages = roomImagesRaw.map((group: { room: string; images: string[] }) => ({
      room: group.room || '',
      images: Array.isArray(group.images) ? group.images : [],
    }));
  }

  const rawFeatures = backend.features;
  let features: Feature[] = [];
  if (Array.isArray(rawFeatures)) {
    features = rawFeatures.map((f: Feature | string) =>
      typeof f === 'string'
        ? { value: f, label: f, iconName: 'Box' }
        : { value: f.value || '', label: f.label || f.value || '', iconName: f.iconName || 'Box', quantity: f.quantity }
    );
  }

  return {
    id: String(backend.id || ''),
    code: String(backend.crmId || ''),
    title: String(backend.title || 'Sem título'),
    salePrice: typeof backend.price === 'number' ? backend.price : undefined,
    location,
    bedrooms: Number(backend.bedrooms) || 0,
    bathrooms: Number(backend.bathrooms) || 0,
    area: Number(backend.area) || 0,
    garage: Number(backend.parkingSpaces) || 0,
    imageUrl,
    latitude: typeof backend.latitude === 'number' ? backend.latitude : undefined,
    longitude: typeof backend.longitude === 'number' ? backend.longitude : undefined,
    category: categoryMap[String(backend.type)] || 'Residencial',
    type: typeMap[String(backend.type)] || 'Casa',
    operation: statusOperationMap[String(backend.status)] || 'Venda',
    description: String(backend.description || ''),
    featured: backend.status === 'active',
    images: images.map((url) => ({ url, room: '' })),
    roomImages,
    features,
  };
}

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${API_URL}/properties`);
    if (!response.ok) return [];
    const data = await response.json() as BackendProperty[];
    return data.map(mapBackendProperty);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) return undefined;
    const data = await response.json() as BackendProperty;
    return mapBackendProperty(data);
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error);
    return undefined;
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties();
  return all.filter(p => p.featured);
}
