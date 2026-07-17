import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types/property';
import { useComparison } from '../contexts/ComparisonContext';

interface PropertyCardProps {
  property: Property;
  showCompare?: boolean;
}

export function PropertyCard({ property, showCompare = true }: PropertyCardProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { toggleProperty, isSelected } = useComparison();

  const selected = isSelected(property.id);

  const toggleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsShareOpen(prev => !prev);
  };

  const closeShare = () => {
    setIsShareOpen(false);
    setCopied(false);
  };

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/80 flex flex-col h-full relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f3f0]">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-[#f5f3f0] animate-pulse"></div>
          )}
          <img src={property.imageUrl} alt={property.title} loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[800ms] ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {showCompare && (
            <div className={`absolute bottom-4 right-4 z-20 transition-all duration-300 ${
              selected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>
              <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleProperty(property); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer transition-all duration-300 shadow-sm border ${
                  selected
                    ? 'bg-[#c0a062]/95 border-[#c0a062] text-white'
                    : 'bg-white/90 border-white/40 text-gray-400 hover:bg-white hover:text-[#c0a062] hover:border-[#c0a062]/30'
                }`}>
                <span className="material-icons transition-transform duration-300" style={{ fontSize: 14, width: 14, height: 14 }}>
                  {selected ? 'check_box' : 'compare_arrows'}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider leading-none pt-px">
                  {selected ? 'Selecionado' : 'Comparar'}
                </span>
              </button>
            </div>
          )}

          <button onClick={toggleShare}
            className="absolute bottom-4 left-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-[#c0a062] transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
            title="Compartilhar">
            <span className="material-icons" style={{ fontSize: 18, width: 18, height: 18 }}>share</span>
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow relative z-10 bg-white">
          <div className="mb-3">
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              <span className="shrink-0 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-widest bg-gray-100 text-gray-500">
                {property.type}
              </span>
              <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-widest ${
                property.operation === 'Aluguel'
                  ? 'bg-emerald-50 text-emerald-600'
                  : property.operation === 'Venda e Aluguel'
                    ? 'bg-gray-900 text-white'
                    : 'bg-[#c0a062]/10 text-[#c0a062]'
              }`}>
                {property.operation === 'Venda e Aluguel' ? 'Venda & Aluguel' : property.operation}
              </span>
              <span className="shrink-0 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider bg-gray-50 text-gray-400 border border-gray-100">
                {property.code}
              </span>
            </div>
            <Link to={`/imoveis/${property.code}`} className="block group/title">
              <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover/title:text-[#c0a062] transition-colors duration-300">
                {property.title}
              </h3>
            </Link>
          </div>
          
          <p className="text-gray-400 text-xs mb-4 flex items-center gap-1 font-medium">
            <span className="material-icons text-gray-300" style={{ fontSize: 14, width: 14, height: 14 }}>location_on</span>
            {property.location}
          </p>

          <div className="flex flex-col gap-1 mb-4">
            {property.salePrice !== undefined && (
              <div className="text-lg font-bold text-gray-900 leading-tight">
                {property.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
              </div>
            )}
            {property.rentPrice !== undefined && (
              <div className={`text-lg font-bold leading-tight ${property.salePrice !== undefined ? 'text-[#c0a062]' : 'text-gray-900'}`}>
                {property.rentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                {property.salePrice !== undefined && <span className="text-xs font-normal text-gray-400">/mês</span>}
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100/80 flex items-center gap-3 text-gray-400 text-xs font-medium mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="material-icons" style={{ fontSize: 15, width: 15, height: 15 }}>bed</span>
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="material-icons" style={{ fontSize: 15, width: 15, height: 15 }}>bathtub</span>
                <span>{property.bathrooms}</span>
              </div>
            )}
            {(property.garage ?? 0) > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="material-icons" style={{ fontSize: 15, width: 15, height: 15 }}>directions_car</span>
                <span>{property.garage}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="material-icons" style={{ fontSize: 15, width: 15, height: 15 }}>square_foot</span>
              <span>{property.area}m²</span>
            </div>
          </div>
        </div>

        {isShareOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeShare}>
            <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-2xl transform scale-100 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-900">Compartilhar</h4>
                <button onClick={closeShare} className="text-gray-400 hover:text-gray-600">
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="flex justify-center mb-4">
                <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#25D366] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="material-icons">chat</span>
                  </div>
                  <span className="text-xs">WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 truncate flex-1">https://alpha.com/imoveis/{property.code}</span>
                <button onClick={copyLink} className="text-[#c0a062] hover:text-[#1d4ed8] text-xs font-bold px-2">
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
