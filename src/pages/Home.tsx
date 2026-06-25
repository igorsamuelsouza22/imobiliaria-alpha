import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { getFeaturedProperties } from '../services/propertyService';
import type { Property } from '../types/property';

export function Home() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const [ctaParallax, setCtaParallax] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    getFeaturedProperties().then(setFeaturedProperties);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (ctaSectionRef.current) {
        const rect = ctaSectionRef.current.getBoundingClientRect();
        const offset = rect.top + window.scrollY;
        const diff = window.scrollY - offset;
        setCtaParallax(diff * 0.3);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chunkSize = 4;
  const carouselChunks = Array.from({ length: Math.ceil(featuredProperties.length / chunkSize) }, (_, i) =>
    featuredProperties.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  const [selectedOperation, setSelectedOperation] = useState<'Venda' | 'Aluguel'>('Aluguel');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [isOperationDropdownOpen, setIsOperationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const selectOperation = (op: 'Venda' | 'Aluguel') => {
    setSelectedOperation(op);
    setIsOperationDropdownOpen(false);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedType('');
    updateTypes(category);
    setIsCategoryDropdownOpen(false);
  };

  const selectType = (type: string) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
  };

  const updateTypes = (category: string) => {
    if (category === 'Residencial') {
      setAvailableTypes(['Casa', 'Apartamento', 'Cobertura', 'Terreno']);
    } else if (category === 'Comercial') {
      setAvailableTypes(['Salão Comercial', 'Galpão', 'Escritório']);
    } else {
      setAvailableTypes([]);
    }
  };

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsSearching(true);
    setTimeout(() => {
      navigate('/imoveis', {
        state: {
          operation: selectedOperation,
          category: selectedCategory,
          type: selectedType,
        }
      });
    }, 600);
  };

  const closeDropdowns = () => {
    setIsCategoryDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsOperationDropdownOpen(false);
  };

  return (
    <>
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="https://picsum.photos/seed/skyscrapers/1920/1080" alt="City Buildings" className="w-full min-h-[120%] object-cover" style={{ transform: `translateY(${scrollY * 0.4}px)` }} />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[89px] font-bold text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'var(--font-hero)' }}>
              Encontre o lar que <br className="hidden md:block" />reflete sua <span className="text-[#c0a062] italic">essência</span>.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl max-w-5xl mx-auto flex flex-col gap-3 md:gap-4 relative z-20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-48 relative">
                  <button onClick={() => { setIsOperationDropdownOpen(!isOperationDropdownOpen); setIsCategoryDropdownOpen(false); setIsTypeDropdownOpen(false); }}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 border-transparent hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none transition-all text-gray-800 text-left flex items-center gap-2 group">
                    <span className="material-icons text-gray-400 group-hover:text-[#c0a062] transition-colors">key</span>
                    <span className="truncate">{selectedOperation === 'Venda' ? 'Comprar' : 'Alugar'}</span>
                    <span className={`material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOperationDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  
                  {isOperationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-scale-in origin-top">
                      <button onClick={() => selectOperation('Venda')}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedOperation === 'Venda' ? 'text-[#c0a062] font-bold' : ''}`}>
                        Comprar
                      </button>
                      <button onClick={() => selectOperation('Aluguel')}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedOperation === 'Aluguel' ? 'text-[#c0a062] font-bold' : ''}`}>
                        Alugar
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <button onClick={() => { setIsCategoryDropdownOpen(!isCategoryDropdownOpen); setIsOperationDropdownOpen(false); setIsTypeDropdownOpen(false); }}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 border-transparent hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none transition-all text-gray-800 text-left flex items-center gap-2 group">
                    <span className="material-icons text-gray-400 group-hover:text-[#c0a062] transition-colors">category</span>
                    <span className="truncate">{selectedCategory || 'Finalidade'}</span>
                    <span className={`material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-scale-in origin-top">
                      <button onClick={() => selectCategory('Residencial')}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedCategory === 'Residencial' ? 'text-[#c0a062] font-bold' : ''}`}>
                        Residencial
                      </button>
                      <button onClick={() => selectCategory('Comercial')}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedCategory === 'Comercial' ? 'text-[#c0a062] font-bold' : ''}`}>
                        Comercial
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <button onClick={() => { if (selectedCategory) { setIsTypeDropdownOpen(!isTypeDropdownOpen); setIsCategoryDropdownOpen(false); setIsOperationDropdownOpen(false); } }}
                    className={`w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 border-transparent hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none transition-all text-gray-800 text-left flex items-center gap-2 group ${!selectedCategory ? 'opacity-50' : ''}`}
                    disabled={!selectedCategory}>
                    <span className="material-icons text-gray-400 group-hover:text-[#c0a062] transition-colors">home</span>
                    <span className="truncate">{selectedType || 'Tipo de Imóvel'}</span>
                    <span className={`material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  
                  {isTypeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-scale-in origin-top max-h-60 overflow-y-auto custom-scrollbar">
                      {availableTypes.map((type) => (
                        <button key={type} onClick={() => selectType(type)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedType === type ? 'text-[#c0a062] font-bold' : ''}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input type="text" placeholder="Localização, bairro ou cidade..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#c0a062] focus:outline-none transition-all text-gray-800 placeholder-gray-400" />
                </div>

                <button onClick={search} disabled={isSearching} className={`relative overflow-hidden bg-[#1a1a1a] text-white px-10 py-3 rounded-xl font-medium hover:bg-[#c0a062] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isSearching ? 'scale-95 opacity-80' : ''}`}>
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <span className="material-icons">search</span>
                      Buscar
                    </>
                  )}
                  {ripplePos && (
                    <span
                      className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                      style={{ left: ripplePos.x - 10, top: ripplePos.y - 10, width: 20, height: 20 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {(isCategoryDropdownOpen || isTypeDropdownOpen || isOperationDropdownOpen) && (
            <div className="fixed inset-0 z-10 cursor-default" onClick={closeDropdowns}></div>
          )}
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Imóveis em Destaque</h2>
                <p className="text-gray-500 max-w-xl">Imóveis selecionados rigorosamente por nossa equipe de especialistas para oferecer o melhor em conforto e design.</p>
              </div>
              <Link to="/imoveis" className="hidden md:flex items-center gap-2 text-[#c0a062] font-medium hover:text-[#1d4ed8] transition-colors group">
                Ver todos os imóveis
                <span className="material-icons transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {carouselChunks.map((chunk, chunkIndex) => (
                  <div key={chunkIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-1">
                    {chunk.map((property, i) => (
                      <ScrollReveal key={property.id} delay={i * 100}>
                        <PropertyCard property={property} showCompare={false} />
                      </ScrollReveal>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {carouselChunks.length > 1 && (
              <>
                <button onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                  disabled={carouselIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#c0a062] hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-lg">
                  <span className="material-icons">chevron_left</span>
                </button>

                <button onClick={() => setCarouselIndex(prev => Math.min(carouselChunks.length - 1, prev + 1))}
                  disabled={carouselIndex >= carouselChunks.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#c0a062] hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-lg">
                  <span className="material-icons">chevron_right</span>
                </button>

                <div className="flex justify-center gap-2 mt-10">
                  {carouselChunks.map((_, i) => (
                    <button key={i} onClick={() => setCarouselIndex(i)}
                      className={`transition-all duration-300 rounded-full ${carouselIndex === i ? 'w-8 h-2 bg-[#c0a062]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/imoveis" className="inline-flex items-center gap-2 text-[#c0a062] font-medium hover:text-[#1d4ed8] transition-colors">
              Ver todos os imóveis
              <span className="material-icons">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right" duration={1000} className="relative order-2 lg:order-1">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c0a062]/20 rounded-full blur-2xl"></div>
              <img src="/images/about/real_estate_meeting_1773593931550.png" alt="Consultoria Imobiliária" className="rounded-2xl shadow-2xl relative z-10 w-full h-[500px] md:h-[600px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border-l-4 border-[#c0a062]">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons text-[#c0a062] text-4xl w-10 h-10">workspace_premium</span>
                  <div>
                    <p className="font-serif font-bold text-xl text-gray-900">Alpha</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Consultoria</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium leading-relaxed italic">"Transformando sonhos e investimentos em conquistas seguras e duradouras."</p>
              </div>
            </ScrollReveal>
            
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <span className="inline-block border border-[#c0a062] text-[#c0a062] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase bg-[#c0a062]/10 rounded-full">Nosso Diferencial</span>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-8 leading-tight">Por que Escolher a Alpha?</h2>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                  Na Alpha Negócios Imobiliários, não entregamos apenas chaves — entregamos realizações. O nosso compromisso vai além da negociação: acompanhamos nossos clientes construindo relações de longo prazo baseadas em confiança e resultados reais.
                </p>
              </ScrollReveal>

              <div className="space-y-8">
                <ScrollReveal delay={350}>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0 text-[#c0a062]">
                      <span className="material-icons">person</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Atendimento Personalizado</h3>
                      <p className="text-gray-600 leading-relaxed">Cada cliente recebe uma estratégia construída com base em seus objetivos, perfil e capacidade de investimento.</p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={450}>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0 text-[#c0a062]">
                      <span className="material-icons">location_city</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Conhecimento Profundo</h3>
                      <p className="text-gray-600 leading-relaxed">Anos de atuação em Boituva e região nos conferem uma leitura de mercado precisa para encontrar as melhores oportunidades.</p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={550}>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0 text-[#c0a062]">
                      <span className="material-icons">shield</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Segurança na Negociação</h3>
                      <p className="text-gray-600 leading-relaxed">Acompanhamos cada etapa, da análise do imóvel à assinatura do contrato, garantindo uma transação juridicamente sólida.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              
              <ScrollReveal delay={650}>
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <a href="/sobre" className="inline-flex items-center gap-2 text-[#c0a062] font-bold hover:text-[#2d2218] transition-colors group text-lg">
                    Conheça mais sobre a nossa história
                    <span className="material-icons transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal duration={1000}>
        <section ref={ctaSectionRef} className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <img src="https://picsum.photos/seed/city/1920/600" alt="Cityline" className="w-full min-h-[140%] object-cover grayscale" style={{ transform: `translateY(${ctaParallax * 0.3}px)` }} />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Pronto para encontrar seu novo lar?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Agende uma visita com um de nossos consultores especializados e descubra as melhores oportunidades do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#c0a062] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1d4ed8] transition-colors text-lg">
                Falar com Consultor
              </button>
              <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors text-lg">
                Ver Todos os Imóveis
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
