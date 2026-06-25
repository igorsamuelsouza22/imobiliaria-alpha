import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { ComparisonTable } from '../components/ComparisonTable';
import { ScrollReveal } from '../components/ScrollReveal';
import { getProperties } from '../services/propertyService';
import { useComparison } from '../contexts/ComparisonContext';
import type { Property } from '../types/property';

interface FilterContentProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: 'Todos' | 'Residencial' | 'Comercial';
  selectedOperation: 'Todas' | 'Venda' | 'Aluguel';
  selectedTypes: string[];
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  selectedBedrooms: number[];
  selectedBathrooms: number[];
  selectedGarages: number[];
  setOperation: (op: 'Todas' | 'Venda' | 'Aluguel') => void;
  setCategory: (cat: 'Todos' | 'Residencial' | 'Comercial') => void;
  toggleType: (type: string) => void;
  selectAllTypes: () => void;
  toggleBedroom: (num: number) => void;
  toggleBathroom: (num: number) => void;
  toggleGarage: (num: number) => void;
  updatePrice: (value: string, type: 'min' | 'max') => void;
  formatPrice: (value: number) => string;
  availableTypes: string[];
  selectedTypesLabel: string;
  isCategoryDropdownOpen: boolean;
  isTypeDropdownOpen: boolean;
  setIsCategoryDropdownOpen: (v: boolean) => void;
  setIsTypeDropdownOpen: (v: boolean) => void;
}

