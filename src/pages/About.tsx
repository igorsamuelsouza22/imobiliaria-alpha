import { ScrollReveal } from '../components/ScrollReveal';

export function About() {
  return (
    <>
      <section className="min-h-[90vh] flex flex-col md:flex-row bg-white">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-2/5 h-64 md:h-auto order-1 md:order-1">
          <img src="/images/about/modern_office_exterior_1773593561491.png" className="w-full h-full object-cover" alt="Office" />
        </ScrollReveal>
        <div className="w-full md:w-3/5 flex flex-col justify-center p-8 md:p-24 bg-white order-2 md:order-2">
          <ScrollReveal>
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-8 tracking-wide">Alpha Negócios Imobiliários</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2d2218] mb-8 leading-tight">
              Onde Confiança e<br/>Expertise se<br/>Encontram
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <p className="text-gray-500 text-lg md:text-xl max-w-lg font-light">
              Consultoria imobiliária de alto padrão no coração de Boituva &ndash; São Paulo
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          <ScrollReveal className="lg:col-span-5 relative z-10 lg:pr-12">
            <span className="inline-block bg-[#f4ece3] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-8 uppercase">Quem Somos</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight text-[#2d2218]">Bem-vindos à Alpha Negócios Imobiliários</h2>
            <ScrollReveal delay={150}>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Localizada no coração de Boituva, a Alpha nasce da união de três especialistas apaixonados pelo mercado imobiliário: <strong className="text-gray-900 font-semibold">Jaini Romero</strong>, <strong className="text-gray-900 font-semibold">Dalila da Silva</strong> e <strong className="text-gray-900 font-semibold">Rafael Pereira</strong>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-gray-600 leading-relaxed text-lg">
                Com mais de uma década de experiência individual no setor, unimos trajetórias, conhecimentos e valores para oferecer uma consultoria imobiliária completa, estratégica e verdadeiramente personalizada.
              </p>
            </ScrollReveal>
          </ScrollReveal>
          
          <ScrollReveal direction="right" duration={1000} className="lg:col-span-7 relative h-full flex flex-col lg:flex-row items-center mt-12 lg:mt-0">
            <div className="w-full lg:absolute lg:left-0 lg:w-[320px] xl:w-[400px] bg-[#3a2719] text-white p-10 lg:p-12 shadow-2xl z-20 lg:-ml-12 mb-8 lg:mb-0">
              <h3 className="text-2xl font-serif font-bold mb-8">Nossa Essência</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="mr-4 mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                  <span className="text-gray-200 leading-snug">Décadas de experiência combinada no setor imobiliário</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                  <span className="text-gray-200 leading-snug">Profundo conhecimento do mercado regional</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                  <span className="text-gray-200 leading-snug">Consultoria personalizada para cada perfil de cliente</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                  <span className="text-gray-200 leading-snug">Equipe multidisciplinar com visão estratégica</span>
                </li>
              </ul>
            </div>
            <div className="w-full h-[400px] lg:h-[700px] lg:pl-32 xl:pl-48">
              <img src="/images/about/modern_real_estate_reception_1773593576796.png" className="w-full h-full object-cover" alt="Reception" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="mb-16">
              <span className="inline-block border border-[#867364] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Nossa Essência</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-12">Os Pilares que nos Definem</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={100}>
              <div className="bg-[#fcfcfa] border border-gray-100 p-10 lg:p-12 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-full bg-[#3a2719] text-white flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  <span className="material-icons">handshake</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Transparência</h3>
                <p className="text-gray-600 leading-relaxed">Cada etapa da negociação conduzida com clareza, honestidade e comunicação aberta &ndash; sem surpresas, sem letras miúdas.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-[#fcfcfa] border border-gray-100 p-10 lg:p-12 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-full bg-[#3a2719] text-white flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  <span className="material-icons">verified_user</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Credibilidade</h3>
                <p className="text-gray-600 leading-relaxed">Construída negociação a negociação, com resultados concretos e clientes satisfeitos que confiam na Alpha para seus maiores investimentos.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-[#fcfcfa] border border-gray-100 p-10 lg:p-12 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-full bg-[#3a2719] text-white flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  <span className="material-icons">track_changes</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Compromisso</h3>
                <p className="text-gray-600 leading-relaxed">Cada cliente recebe atenção exclusiva, com estratégias desenhadas para atender seus objetivos de vida e de investimento.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="bg-[#fcfcfa] border border-gray-100 p-10 lg:p-12 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-full bg-[#3a2719] text-white flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  <span className="material-icons">insights</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Visão Estratégica</h3>
                <p className="text-gray-600 leading-relaxed">Inteligência de mercado aplicada para identificar as melhores oportunidades de valorização imobiliária na região.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative order-2 md:order-1">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 xl:mr-20">
            <span className="inline-block bg-[#efe6dd] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-10 uppercase">Missão</span>
            <div className="border-l-4 border-[#3a2719] pl-8 mb-10">
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Conectar pessoas às melhores oportunidades imobiliárias com segurança, transparência e inteligência de mercado.
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg lg:text-xl pl-8">
              Na Alpha, cada negociação é tratada como única. Entendemos que um imóvel representa muito mais do que metros quadrados &ndash; é a materialização de um sonho, a consolidação de um patrimônio, a base de um legado familiar.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-1 md:order-2">
          <img src="/images/about/city_overview_sunset_1773593592347.png" className="w-full h-full object-cover" alt="City" />
        </ScrollReveal>
      </section>

      <section className="bg-[#faf9f8] flex flex-col md:flex-row min-h-[80vh]">
        <ScrollReveal direction="up" duration={1000} className="w-full md:w-5/12 bg-[#2d1d12] flex flex-col justify-center p-8 md:p-16 lg:p-24 text-white min-h-[50vh]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">Referência Regional em Consultoria Imobiliária</h2>
          <p className="text-white/80 leading-relaxed text-lg lg:text-xl font-light">
            Ser a empresa mais confiável e reconhecida em consultoria imobiliária na região de Boituva e no interior de São Paulo &ndash; construindo legado através de confiança, qualidade e resultados reais.
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200} duration={1000} className="w-full md:w-7/12 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
          <div className="w-full mb-10 overflow-hidden rounded-sm shadow-xl">
            <img src="/images/about/large_modern_building_complex_1773593608621.png" className="w-full h-[350px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700" alt="Building" />
          </div>
          <p className="text-gray-600 leading-relaxed text-lg lg:text-xl px-2">
            O mercado imobiliário do interior paulista está em franca expansão. Boituva e região concentram oportunidades únicas de valorização, e a Alpha está posicionada para ser a ponte entre investidores e os melhores ativos disponíveis.
          </p>
        </ScrollReveal>
      </section>

      <section className="py-24 bg-[#faf9f8]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="mb-12">
              <span className="inline-block border border-[#867364] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Nossos Valores</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-12">O que Guia Cada Decisão da Alpha</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={100}>
              <div className="bg-white border-l-4 border-l-[#4c3525] shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Ética e Transparência</h3>
                <p className="text-gray-600 leading-relaxed">Agimos sempre com integridade, garantindo que cada informação seja clara e que cada negócio reflita os reais interesses do cliente.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-white border-l-4 border-l-[#4c3525] shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Compromisso com Resultados</h3>
                <p className="text-gray-600 leading-relaxed">Nossa satisfação está diretamente ligada ao sucesso do cliente. Trabalhamos com dedicação total até a conclusão de cada negociação.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-white border-l-4 border-l-[#4c3525] shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Atendimento Personalizado</h3>
                <p className="text-gray-600 leading-relaxed">Cada cliente tem uma jornada única. Desenvolvemos estratégias sob medida para perfis distintos, sejam compradores, investidores ou construtores.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="bg-white border-l-4 border-l-[#4c3525] shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Valorização do Investimento</h3>
                <p className="text-gray-600 leading-relaxed">Orientamos nossos clientes a tomar decisões informadas, maximizando o potencial de valorização de cada imóvel adquirido.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 order-2 md:order-1">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 xl:mr-16">
            <span className="inline-block bg-[#efe6dd] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">O que Fazemos</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-12">Soluções Imobiliárias Completas</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-16 h-20 bg-[#faf9f8] flex items-center justify-center pt-2 flex-shrink-0 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/50 triangle-pattern"></div>
                  <span className="material-icons text-[#2d2218] relative z-10 font-light text-3xl">home_work</span>
                </div>
                <div className="ml-6 mt-1">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Compra e Venda</h3>
                  <p className="text-gray-600 leading-relaxed">Intermediação especializada de imóveis residenciais, comerciais e terrenos com suporte jurídico completo.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-16 h-20 bg-[#faf9f8] flex items-center justify-center pt-2 flex-shrink-0 relative overflow-hidden">
                  <span className="material-icons text-[#2d2218] relative z-10 font-light text-3xl">trending_up</span>
                </div>
                <div className="ml-6 mt-1">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Consultoria de Investimento</h3>
                  <p className="text-gray-600 leading-relaxed">Análise estratégica do mercado imobiliário para identificar os ativos com maior potencial de retorno e valorização.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-16 h-20 bg-[#faf9f8] flex items-center justify-center pt-2 flex-shrink-0 relative overflow-hidden">
                  <span className="material-icons text-[#2d2218] relative z-10 font-light text-3xl">landscape</span>
                </div>
                <div className="ml-6 mt-1">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Terrenos e Loteamentos</h3>
                  <p className="text-gray-600 leading-relaxed">Venda de terrenos e lotes em loteamentos selecionados, com assessoria completa em toda a negociação.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-16 h-20 bg-[#faf9f8] flex items-center justify-center pt-2 flex-shrink-0 relative overflow-hidden">
                  <span className="material-icons text-[#2d2218] relative z-10 font-light text-3xl">gavel</span>
                </div>
                <div className="ml-6 mt-1">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Assessoria Jurídica</h3>
                  <p className="text-gray-600 leading-relaxed">Acompanhamento em todas as etapas documentais e contratuais, garantindo segurança e conformidade legal.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-1 md:order-2">
          <img src="/images/about/real_estate_meeting_1773593931550.png" className="w-full h-full object-cover" alt="Meeting" />
        </ScrollReveal>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal direction="left" duration={1000} className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="mb-10">
              <span className="inline-block border border-[#867364] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Nosso Diferencial</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-12">Por que Escolher a Alpha?</h2>
            </div>

            <div className="space-y-10">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#faf9f8] flex items-center justify-center flex-shrink-0 mt-1"></div>
                <div className="ml-6">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Atendimento Verdadeiramente Personalizado</h3>
                  <p className="text-gray-600 leading-relaxed">Não trabalhamos com scripts ou soluções genéricas. Cada cliente recebe uma estratégia construída com base em seus objetivos, perfil e capacidade de investimento.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#faf9f8] flex items-center justify-center flex-shrink-0 mt-1"></div>
                <div className="ml-6">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Conhecimento Profundo do Mercado Local</h3>
                  <p className="text-gray-600 leading-relaxed">Anos de atuação em Boituva e região nos conferem uma leitura de mercado que nenhum algoritmo ou portal imobiliário pode replicar.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#faf9f8] flex items-center justify-center flex-shrink-0 mt-1"></div>
                <div className="ml-6">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Segurança em Toda a Negociação</h3>
                  <p className="text-gray-600 leading-relaxed">Da análise do imóvel à assinatura do contrato, a Alpha acompanha cada etapa para garantir uma transação segura, transparente e juridicamente sólida.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="p-2 lg:p-4 bg-white shadow-xl mx-auto max-w-lg">
              <img src="/images/about/modern_living_room_1773593950014.png" className="w-full h-auto object-cover" alt="Living Room" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
          <div className="mb-16">
            <span className="inline-block bg-[#efe6dd] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Oportunidades</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2218] mb-12">Soluções para Cada Momento da sua Jornada</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={100}>
              <div className="group">
                <div className="w-full h-48 mb-6 overflow-hidden rounded-sm">
                  <img src="/images/about/couple_new_house_1773593980744.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Couple" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Primeiro Imóvel</h3>
                <p className="text-gray-600 leading-relaxed text-sm">Realize o sonho da casa própria com total segurança. A Alpha orienta compradores de primeira viagem em cada etapa, do financiamento à escritura.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="group">
                <div className="w-full h-48 mb-6 overflow-hidden rounded-sm">
                  <img src="https://picsum.photos/seed/investment/400/300" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Investment" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Investimento Imobiliário</h3>
                <p className="text-gray-600 leading-relaxed text-sm">Diversifique seu patrimônio com ativos imobiliários estrategicamente selecionados, com alto potencial de valorização e renda passiva.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="group">
                <div className="w-full h-48 mb-6 overflow-hidden rounded-sm">
                  <img src="https://picsum.photos/seed/land/400/300" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Land" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Terrenos para Construção</h3>
                <p className="text-gray-600 leading-relaxed text-sm">Encontre o terreno ideal para construir a residência dos seus sonhos ou desenvolver um projeto imobiliário com sólido retorno.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="group">
                <div className="w-full h-48 mb-6 overflow-hidden rounded-sm">
                  <img src="/images/about/large_modern_building_complex_1773593608621.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Building" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">Valorização Garantida</h3>
                <p className="text-gray-600 leading-relaxed text-sm">Identificamos imóveis e loteamentos em regiões com forte tendência de valorização, maximizando o retorno do seu investimento a médio e longo prazo.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[85vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-2 md:order-1">
          <img src="/images/about/handshake_1773593964938.png" className="w-full h-full object-cover" alt="Handshake" />
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 order-1 md:order-2">
          <div className="max-w-xl mx-auto md:mr-auto md:ml-0 xl:ml-16">
            <span className="inline-block bg-[#efe6dd] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-10 uppercase">Nosso Compromisso</span>
            <div className="border-l-4 border-[#3a2719] pl-8 mb-10">
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
                "Cada cliente é atendido com seriedade, transparência e dedicação &mdash; transformando sonhos e investimentos em conquistas seguras e duradouras."
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              Na Alpha Negócios Imobiliários, não entregamos apenas imóveis &mdash; entregamos realizações. O nosso compromisso vai além da negociação: acompanhamos nossos clientes antes, durante e depois da compra, construindo relações de longo prazo baseadas em confiança e resultados.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative order-1 md:order-1">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 xl:mr-16">
            <span className="inline-block border border-[#867364] text-[#867364] text-xs font-bold tracking-widest px-3 py-1 mb-8 uppercase">Localização Estratégica</span>
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-[#2d2218] mb-8 leading-tight">
              Boituva e Região: Um Mercado em Expansão
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-10">
              Boituva é um dos municípios com maior crescimento imobiliário no interior de São Paulo. Com excelente infraestrutura, localização privilegiada e qualidade de vida superior, a região atrai famílias e investidores em busca de oportunidades sólidas.
            </p>
            
            <div className="space-y-6">
              <div className="bg-[#faf9f8] p-6 flex items-start">
                <span className="material-icons text-red-500 mr-4">location_on</span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">Localização</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">A 120 km de São Paulo, às margens da Rodovia Castelo Branco</p>
                </div>
              </div>
              
              <div className="bg-[#faf9f8] p-6 flex items-start">
                <span className="material-icons text-blue-500 mr-4">trending_up</span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">Valorização</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Crescimento consistente nos preços de terrenos e imóveis nos últimos anos</p>
                </div>
              </div>
              
              <div className="bg-[#faf9f8] p-6 flex items-start">
                <span className="material-icons text-orange-500 mr-4">engineering</span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">Infraestrutura</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Novos loteamentos, condomínios e projetos residenciais em desenvolvimento</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex items-center order-2 md:order-2">
          <div className="w-full h-[400px] md:h-full lg:h-[600px] bg-gray-100 shadow-2xl relative">
            <img src="/images/about/boituva_aerial_1773594238668.png" className="w-full h-full object-cover" alt="Boituva" />
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 order-2 md:order-1 relative">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 xl:mr-16">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-[#2d2218] mb-4 leading-tight">
              Alpha Negócios Imobiliários
            </h2>
            <p className="text-gray-900 font-bold mb-12">Boituva &ndash; São Paulo, Brasil</p>

            <div className="space-y-10 mb-12">
              <div className="flex items-start">
                <span className="material-icons text-gray-400 text-3xl mr-6 mt-1 font-light">phone_in_talk</span>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Telefone / WhatsApp</h3>
                  <p className="text-gray-600 leading-relaxed">Fale diretamente com nossa equipe para agendar uma consultoria ou tirar suas dúvidas sobre o mercado imobiliário.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-gray-400 text-3xl mr-6 mt-1 font-light">sentiment_satisfied_alt</span>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Redes Sociais</h3>
                  <p className="text-gray-600 leading-relaxed">Acompanhe nossas oportunidades, novidades do mercado e conteúdos exclusivos em nossas redes sociais.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-gray-400 text-3xl mr-6 mt-1 font-light">mail_outline</span>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Atendimento Presencial</h3>
                  <p className="text-gray-600 leading-relaxed">Visite-nos em Boituva - SP e conheça pessoalmente nossa equipe de especialistas prontos para atender você.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#efe6dd] p-8 flex items-start border-l-4 border-[#3a2719]">
              <span className="material-icons text-[#3a2719] mr-4 mt-1">maps_home_work</span>
              <p className="text-gray-900 text-sm leading-relaxed">
                <strong className="font-bold">Alpha Negócios Imobiliários</strong> — Onde cada negócio é tratado com excelência, compromisso e a confiança que você merece.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-1 md:order-2">
          <img src="/images/about/clinic_facade_1773594253393.png" className="w-full h-full object-cover" alt="Facade" />
        </ScrollReveal>
      </section>
    </>
  );
}
