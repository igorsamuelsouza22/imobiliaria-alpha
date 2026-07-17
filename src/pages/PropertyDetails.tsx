import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { getPropertyById } from '../services/propertyService';
import type { Property } from '../types/property';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { openChatwootWithUser } from '../lib/chatwootWidget';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FEATURE_ICONS: Record<string, string> = {
  Wind: 'air',
  Waves: 'waves',
  ShieldCheck: 'shield',
  CookingPot: 'soup_kitchen',
  Car: 'directions_car',
  Flame: 'local_fire_department',
  ArrowUpCircle: 'trending_up',
  Music: 'music_note',
  Dumbbell: 'fitness_center',
  Baby: 'child_friendly',
  Trees: 'park',
  Sun: 'wb_sunny',
  DoorOpen: 'door_front',
  Coffee: 'coffee',
  WashingMachine: 'local_laundry_service',
  ThermometerSun: 'thermostat',
  Wifi: 'wifi',
  Box: 'inventory_2',
  Tv: 'tv',
  Video: 'videocam',
  Key: 'key',
  PawPrint: 'pets',
  TreePine: 'forest',
  Gamepad2: 'sports_esports',
  Printer: 'print',
  Pizza: 'local_pizza',
  Wine: 'wine_bar',
  Utensils: 'restaurant',
  Smartphone: 'smartphone',
  Zap: 'bolt',
  Droplets: 'water_drop',
  Heater: 'device_thermostat',
  Accessibility: 'accessible',
  Mountain: 'landscape',
  Warehouse: 'warehouse',
  Store: 'storefront',
};

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getPropertyById(id).then(data => {
      setProperty(data || null);
      setLoading(false);
    });
  }, [id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeGalleryImageIndex, setActiveGalleryImageIndex] = useState(0);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState('Todos');
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const siteSettings = useSiteSettings();
  const [visitName, setVisitName] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitError, setVisitError] = useState<string | null>(null);
  const [visitSubmitting, setVisitSubmitting] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Once the widget is loaded/identified (see handleScheduleVisit), visually
  // pin it over our card instead of using Chatwoot's default floating
  // corner position. Deliberately does NOT move the iframe's DOM node
  // (tried that first — appendChild-ing it elsewhere made the browser
  // reload the iframe's content, which then hit Chatwoot's X-Frame-Options
  // and rendered a blocked-embed icon). Only inline CSS (position/size) is
  // touched, so the live/identified iframe never reloads. Re-synced on
  // scroll/resize since the card is `position: sticky`.
  useEffect(() => {
    if (!chatOpen) return;
    const holderEl = document.getElementById('cw-widget-holder');
    const iframeEl = holderEl?.querySelector('iframe') as HTMLIFrameElement | null;
    if (!holderEl || !iframeEl) return;
    const holder: HTMLElement = holderEl;
    const iframe: HTMLIFrameElement = iframeEl;

    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.visibility = 'visible';

    // Chatwoot's own stylesheet shapes #cw-widget-holder for its default
    // floating corner bubble (its own box-shadow/margin/radius). Since we're
    // stretching that same element over our card instead, override those
    // here — inline styles win over its external stylesheet — so the
    // visible edges match the card (rounded-xl, no floating shadow/margin)
    // instead of looking like a bubble pasted on top of it.
    holder.style.margin = '0';
    holder.style.borderRadius = '0.75rem';
    holder.style.overflow = 'hidden';
    holder.style.boxShadow = 'none';
    holder.style.border = '1px solid #e5e7eb';
    holder.style.background = '#fff';

    function syncPosition() {
      const rect = chatContainerRef.current?.getBoundingClientRect();
      if (!rect) return;
      holder.style.position = 'fixed';
      holder.style.inset = 'auto';
      holder.style.top = `${rect.top}px`;
      holder.style.left = `${rect.left}px`;
      holder.style.width = `${rect.width}px`;
      holder.style.height = `${rect.height}px`;
      holder.style.zIndex = '30';
    }

    syncPosition();
    window.addEventListener('scroll', syncPosition);
    window.addEventListener('resize', syncPosition);

    return () => {
      window.removeEventListener('scroll', syncPosition);
      window.removeEventListener('resize', syncPosition);
      // Restore Chatwoot's own default floating position instead of
      // leaving it pinned to coordinates that no longer mean anything.
      holder.style.position = '';
      holder.style.inset = '';
      holder.style.top = '';
      holder.style.left = '';
      holder.style.width = '';
      holder.style.height = '';
      holder.style.zIndex = '';
      holder.style.margin = '';
      holder.style.borderRadius = '';
      holder.style.overflow = '';
      holder.style.boxShadow = '';
      holder.style.border = '';
      holder.style.background = '';
    };
  }, [chatOpen]);

  async function handleScheduleVisit() {
    if (!visitName.trim() || !visitEmail.trim() || !visitPhone.trim()) {
      setVisitError('Preencha nome, e-mail e telefone para agendar.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(visitEmail.trim())) {
      setVisitError('Digite um e-mail válido.');
      return;
    }
    const chatwootBaseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL;
    if (!siteSettings.chatwootWebsiteToken || !chatwootBaseUrl) {
      setVisitError('Chat indisponível no momento. Tente novamente mais tarde.');
      return;
    }
    setVisitError(null);
    setVisitSubmitting(true);
    try {
      await openChatwootWithUser(siteSettings.chatwootWebsiteToken, chatwootBaseUrl, {
        name: visitName.trim(),
        email: visitEmail.trim(),
        phone: visitPhone.trim(),
      });
      setChatOpen(true);
    } catch {
      setVisitError('Não foi possível abrir o chat agora. Tente novamente em instantes.');
    } finally {
      setVisitSubmitting(false);
    }
  }

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const roomGroups = property?.roomImages || [];

  const filteredImages = roomGroups.flatMap(g =>
    g.images.map(url => ({ url, room: g.room }))
  );

  const selectRoomCategory = (cat: string) => {
    setSelectedRoomCategory(cat);
    setActiveGalleryImageIndex(0);
    setSelectedImageIndex(null);
  };

  const displayFilteredImages = selectedRoomCategory === 'Todos'
    ? filteredImages
    : filteredImages.filter(img => img.room === selectedRoomCategory);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = '';
  };

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null && displayFilteredImages.length > 0) {
      const nextIndex = (selectedImageIndex + 1) % displayFilteredImages.length;
      setSelectedImageIndex(nextIndex);
      setActiveGalleryImageIndex(nextIndex);
    }
  }, [selectedImageIndex, displayFilteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null && displayFilteredImages.length > 0) {
      const prevIndex = (selectedImageIndex - 1 + displayFilteredImages.length) % displayFilteredImages.length;
      setSelectedImageIndex(prevIndex);
      setActiveGalleryImageIndex(prevIndex);
    }
  }, [selectedImageIndex, displayFilteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (event.key === 'Escape') closeGallery();
      else if (event.key === 'ArrowRight') nextImage();
      else if (event.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, nextImage, prevImage]);

  useEffect(() => {
    if (!property || !mapContainerRef.current || mapRef.current) return;

    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl, iconUrl, shadowUrl,
      iconSize: [25, 41], iconAnchor: [12, 41],
      popupAnchor: [1, -34], tooltipAnchor: [16, -28], shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    const lat = property.latitude || -23.550520;
    const lng = property.longitude || -46.633308;

    const map = L.map(mapContainerRef.current, { center: [lat, lng], zoom: 15, scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
    L.marker([lat, lng]).addTo(map).bindPopup(property.title).openPopup();
    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; };
  }, [property]);

  useEffect(() => {
    if (!priceRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        const isAboveViewport = entry.boundingClientRect.top < 100;
        setShowStickyHeader(!isVisible && isAboveViewport);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(priceRef.current);
    return () => observer.disconnect();
  }, [property]);

  const formatInstagramUrl = (url: string): string => {
    if (!url) return '';
    const baseUrl = url.split('?')[0];
    const normalizedUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${normalizedUrl}embed/`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <span className="material-icons text-gray-300 text-6xl mb-4 animate-spin">hourglass_empty</span>
        <p className="text-gray-500">Carregando imóvel...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <span className="material-icons text-gray-300 text-6xl mb-4">error_outline</span>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Imóvel não encontrado</h2>
        <p className="text-gray-500 mb-6">O imóvel que você está procurando não existe ou foi removido.</p>
        <Link to="/imoveis" className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#c0a062] transition-colors">
          Voltar para Imóveis
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="h-[60vh] relative bg-gray-900">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-8 pt-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-in-up">
              <span className={`px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-widest shadow-sm ${property.operation === 'Aluguel' ? 'bg-[#25D366] text-white' : property.operation === 'Venda e Aluguel' ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-[#c0a062] text-white'}`}>
                {property.operation === 'Venda e Aluguel' ? 'Venda & Aluguel' : property.operation}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-widest bg-white/15 backdrop-blur-md text-white border border-white/20">
                {property.type}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-medium tracking-wider bg-white/10 backdrop-blur-md text-white/80 border border-white/15">
                {property.code}
              </span>
              <span className="flex items-center gap-2 text-sm font-light tracking-wide backdrop-blur-md bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c0a062] animate-pulse"></span>
                {property.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-xl leading-tight max-w-4xl animate-fade-in-up delay-100">
              {property.title}
            </h1>
          </div>
        </div>
        <Link to="/imoveis" className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-3 md:p-3 rounded-full transition-all duration-300 group z-20">
          <span className="material-icons group-hover:-translate-x-1 transition-transform">arrow_back</span>
        </Link>
      </div>

      {showStickyHeader && (
        <div className="fixed top-20 left-0 right-0 bg-white/90 backdrop-blur-lg z-40 border-b border-gray-100/60 animate-slide-in-down shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img src={property.imageUrl} alt={property.title} className="w-9 h-9 rounded-md object-cover hidden sm:block flex-shrink-0 ring-1 ring-gray-100" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-widest shrink-0 ${property.operation === 'Aluguel' ? 'bg-emerald-50 text-emerald-600' : property.operation === 'Venda e Aluguel' ? 'bg-gray-900 text-white' : 'bg-[#c0a062]/10 text-[#c0a062]'}`}>
                    {property.operation === 'Venda e Aluguel' ? 'Venda & Aluguel' : property.operation}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-medium tracking-wider shrink-0 bg-gray-50 text-gray-400 border border-gray-100">
                    {property.code}
                  </span>
                  <h3 className="font-medium text-gray-900 truncate text-xs sm:text-sm">{property.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-[11px] truncate flex items-center gap-1">
                    <span className="material-icons" style={{ fontSize: 13, width: 13, height: 13 }}>location_on</span>
                    {property.location}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    {property.salePrice && <p className="text-[#c0a062] font-bold text-xs">{property.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</p>}
                    {property.rentPrice && <p className="text-[#c0a062] font-bold text-xs">{property.rentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}{property.salePrice && <span className="text-gray-400 font-normal">/mês</span>}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-400">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1" title="Quartos">
                  <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>bed</span>
                  <span className="text-xs font-semibold text-gray-700">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1" title="Banheiros">
                  <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>bathtub</span>
                  <span className="text-xs font-semibold text-gray-700">{property.bathrooms}</span>
                </div>
              )}
              {(property.garage ?? 0) > 0 && (
                <div className="flex items-center gap-1" title="Vagas">
                  <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>directions_car</span>
                  <span className="text-xs font-semibold text-gray-700">{property.garage}</span>
                </div>
              )}
              <div className="h-3 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-1" title="Área">
                <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>square_foot</span>
                <span className="text-xs font-semibold text-gray-700">{property.area}m²</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ScrollReveal direction="up" duration={1000}>
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="mb-10 pb-10 border-b border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div className="text-center" ref={priceRef}>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-2">
                        <span className="material-icons text-gray-400" style={{ fontSize: 18, width: 18, height: 18 }}>payments</span>
                      </div>
                      <span className="block text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">Preço</span>
                      {property.salePrice !== undefined && (
                        <span className="block text-lg font-bold text-gray-900 leading-tight">{property.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</span>
                      )}
                      {property.rentPrice !== undefined && (
                        <span className={`block text-lg font-bold text-gray-900 leading-tight ${property.salePrice !== undefined ? 'mt-0.5' : ''}`}>
                          {property.rentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}<span className="text-sm font-normal text-gray-400">/mês</span>
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-2">
                        <span className="material-icons text-gray-400" style={{ fontSize: 18, width: 18, height: 18 }}>square_foot</span>
                      </div>
                      <span className="block text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">Área</span>
                      <span className="block text-lg font-bold text-gray-900">{property.area}<span className="text-sm font-normal text-gray-400 ml-0.5">m²</span></span>
                    </div>
                    {property.bedrooms > 0 && (
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-2">
                          <span className="material-icons text-gray-400" style={{ fontSize: 18, width: 18, height: 18 }}>bed</span>
                        </div>
                        <span className="block text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">Quartos</span>
                        <span className="block text-lg font-bold text-gray-900">{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-2">
                          <span className="material-icons text-gray-400" style={{ fontSize: 18, width: 18, height: 18 }}>bathtub</span>
                        </div>
                        <span className="block text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">Banheiros</span>
                        <span className="block text-lg font-bold text-gray-900">{property.bathrooms}</span>
                      </div>
                    )}
                    {(property.garage ?? 0) > 0 && (
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-2">
                          <span className="material-icons text-gray-400" style={{ fontSize: 18, width: 18, height: 18 }}>directions_car</span>
                        </div>
                        <span className="block text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">Garagem</span>
                        <span className="block text-lg font-bold text-gray-900">{property.garage}</span>
                      </div>
                    )}
                  </div>
                </div>

                <ScrollReveal>
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Sobre este imóvel</h3>
                      <div className="flex-1 h-px bg-gray-100"></div>
                    </div>
                    <p className="text-gray-600 leading-[1.8] text-base lg:text-lg">
                      {property.description}
                    </p>
                  </div>
                </ScrollReveal>

                {property.features && property.features.length > 0 && (
                  <ScrollReveal>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Características</h3>
                        <div className="flex-1 h-px bg-gray-100"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                        {property.features.map((feature) => (
                          <div key={feature.value} className="flex items-center gap-4 px-6 py-5 bg-white group hover:bg-[#faf8f5] transition-colors duration-300">
                            <div className="w-8 h-8 rounded-full bg-[#f5f0ea] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c0a062]/10 transition-colors">
                              <span className="material-icons text-[#c0a062]" style={{ fontSize: 16, width: 16, height: 16 }}>
                                {FEATURE_ICONS[feature.iconName] || 'check_circle'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{feature.label}{feature.quantity && feature.quantity > 1 ? ` (${feature.quantity})` : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {displayFilteredImages.length > 0 && (
                  <>
                    <ScrollReveal>
                      <div className="mb-8 mt-8">
                        <div className="flex items-center gap-4 mb-8">
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Galeria de Fotos</h3>
                          <div className="flex-1 h-px bg-gray-100"></div>
                        </div>
                      </div>
                    </ScrollReveal>
                    
                    {roomGroups.length > 1 && (
                      <ScrollReveal delay={100}>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <button onClick={() => setSelectedRoomCategory('Todos')}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${selectedRoomCategory === 'Todos' ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#c0a062] hover:text-[#c0a062]'}`}>
                            Todos
                          </button>
                          {roomGroups.map(g => (
                            <button key={g.room} onClick={() => selectRoomCategory(g.room)}
                              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${selectedRoomCategory === g.room ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#c0a062] hover:text-[#c0a062]'}`}>
                              {g.room}
                            </button>
                          ))}
                        </div>
                      </ScrollReveal>
                    )}

                    <ScrollReveal delay={200}>
                      <div className="relative mb-4 group cursor-pointer overflow-hidden rounded-xl" onClick={() => openGallery(activeGalleryImageIndex)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openGallery(activeGalleryImageIndex)}>
                        <div className="aspect-[16/10] bg-gray-100">
                          <img src={displayFilteredImages[activeGalleryImageIndex]?.url || displayFilteredImages[0]?.url} alt={property.title} className="w-full h-full object-contain transition-transform duration-[800ms] ease-out group-hover:scale-105" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <div>
                            <p className="text-white/70 text-xs uppercase tracking-widest font-medium mb-1">{displayFilteredImages[activeGalleryImageIndex]?.room}</p>
                            <p className="text-white font-serif text-lg">{property.title}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/80 text-sm font-mono">{String(activeGalleryImageIndex + 1).padStart(2, '0')} / {String(displayFilteredImages.length).padStart(2, '0')}</span>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                              <span className="material-icons text-white text-xl">zoom_in</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>

                    <div className="flex overflow-x-auto gap-2 pb-2 snap-x snap-mandatory scroll-smooth custom-scrollbar">
                      {displayFilteredImages.map((image, i: number) => (
                        <button key={image.url + i} onClick={() => setActiveGalleryImageIndex(i)}
                          className={`flex-none relative group snap-start focus:outline-none rounded-lg overflow-hidden transition-all duration-300 ${activeGalleryImageIndex === i ? 'ring-2 ring-[#c0a062] ring-offset-2' : 'opacity-50 hover:opacity-100'}`}>
                          <div className="w-20 h-20 md:w-28 md:h-28">
                            <img src={image.url} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                          {activeGalleryImageIndex === i && (
                            <div className="absolute inset-0 bg-[#c0a062]/10"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {property.videoUrl && (
                  <>
                    <div className="mb-8 mt-8">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Vídeo do Imóvel</h3>
                        <div className="flex-1 h-px bg-gray-100"></div>
                      </div>
                    </div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm mb-8 bg-gray-100">
                      <iframe src={property.videoUrl} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </>
                )}

                {property.instagramUrls && property.instagramUrls.length > 0 && (
                  <>
                    <div className="mb-8 mt-8">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Instagram</h3>
                        <div className="flex-1 h-px bg-gray-100"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {property.instagramUrls.map((url: string) => (
                        <div key={url} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                          <iframe src={formatInstagramUrl(url)} className="w-full" width="400" height="540" frameBorder="0" scrolling="no" allowTransparency={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="mb-8 mt-8">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Localização</h3>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>
                </div>
                <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 relative z-0">
                  <div ref={mapContainerRef} className="w-full h-full"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" duration={1000} delay={400} className="lg:w-1/3">
            <div className={`bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all duration-300 ${showStickyHeader ? 'sticky top-[160px]' : 'sticky top-24'}`}>
                {!chatOpen && (
                  <div className="flex items-center gap-4 mb-6">
                    <img src="https://picsum.photos/seed/agent/100/100" alt="Agent" className="w-16 h-16 rounded-full object-cover border-2 border-[#c0a062]" />
                    <div>
                      <p className="text-sm text-gray-500">Consultor Responsável</p>
                      <h3 className="font-bold text-gray-900 text-lg">Ricardo Silva</h3>
                    </div>
                  </div>
                )}

                {chatOpen ? (
                  <div ref={chatContainerRef} className="w-full rounded-xl overflow-hidden border border-gray-200" style={{ height: 580 }} />
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleScheduleVisit(); }}>
                    <input type="text" placeholder="Seu Nome" value={visitName} onChange={(e) => setVisitName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#c0a062] focus:ring-1 focus:ring-[#c0a062] outline-none" />
                    <input type="email" placeholder="Seu E-mail" value={visitEmail} onChange={(e) => setVisitEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#c0a062] focus:ring-1 focus:ring-[#c0a062] outline-none" />
                    <input type="tel" placeholder="Seu Telefone" value={visitPhone} onChange={(e) => setVisitPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#c0a062] focus:ring-1 focus:ring-[#c0a062] outline-none" />
                    {visitError && <p className="text-red-500 text-xs">{visitError}</p>}
                    <button type="submit" disabled={visitSubmitting} className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg hover:bg-[#c0a062] transition-colors disabled:opacity-60">
                      {visitSubmitting ? 'Abrindo chat…' : 'Agendar Visita'}
                    </button>
                  </form>
                )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {selectedImageIndex !== null && displayFilteredImages.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in" onClick={closeGallery}>
          <button onClick={closeGallery} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2 rounded-full hover:bg-white/10">
            <span className="material-icons text-3xl">close</span>
          </button>

          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 md:left-6 text-white/50 hover:text-white transition-colors z-50 p-2 md:p-3 rounded-full hover:bg-white/10 group">
            <span className="material-icons text-4xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
          </button>

          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-2 md:p-3 rounded-full hover:bg-white/10 group">
            <span className="material-icons text-4xl group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>

          <div className="w-full h-full flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
            <img src={displayFilteredImages[selectedImageIndex].url} alt={property.title} className="w-full h-full object-contain animate-scale-in select-none" />
          </div>

          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex items-center justify-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-widest font-medium">{displayFilteredImages[selectedImageIndex]?.room}</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span className="text-white/50 font-mono text-sm">{String(selectedImageIndex + 1).padStart(2, '0')} / {String(displayFilteredImages.length).padStart(2, '0')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
