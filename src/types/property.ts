export interface PropertyImage {
  url: string;
  room: string;
}

export interface RoomImageGroup {
  room: string;
  images: string[];
}

export interface Feature {
  value: string;
  label: string;
  iconName: string;
  quantity?: number;
}

export interface Feature {
  value: string;
  label: string;
  iconName: string;
  quantity?: number;
}

export interface Property {
  id: string;
  code: string;
  title: string;
  salePrice?: number;
  rentPrice?: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  category: 'Residencial' | 'Comercial';
  type: 'Casa' | 'Apartamento' | 'Terreno' | 'Cobertura' | 'Salão Comercial' | 'Galpão' | 'Escritório';
  operation: 'Venda' | 'Aluguel' | 'Venda e Aluguel';
  description: string;
  featured: boolean;
  images?: PropertyImage[];
  roomImages?: RoomImageGroup[];
  features?: Feature[];
  videoUrl?: string;
  instagramUrls?: string[];
  garage?: number;
}
