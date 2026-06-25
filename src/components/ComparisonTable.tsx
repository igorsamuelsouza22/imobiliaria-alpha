import { Link } from 'react-router-dom';
import type { Property } from '../types/property';

interface ComparisonTableProps {
  selectedProperties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (property: Property) => void;
  onClear: () => void;
}

export function ComparisonTable({ selectedProperties, isOpen, onClose, onRemove, onClear }: ComparisonTableProps) {
  if (!isOpen) return null;

  const closeAndStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Comparativo de Imóveis</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="overflow-auto p-4 md:p-8 custom-scrollbar bg-gray-50/50">
          <div className="min-w-[800px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
            <table className="w-full border-collapse text-left">
              <thead className="bg-white">
                <tr>
                  <th className="sticky top-0 left-0 z-40 bg-white p-6 border-b border-r border-gray-100 min-w-[200px] shadow-sm">
                    <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Imóvel</span>
                  </th>
                  {selectedProperties.map(prop => (
                    <th key={prop.id} className="sticky top-0 z-30 bg-white p-6 border-b border-r border-gray-100 min-w-[280px] last:border-r-0 shadow-sm align-top">
                      <div className="relative group">
                        <button onClick={() => onRemove(prop)}
                          className="absolute -top-3 -right-3 bg-white text-gray-400 hover:text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-30 border border-gray-100">
                          <span className="material-icons" style={{ fontSize: 18, width: 18, height: 18 }}>close</span>
                        </button>
                        <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm">
                          <img src={prop.imageUrl} alt={prop.title} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug mb-1 group-hover:text-[#c0a062] transition-colors min-h-[40px]">
                          {prop.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <span className="material-icons" style={{ fontSize: 12, width: 12, height: 12 }}>location_on</span>
                          {prop.location}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-gray-50 p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-[#c0a062]" style={{ fontSize: 14, width: 14, height: 14 }}>payments</span>
                    Preço
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 font-serif font-bold text-[#c0a062] bg-white group-hover:bg-gray-50/50 transition-colors">
                      <div className="flex flex-col gap-1">
                        {prop.salePrice && (
                          <span className="text-sm md:text-base"><span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest block mb-0.5">Venda</span>{prop.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</span>
                        )}
                        {prop.rentPrice && (
                          <span className="text-sm md:text-base"><span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest block mb-0.5">Aluguel</span>{prop.rentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-white p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-gray-400" style={{ fontSize: 14, width: 14, height: 14 }}>square_foot</span>
                    Área Útil
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 text-gray-900 bg-white group-hover:bg-gray-50/50 transition-colors text-sm">
                      {prop.area} m²
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-gray-50 p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-gray-400" style={{ fontSize: 14, width: 14, height: 14 }}>bed</span>
                    Quartos
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 text-gray-900 bg-white group-hover:bg-gray-50/50 transition-colors text-sm">
                      {prop.bedrooms} {prop.bedrooms === 1 ? 'Quarto' : 'Quartos'}
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-white p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-gray-400" style={{ fontSize: 14, width: 14, height: 14 }}>bathtub</span>
                    Banheiros
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 text-gray-900 bg-white group-hover:bg-gray-50/50 transition-colors text-sm">
                      {prop.bathrooms} {prop.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-gray-50 p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-gray-400" style={{ fontSize: 14, width: 14, height: 14 }}>directions_car</span>
                    Vagas
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 text-gray-900 bg-white group-hover:bg-gray-50/50 transition-colors text-sm">
                      {prop.garage ?? 0} {(prop.garage ?? 0) === 1 ? 'Vaga' : 'Vagas'}
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-white p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    <span className="material-icons text-gray-400" style={{ fontSize: 14, width: 14, height: 14 }}>info</span>
                    Tipo
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 text-gray-900 bg-white group-hover:bg-gray-50/50 transition-colors text-sm">
                      {prop.type}
                    </td>
                  ))}
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <th className="sticky left-0 z-20 bg-gray-50 p-4 border-r border-gray-100 font-bold text-gray-600 flex items-center gap-3">
                    Ação
                  </th>
                  {selectedProperties.map(prop => (
                    <td key={prop.id} className="p-4 border-r border-gray-100 last:border-r-0 bg-white group-hover:bg-gray-50/50 transition-colors">
                      <Link to={`/imoveis/${prop.code}`} onClick={closeAndStopPropagation}
                        className="w-full bg-[#c0a062] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                        Ver Detalhes
                        <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>launch</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
          <p className="text-sm text-gray-400 font-medium">
            Selecione até 3 imóveis para comparar
          </p>
          <button onClick={onClear} className="text-red-500 hover:text-red-600 text-sm font-bold px-6 py-3 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2">
            <span className="material-icons" style={{ fontSize: 18, width: 18, height: 18 }}>delete_outline</span>
            Limpar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