function FilterContent({
  searchQuery, setSearchQuery,
  selectedCategory, selectedOperation, selectedTypes,
  minPrice, maxPrice, minArea, maxArea,
  selectedBedrooms, selectedBathrooms, selectedGarages,
  setOperation, setCategory, toggleType, selectAllTypes,
  toggleBedroom, toggleBathroom, toggleGarage, updatePrice, formatPrice,
  availableTypes, selectedTypesLabel,
  isCategoryDropdownOpen, isTypeDropdownOpen,
  setIsCategoryDropdownOpen, setIsTypeDropdownOpen,
}: FilterContentProps) {
  return (
    <>
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Operação</label>
        <div className="flex bg-gray-50 p-1 rounded-2xl gap-1">
          {(['Todas', 'Venda', 'Aluguel'] as const).map(op => (
            <button key={op} onClick={() => setOperation(op)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${selectedOperation === op ? 'bg-white shadow-sm text-[#c0a062]' : 'text-gray-500'}`}>
              {op === 'Todas' ? 'Todas' : op === 'Venda' ? 'Comprar' : 'Alugar'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Localização</label>
        <div className="relative group">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c0a062] transition-colors">search</span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cidade ou bairro..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none transition-all text-sm font-medium text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Finalidade</label>
        <button onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          className="w-full flex items-center justify-between bg-gray-50 hover:bg-white border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] px-5 py-4 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md text-left">
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{selectedCategory}</span>
          <span className={`material-icons text-gray-400 group-hover:text-[#c0a062] transition-colors ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {isCategoryDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-scale-in origin-top">
            {(['Todos', 'Residencial', 'Comercial'] as const).map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${selectedCategory === cat ? 'text-[#c0a062] font-bold' : 'text-gray-600'}`}>
                {cat}
                {selectedCategory === cat && <span className="material-icons text-sm font-bold">check</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Tipo de Imóvel</label>
        <button onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
          className="w-full flex items-center justify-between bg-gray-50 hover:bg-white border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] px-5 py-4 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md text-left">
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate pr-2">{selectedTypesLabel}</span>
          <span className={`material-icons text-gray-400 group-hover:text-[#c0a062] transition-colors flex-shrink-0 ${isTypeDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
        </button>

        {isTypeDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-30 animate-scale-in origin-top p-2">
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <input type="checkbox" checked={selectedTypes.length === 0} onChange={selectAllTypes}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#c0a062] checked:border-[#c0a062] transition-all cursor-pointer" />
                  <span className="material-icons absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" style={{ fontSize: 14, width: 14, height: 14, fontWeight: 'bold' }}>check</span>
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Todos</span>
              </label>

              {availableTypes.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#c0a062] checked:border-[#c0a062] transition-all cursor-pointer" />
                    <span className="material-icons absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" style={{ fontSize: 14, width: 14, height: 14, fontWeight: 'bold' }}>check</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {(isCategoryDropdownOpen || isTypeDropdownOpen) && (
        <div className="fixed inset-0 z-20 cursor-default" onClick={() => { setIsCategoryDropdownOpen(false); setIsTypeDropdownOpen(false); }}></div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Faixa de Preço</label>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold group-focus-within:text-[#c0a062] transition-colors">R$</span>
            <input type="text" value={formatPrice(minPrice)} onChange={(e) => updatePrice(e.target.value, 'min')} placeholder="Mín"
              className="w-full pl-8 pr-2 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none text-sm font-medium transition-all shadow-sm" />
          </div>
          <span className="text-gray-300 font-light">—</span>
          <div className="relative flex-1 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold group-focus-within:text-[#c0a062] transition-colors">R$</span>
            <input type="text" value={formatPrice(maxPrice)} onChange={(e) => updatePrice(e.target.value, 'max')} placeholder="Máx"
              className="w-full pl-8 pr-2 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none text-sm font-medium transition-all shadow-sm" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Área Útil (m²)</label>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 group">
            <input type="number" value={minArea || ''} onChange={() => {}} placeholder="Mín"
              className="w-full px-3 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none text-sm font-medium transition-all shadow-sm" />
          </div>
          <span className="text-gray-300 font-light">—</span>
          <div className="relative flex-1 group">
            <input type="number" value={maxArea || ''} onChange={() => {}} placeholder="Máx"
              className="w-full px-3 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none text-sm font-medium transition-all shadow-sm" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Quartos</label>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button key={num} onClick={() => toggleBedroom(num)}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border ${selectedBedrooms.includes(num) ? 'bg-[#c0a062] text-white border-[#c0a062]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#c0a062] hover:text-[#c0a062]'}`}>
              {num}{num === 5 ? '+' : ''}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Banheiros</label>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button key={num} onClick={() => toggleBathroom(num)}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border ${selectedBathrooms.includes(num) ? 'bg-[#c0a062] text-white border-[#c0a062]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#c0a062] hover:text-[#c0a062]'}`}>
              {num}{num === 5 ? '+' : ''}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vagas de Garagem</label>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button key={num} onClick={() => toggleGarage(num)}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border ${selectedGarages.includes(num) ? 'bg-[#c0a062] text-white border-[#c0a062]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#c0a062] hover:text-[#c0a062]'}`}>
              {num}{num === 5 ? '+' : ''}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function Listings() {
  const [searchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const { selectedProperties, toggleProperty, clearSelection, count: comparisonCount } = useComparison();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | 'Residencial' | 'Comercial'>('Todos');
  const [selectedOperation, setSelectedOperation] = useState<'Todas' | 'Venda' | 'Aluguel'>('Todas');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(10000);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number[]>([]);
  const [selectedGarages, setSelectedGarages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    getProperties().then(data => {
      setAllProperties(data);
      setIsLoading(false);
    });
  }, []);

  const op = searchParams.get('operation');
  const cat = searchParams.get('category');
  const type = searchParams.get('type');
  if (op) setSelectedOperation(op as 'Venda' | 'Aluguel');
  if (cat) setSelectedCategory(cat as 'Todos' | 'Residencial' | 'Comercial');
  if (type) setSelectedTypes([type]);

  const availableTypes = useMemo(() => {
    if (selectedCategory === 'Residencial') return ['Casa', 'Apartamento', 'Cobertura', 'Terreno'];
    if (selectedCategory === 'Comercial') return ['Salão Comercial', 'Galpão', 'Escritório'];
    return ['Casa', 'Apartamento', 'Cobertura', 'Terreno', 'Salão Comercial', 'Galpão', 'Escritório'];
  }, [selectedCategory]);

  const selectedTypesLabel = useMemo(() => {
    if (selectedTypes.length === 0) return 'Todos';
    if (selectedTypes.length === 1) return selectedTypes[0];
    return `${selectedTypes.length} selecionados`;
  }, [selectedTypes]);

  const filteredProperties = useMemo(() => {
    return allProperties.filter(p => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = p.location.toLowerCase().includes(searchLower) ||
        p.title.toLowerCase().includes(searchLower) ||
        (p.code && p.code.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesOperation = selectedOperation === 'Todas' || p.operation.includes(selectedOperation);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);

      const checkSale = p.salePrice !== undefined && p.salePrice >= minPrice && p.salePrice <= maxPrice;
      const checkRent = p.rentPrice !== undefined && p.rentPrice >= minPrice && p.rentPrice <= maxPrice;
      let matchesPrice = false;
      if (selectedOperation === 'Venda') matchesPrice = checkSale;
      else if (selectedOperation === 'Aluguel') matchesPrice = checkRent;
      else matchesPrice = checkSale || checkRent;

      const matchesArea = p.area >= minArea && p.area <= maxArea;

      let matchesBedrooms = true;
      if (selectedBedrooms.length > 0) {
        matchesBedrooms = selectedBedrooms.some(qty => qty === 5 ? p.bedrooms >= 5 : p.bedrooms === qty);
      }

      let matchesBathrooms = true;
      if (selectedBathrooms.length > 0) {
        matchesBathrooms = selectedBathrooms.some(qty => qty === 5 ? p.bathrooms >= 5 : p.bathrooms === qty);
      }

      let matchesGarages = true;
      if (selectedGarages.length > 0) {
        matchesGarages = selectedGarages.some(qty => qty === 5 ? (p.garage ?? 0) >= 5 : (p.garage ?? 0) === qty);
      }

      return matchesSearch && matchesCategory && matchesOperation && matchesType && matchesPrice && matchesArea && matchesBedrooms && matchesBathrooms && matchesGarages;
    });
  }, [allProperties, searchQuery, selectedCategory, selectedOperation, selectedTypes, minPrice, maxPrice, minArea, maxArea, selectedBedrooms, selectedBathrooms, selectedGarages]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setCategory = useCallback((category: 'Todos' | 'Residencial' | 'Comercial') => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedCategory(category);
    if (category !== 'Todos') {
      const validTypes = category === 'Residencial'
        ? ['Casa', 'Apartamento', 'Cobertura', 'Terreno']
        : ['Salão Comercial', 'Galpão', 'Escritório'];
      setSelectedTypes(prev => prev.filter(t => validTypes.includes(t)));
    }
    setCurrentPage(1);
    setIsCategoryDropdownOpen(false);
  }, []);

  const setOperation = useCallback((op: 'Todas' | 'Venda' | 'Aluguel') => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedOperation(op);
    setCurrentPage(1);
  }, []);

  const toggleType = useCallback((type: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    setCurrentPage(1);
  }, []);

  const selectAllTypes = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedTypes([]);
    setCurrentPage(1);
  }, []);

  const toggleBedroom = useCallback((num: number) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedBedrooms(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
    setCurrentPage(1);
  }, []);

  const toggleBathroom = useCallback((num: number) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedBathrooms(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
    setCurrentPage(1);
  }, []);

  const toggleGarage = useCallback((num: number) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSelectedGarages(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
    setCurrentPage(1);
  }, []);

  const formatPrice = useCallback((value: number): string => {
    if (value === 0 && minPrice === 0) return '';
    if (!value) return '';
    return value.toLocaleString('pt-BR');
  }, [minPrice]);

  const updatePrice = useCallback((value: string, type: 'min' | 'max') => {
    if (!value) {
      if (type === 'min') setMinPrice(0);
      else setMaxPrice(0);
      return;
    }
    const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    if (type === 'min') setMinPrice(numericValue);
    else setMaxPrice(numericValue);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setCurrentPage(1);
  }, []);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedOperation('Todas');
    setSelectedTypes([]);
    setMaxPrice(50000000);
    setMinPrice(0);
    setMinArea(0);
    setMaxArea(10000);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setSelectedGarages([]);
    setCurrentPage(1);
  };

  const openMobileFilters = () => {
    setIsMobileFiltersOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileFilters = () => {
    setIsMobileFiltersOpen(false);
    document.body.style.overflow = '';
  };

  const openComparison = () => setIsComparisonOpen(true);
  const closeComparison = () => {
    setIsComparisonOpen(false);
    if (comparisonCount === 0) setIsComparisonOpen(false);
  };

  const removeFromComparison = (property: Property) => {
    toggleProperty(property);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Nossos Imóveis</h1>
            <p className="text-gray-500">Explore nossa coleção completa de propriedades exclusivas.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden mb-6">
            <button onClick={openMobileFilters} className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <span className="material-icons">tune</span>
              Filtrar Imóveis
            </button>
          </div>

          <ScrollReveal direction="left" duration={800} className="hidden lg:block w-full lg:w-1/4">
            <div className="bg-white p-6 xl:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50 flex-shrink-0">
                <h3 className="font-serif font-bold text-2xl text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#c0a062]/10 flex items-center justify-center text-[#c0a062]">
                    <span className="material-icons" style={{ fontSize: 14, width: 14, height: 14 }}>tune</span>
                  </span>
                  Filtros
                </h3>
                <button onClick={resetFilters} className="group flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#c0a062] transition-colors bg-gray-50 hover:bg-[#c0a062]/10 px-3 py-1.5 rounded-full">
                  <span className="material-icons text-[14px] w-[14px] h-[14px] transition-transform group-hover:-rotate-180" style={{ fontSize: 14, width: 14, height: 14 }}>refresh</span>
                  Limpar
                </button>
              </div>

              <div className="space-y-8 overflow-y-auto flex-1 custom-scrollbar pr-2 -mr-2">
                <FilterContent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  selectedOperation={selectedOperation}
                  selectedTypes={selectedTypes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  minArea={minArea}
                  maxArea={maxArea}
                  selectedBedrooms={selectedBedrooms}
                  selectedBathrooms={selectedBathrooms}
                  selectedGarages={selectedGarages}
                  setOperation={setOperation}
                  setCategory={setCategory}
                  toggleType={toggleType}
                  selectAllTypes={selectAllTypes}
                  toggleBedroom={toggleBedroom}
                  toggleBathroom={toggleBathroom}
                  toggleGarage={toggleGarage}
                  updatePrice={updatePrice}
                  formatPrice={formatPrice}
                  availableTypes={availableTypes}
                  selectedTypesLabel={selectedTypesLabel}
                  isCategoryDropdownOpen={isCategoryDropdownOpen}
                  isTypeDropdownOpen={isTypeDropdownOpen}
                  setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
                  setIsTypeDropdownOpen={setIsTypeDropdownOpen}
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {isLoading ? (
                [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : paginatedProperties.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                  <span className="material-icons text-gray-300 text-6xl mb-4">search_off</span>
                  <h3 className="text-lg font-medium text-gray-900">Nenhum imóvel encontrado</h3>
                  <p className="text-gray-500">Tente ajustar seus filtros de busca.</p>
                </div>
              ) : (
                paginatedProperties.map((property, i) => (
                  <ScrollReveal key={property.id} delay={i * 100} duration={600}>
                    <PropertyCard property={property} />
                  </ScrollReveal>
                ))
              )}
            </div>

            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <span className="material-icons">chevron_left</span>
                </button>

                {pagesArray.map(page => (
                  <button key={page} onClick={() => changePage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border font-medium transition-colors hover:border-[#1a1a1a] ${currentPage === page ? 'bg-[#1a1a1a] text-white border-transparent' : 'bg-white text-gray-600 border-gray-200'}`}>
                    {page}
                  </button>
                ))}

                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {comparisonCount >= 2 && (
        <div className="fixed bottom-8 right-8 z-40 animate-fade-in-up">
          <button onClick={openComparison} className="bg-[#1a1a1a] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#c0a062] transition-all flex items-center gap-3 transform hover:scale-105">
            <div className="relative">
              <span className="material-icons">compare_arrows</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">
                {comparisonCount}
              </span>
            </div>
            <span className="font-bold">Comparar Imóveis</span>
          </button>
        </div>
      )}

      <ComparisonTable
        selectedProperties={selectedProperties}
        isOpen={isComparisonOpen}
        onClose={closeComparison}
        onRemove={removeFromComparison}
        onClear={() => { clearSelection(); closeComparison(); }}
      />

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closeMobileFilters}></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl animate-slide-in overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h3 className="font-serif font-bold text-2xl text-gray-900">Filtros</h3>
                <button onClick={closeMobileFilters} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="space-y-8">
                <FilterContent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  selectedOperation={selectedOperation}
                  selectedTypes={selectedTypes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  minArea={minArea}
                  maxArea={maxArea}
                  selectedBedrooms={selectedBedrooms}
                  selectedBathrooms={selectedBathrooms}
                  selectedGarages={selectedGarages}
                  setOperation={setOperation}
                  setCategory={setCategory}
                  toggleType={toggleType}
                  selectAllTypes={selectAllTypes}
                  toggleBedroom={toggleBedroom}
                  toggleBathroom={toggleBathroom}
                  toggleGarage={toggleGarage}
                  updatePrice={updatePrice}
                  formatPrice={formatPrice}
                  availableTypes={availableTypes}
                  selectedTypesLabel={selectedTypesLabel}
                  isCategoryDropdownOpen={isCategoryDropdownOpen}
                  isTypeDropdownOpen={isTypeDropdownOpen}
                  setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
                  setIsTypeDropdownOpen={setIsTypeDropdownOpen}
                />
                <button onClick={closeMobileFilters} className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl hover:bg-[#c0a062] transition-colors shadow-lg mt-8">
                  Ver {filteredProperties.length} Imóveis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
