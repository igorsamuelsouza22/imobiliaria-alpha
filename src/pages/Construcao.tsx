import { ScrollReveal } from '../components/ScrollReveal';

export function Construcao() {
  return (
    <>
      <section className="min-h-[90vh] flex flex-col md:flex-row bg-white">
        <ScrollReveal className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2218] mb-6 leading-tight">
            Alpha Construções <span className="text-[#c0a062] opacity-60 text-4xl">&amp;</span> Performer Projetos e Gerenciamento
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-medium mb-10 max-w-xl">
            A solução completa para construir a casa dos seus sonhos — do projeto à entrega das chaves, com excelência em cada etapa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#f2f0ec] text-gray-800 text-sm font-bold tracking-wider px-6 py-3 uppercase hover:bg-[#e6e2db] transition-colors">
              Alto Padrão Residencial
            </button>
            <button className="bg-white border text-gray-400 border-gray-200 text-sm font-medium px-6 py-3 uppercase cursor-default">
              Do Projeto à Entrega
            </button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200} direction="left" className="w-full md:w-1/2 h-[400px] md:h-auto order-1 md:order-2">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Modern House" className="w-full h-full object-cover" />
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[90vh] border-t border-gray-100">
        <ScrollReveal className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-10 leading-tight">
              Construir uma casa é um grande sonho
            </h2>
            <ScrollReveal delay={150}>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Para a grande maioria das pessoas, construir a própria casa é uma das decisões mais importantes da vida — um projeto que envolve anos de planejamento, economia e expectativa. É a realização de um ideal: um espaço projetado para a sua história, para a sua família, para o seu jeito de viver.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-gray-800 leading-relaxed text-lg font-medium">
                Mas transformar esse sonho em realidade exige muito mais do que vontade. Exige <strong className="font-bold">conhecimento técnico, equipe especializada, planejamento rigoroso e execução impecável.</strong> É por isso que a parceria certa faz toda a diferença.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto order-2">
          <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Family Dream" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="bg-[#faf9f8] flex flex-col lg:flex-row min-h-[100vh]">
        <div className="w-full lg:w-5/12 h-[500px] lg:h-auto order-2 lg:order-1">
          <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Construction planning" className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-7/12 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1 lg:order-2">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-12 leading-tight">
              O problema de construir sem equipe especializada
            </h2>
            
            <div className="space-y-6">
              <ScrollReveal>
                <div className="border border-gray-200 p-8 rounded-sm bg-white hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Orçamentos que explodem</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Sem planejamento técnico detalhado, os custos tendem a crescer de forma descontrolada ao longo da obra, gerando prejuízos imprevistos.</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={100}>
                <div className="border border-gray-200 p-8 rounded-sm bg-white hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Prazos que se arrastam</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">A falta de gerenciamento profissional compromete os cronogramas, causando atrasos que impactam diretamente a vida do cliente.</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="border border-gray-200 p-8 rounded-sm bg-white hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Projetos desalinhados</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Quando arquitetura e execução não conversam, surgem retrabalhos, incompatibilidades e desperdício de recursos.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="border border-gray-200 p-8 rounded-sm bg-white hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Desgaste e insegurança</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">O cliente se vê perdido entre fornecedores, profissionais e decisões técnicas para as quais não está preparado.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal direction="up" duration={1000}>
        <section className="py-24 bg-[#faf9f8] border-t border-gray-100 min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 w-full">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight max-w-3xl">
              A solução: projeto + obra em uma única equipe
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-12 max-w-4xl">
              A Alpha Construções e a Performer Projetos e Gerenciamento atuam de forma integrada, oferecendo ao cliente uma experiência única e sem fragmentações. Uma equipe coesa, um processo fluido, um único ponto de responsabilidade.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 rounded-lg overflow-hidden border border-[#e5dcd1]">
              <div className="bg-[#dcd4cb] p-10 lg:p-14">
                <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">Performer Projetos</h3>
                <p className="text-gray-700 leading-relaxed">
                  Arquitetura premium, interiores sofisticados e gerenciamento técnico completo da obra — do conceito ao planejamento.
                </p>
              </div>
              <div className="bg-white p-10 lg:p-14">
                <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">Alpha Construções</h3>
                <p className="text-gray-700 leading-relaxed">
                  Execução profissional da obra com controle de qualidade rigoroso, acompanhamento técnico e gestão eficiente do canteiro.
                </p>
              </div>
            </div>

            <div className="bg-[#e2e1dc] px-8 py-6 rounded border border-[#d5d4ce] flex items-center md:items-start gap-4">
              <span className="material-icons text-gray-500 mt-1 flex-shrink-0">check_box_outline_blank</span>
              <p className="text-gray-800 font-medium">
                Juntas, as duas empresas eliminam as lacunas entre projeto e execução, entregando uma casa de alto padrão com tranquilidade e segurança para o cliente.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="bg-white flex flex-col md:flex-row min-h-[100vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-2 md:order-1">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Construction workers" className="w-full h-full object-cover" />
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1 md:order-2">
          <div className="max-w-xl">
            <span className="inline-block border border-gray-200 text-gray-400 text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Quem Somos</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Alpha Construções
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-12">
              Especializada na execução de obras residenciais de médio e alto padrão, a Alpha Construções é referência em qualidade construtiva e organização de canteiro. Nossa atuação é pautada por rigor técnico, transparência e comprometimento com o resultado final.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>engineering</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Execução Profissional</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Obras conduzidas por profissionais experientes, com metodologia estruturada e foco em qualidade.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>verified</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Controle de Qualidade</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Processos de verificação em todas as etapas da construção, garantindo padrão elevado do início ao fim.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>construction</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Acompanhamento Técnico</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Presença constante da equipe técnica no canteiro, assegurando precisão e conformidade com o projeto.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>nature_people</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Obras Bem Gerenciadas</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Canteiros organizados, cronogramas respeitados e comunicação clara com o cliente em cada fase.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col md:flex-row min-h-[100vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-2 md:order-1">
          <div className="max-w-xl">
            <span className="inline-block border border-gray-200 text-gray-400 text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase">Quem Somos</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Performer Projetos e Gerenciamento
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-12">
              A Performer é uma empresa especializada em projetos arquitetônicos de alto padrão e gerenciamento técnico de obras residenciais. Com uma equipe multidisciplinar de arquitetos e engenheiros, entregamos projetos que unem estética, funcionalidade e viabilidade construtiva.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>architecture</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Projetos Arquitetônicos</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Design sofisticado e funcional, desenvolvido com atenção aos detalhes e às necessidades únicas de cada cliente.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>chair</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Interiores Premium</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Ambientes planejados com elegância, onde cada detalhe é pensado para criar espaços que expressam o estilo de vida do cliente.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>manage_accounts</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Gerenciamento Completo</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Coordenação técnica integral da obra, garantindo alinhamento entre projeto, prazos e orçamento.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="material-icons text-[#867364] mr-6 mt-1 flex-shrink-0" style={{ width: 40, height: 40, fontSize: 40 }}>layers</span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">Compatibilização de Projetos</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Integração entre projetos estruturais, elétricos, hidráulicos e complementares para evitar conflitos na execução.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full md:w-1/2 h-[500px] md:h-auto order-1 md:order-2">
          <img src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Architects meeting" className="w-full h-full object-cover" />
        </ScrollReveal>
      </section>

      <ScrollReveal direction="up" duration={1000}>
        <section className="py-24 bg-[#faf9f8] border-t border-gray-100 min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 w-full">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Como funciona o processo completo
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-16">
              Da escolha do terreno à entrega das chaves, cada etapa é conduzida com metodologia, precisão e cuidado. Nosso processo foi desenvolvido para oferecer ao cliente máxima tranquilidade e total transparência durante toda a jornada de construção.
            </p>

            <div className="space-y-12">
              {[
                { icon: 'map', title: 'Escolha do Terreno', desc: 'Análise estratégica e técnica da melhor localização.' },
                { icon: 'architecture', title: 'Projeto Arquitetônico', desc: 'Desenvolvimento do projeto de acordo com o perfil do cliente.' },
                { icon: 'handyman', title: 'Projetos Complementares', desc: 'Estrutura, elétrica, hidráulica e demais especialidades integradas.' },
                { icon: 'calendar_month', title: 'Planejamento da Obra', desc: 'Cronograma, orçamento e compatibilização antes do início.' },
                { icon: 'engineering', title: 'Execução e Entrega', desc: 'Construção com acompanhamento técnico e entrega das chaves.' },
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-20 h-20 rounded-full bg-[#e8e6e1] flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200">
                    <span className="material-icons text-gray-600" style={{ width: 30, height: 30, fontSize: 30 }}>{step.icon}</span>
                  </div>
                  <div className="ml-8">
                    <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="bg-white flex flex-col lg:flex-row min-h-[90vh] border-t border-gray-100">
        <ScrollReveal direction="left" duration={1000} className="w-full lg:w-1/2 h-[500px] lg:h-auto order-2 lg:order-1">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Choosing land" className="w-full h-full object-cover" />
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1 lg:order-2">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#e8e6e1] text-gray-600 text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase rounded-sm">Etapa 1</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Escolha Estratégica do Terreno
            </h2>
            
            <div className="flex flex-col xl:flex-row gap-10">
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-6">
                  A jornada começa antes mesmo do projeto. A escolha do terreno é uma decisão técnica e estratégica que impacta diretamente a viabilidade da construção, o custo da obra e a qualidade de vida no imóvel pronto.
                </p>
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  Nossa equipe analisa cada lote com critérios técnicos rigorosos, avaliando topografia, orientação solar, infraestrutura disponível, restrições legais e potencial construtivo — para que o cliente tome a melhor decisão desde o primeiro passo.
                </p>
              </div>
              <div className="bg-[#e8e6e1] p-8 rounded-md w-full xl:w-72 flex-shrink-0">
                <h3 className="text-lg font-serif font-medium text-gray-800 mb-6">O que avaliamos</h3>
                <ul className="space-y-4">
                  {['Topografia e tipo de solo', 'Orientação solar e ventos', 'Infraestrutura e acessos', 'Restrições legais e zoneamento', 'Potencial construtivo do lote', 'Valorização e localização'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700"><span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3"></span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col lg:flex-row min-h-[100vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full lg:w-1/2 h-[500px] lg:h-auto order-2 lg:order-1">
          <img src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Architect showing plans" className="w-full h-full object-cover" />
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1 lg:order-2 border-l border-gray-100">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#e8e6e1] text-gray-600 text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase rounded-sm">Etapa 2</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Desenvolvimento do Projeto
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-10">
              Com o terreno definido, a Performer Projetos conduz o desenvolvimento completo do projeto arquitetônico, sempre em diálogo próximo com o cliente. Cada detalhe é pensado para traduzir o estilo de vida, as necessidades e os desejos de quem vai habitar a casa.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Arquitetura', desc: 'Conceito, partido arquitetônico, planta baixa, fachadas e volumetria integrados ao terreno e ao perfil do cliente.' },
                { title: 'Interiores', desc: 'Projeto de interiores premium com definição de materiais, acabamentos, móveis planejados e iluminação de atmosfera.' },
                { title: 'Complementares', desc: 'Projetos estrutural, elétrico, hidráulico, climatização e demais especialidades, todos compatibilizados entre si.' },
                { title: 'Aprovações', desc: 'Toda a documentação técnica e legal necessária para aprovação nos órgãos competentes e início da obra.' },
              ].map((card, i) => (
                <div key={i} className="bg-[#e8e6e1] p-6 lg:p-8 rounded-sm">
                  <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm lg:text-base leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col lg:flex-row min-h-[100vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full lg:w-3/5 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-1 lg:order-1 border-t lg:border-t-0 border-gray-100">
          <div className="max-w-2xl lg:ml-auto">
            <span className="inline-block bg-[#e8e6e1] text-gray-600 text-xs font-bold tracking-widest px-3 py-1 mb-6 uppercase rounded-sm">Etapa 3</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Construção da Obra
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-12">
              Com o projeto aprovado e o planejamento concluído, a Alpha Construções assume a execução com total responsabilidade técnica. Cada fase da construção é acompanhada de perto, garantindo fidelidade ao projeto, qualidade construtiva e respeito ao cronograma.
            </p>

            <div className="space-y-10">
              {[
                { title: 'Início e Infraestrutura', desc: 'Fundações, estrutura e instalações executadas com rigor técnico e materiais de primeira linha.' },
                { title: 'Vedações e Instalações', desc: 'Alvenaria, revestimentos, sistemas elétricos e hidráulicos integrados conforme os projetos complementares.' },
                { title: 'Acabamentos Premium', desc: 'Aplicação dos materiais de acabamento com atenção milimétrica aos detalhes, respeitando o projeto de interiores.' },
                { title: 'Entrega e Vistoria', desc: 'Inspeção completa do imóvel antes da entrega, garantindo que cada detalhe esteja em perfeita conformidade.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <span className="material-icons text-gray-800 mr-6 mt-1 flex-shrink-0" style={{ width: 30, height: 30, fontSize: 30 }}>arrow_forward</span>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full lg:w-2/5 h-[500px] lg:h-auto order-2 lg:order-2 border-l border-gray-100">
          <img src="/images/about/house_under_construction_1773958410292.png" alt="House under construction" className="w-full h-full object-cover" />
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col lg:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" duration={1000} className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="grid grid-cols-4 gap-4 h-[400px] lg:h-[600px] w-full max-w-2xl">
            <div className="h-full pt-16"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="House 1" className="w-full h-full object-cover shadow-lg" /></div>
            <div className="h-full pb-16"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="House 2" className="w-full h-full object-cover shadow-lg" /></div>
            <div className="h-full pt-8"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="House 3" className="w-full h-full object-cover shadow-lg" /></div>
            <div className="h-full pb-8"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="House 4" className="w-full h-full object-cover shadow-lg" /></div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white border-l border-gray-100">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-8 leading-tight">
              Experiência que gera confiança
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-16">
              Mais de 40 projetos residenciais desenvolvidos e entregues na região. Cada obra é uma história de confiança renovada, de sonhos realizados e de clientes que indicam nosso trabalho aos seus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center sm:text-left">
                <p className="text-5xl md:text-6xl font-serif text-[#2d2218] mb-4">40+</p>
                <h3 className="text-lg font-serif font-medium text-gray-800 mb-4">Projetos Realizados</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Residências de médio e alto padrão entregues com excelência técnica e estética na região.</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-5xl md:text-6xl font-serif text-[#2d2218] mb-4">100%</p>
                <h3 className="text-lg font-serif font-medium text-gray-800 mb-4">Dedicação Total</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Cada projeto recebe atenção integral da nossa equipe, do briefing à entrega das chaves.</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-5xl md:text-6xl font-serif text-[#2d2218] mb-4">2</p>
                <h3 className="text-lg font-serif font-medium text-gray-800 mb-4">Empresas, 1 Solução</h3>
                <p className="text-gray-600 text-sm leading-relaxed">A integração entre Performer e Alpha elimina lacunas e garante resultado superior ao cliente.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white flex flex-col lg:flex-row min-h-[90vh] border-t border-gray-100">
        <ScrollReveal direction="left" duration={1000} className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white order-2 lg:order-1 border-r border-gray-100">
          <div className="max-w-xl lg:ml-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-[#2d2218] mb-10 leading-tight">
              Construção sem dor de cabeça.
            </h2>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-12">
              Quando projeto e execução trabalham juntos desde o primeiro dia, o cliente ganha algo inestimável: <strong className="font-bold">tranquilidade</strong>. Sem correr atrás de múltiplos fornecedores, sem retrabalhos, sem surpresas no orçamento.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 rounded-sm overflow-hidden bg-[#efedea] border border-[#e5e4df]">
              <div className="p-8 border-b md:border-b-0 md:border-r border-[#e5e4df]">
                <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Uma equipe</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">Um único time responsável por todo o processo, do projeto à construção.</p>
              </div>
              <div className="p-8 border-b border-[#e5e4df]">
                <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Um processo</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">Metodologia clara, comunicação contínua e etapas bem definida do início ao fim.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-[#e8e6e1] border-t border-[#e5e4df]">
                <h3 className="text-xl font-serif font-medium text-gray-800 mb-3">Um resultado</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">A casa que você sempre imaginou, entregue com qualidade, prazo e muito mais segurança.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" duration={1000} className="w-full lg:w-1/2 h-[500px] lg:h-auto order-1 lg:order-2">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Elegant living room" className="w-full h-full object-cover" />
        </ScrollReveal>
      </section>

      <ScrollReveal direction="up" duration={1000}>
        <section className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            <span className="inline-block bg-[#e8e6e1] text-gray-600 text-xs font-bold tracking-widest px-3 py-1 mb-8 uppercase rounded-sm">Próximo Passo</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2d2218] mb-10 leading-tight">
              Vamos começar a construir seu projeto?
            </h2>
            
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-6">
              Se você está pensando em construir sua residência e quer contar com uma equipe completa, especializada e comprometida com o seu sonho, entre em contato com a Alpha Construções e a Performer Projetos e Gerenciamento.
            </p>
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-12">
              Agende uma conversa sem compromisso. Vamos ouvir sua ideia, analisar sua necessidade e apresentar como podemos transformar o seu projeto em realidade — com segurança, qualidade e todo o cuidado que a sua família merece.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="border border-gray-300 p-8 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">Alpha Construções</h3>
                <p className="text-gray-600">Execução de obras residenciais de alto padrão</p>
              </div>
              <div className="border border-gray-300 p-8 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">Performer Projetos</h3>
                <p className="text-gray-600">Arquitetura, interiores e gerenciamento de obras</p>
              </div>
            </div>

            <div className="bg-[#dbdacf] px-8 py-6 rounded-sm border border-[#c4c3b7] flex items-start gap-4 shadow-inner">
              <span className="material-icons text-gray-700 mt-1 flex-shrink-0">chat_bubble_outline</span>
              <p className="text-gray-900 leading-relaxed">
                <strong className="font-bold">Entre em contato e dê o primeiro passo para construir a casa dos seus sonhos.</strong> Nossa equipe está pronta para atendê-lo com toda a atenção e expertise que o seu projeto merece.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
