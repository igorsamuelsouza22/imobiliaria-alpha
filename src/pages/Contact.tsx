import { ScrollReveal } from '../components/ScrollReveal';

export function Contact() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/contact_hero/1920/800" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-hero)' }}>
              Entre em Contato
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-white/70 text-lg max-w-xl mx-auto font-light">
              Estamos prontos para atender você com a excelência que merece.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ScrollReveal delay={0}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c0a062]/10 transition-colors">
                  <span className="material-icons text-gray-500 group-hover:text-[#c0a062] transition-colors" style={{ fontSize: 24, width: 24, height: 24 }}>location_on</span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Endereço</h3>
                <p className="text-gray-900 font-medium">Av. Paulista, 1000</p>
                <p className="text-gray-500 text-sm mt-1">São Paulo, SP - 01310-100</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c0a062]/10 transition-colors">
                  <span className="material-icons text-gray-500 group-hover:text-[#c0a062] transition-colors" style={{ fontSize: 24, width: 24, height: 24 }}>phone</span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Telefone</h3>
                <p className="text-gray-900 font-medium">(11) 99999-9999</p>
                <p className="text-gray-500 text-sm mt-1">Seg a Sex: 9h às 18h</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c0a062]/10 transition-colors">
                  <span className="material-icons text-gray-500 group-hover:text-[#c0a062] transition-colors" style={{ fontSize: 24, width: 24, height: 24 }}>email</span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">E-mail</h3>
                <p className="text-gray-900 font-medium">contato@alpha.com.br</p>
                <p className="text-gray-500 text-sm mt-1">Respondemos em até 24h</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Redes Sociais</h2>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Acompanhe nossas oportunidades exclusivas, novidades do mercado e conteúdos sobre o universo imobiliário.
                </p>

                <div className="space-y-4">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#c0a062]/30 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#c0a062]/10 transition-colors">
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-[#c0a062] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">Instagram</p>
                      <p className="text-gray-400 text-xs">@alphaimobiliaria</p>
                    </div>
                  </a>

                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#c0a062]/30 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#c0a062]/10 transition-colors">
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-[#c0a062] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">YouTube</p>
                      <p className="text-gray-400 text-xs">Alpha Imóveis</p>
                    </div>
                  </a>

                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#c0a062]/30 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#c0a062]/10 transition-colors">
                      <span className="material-icons text-gray-500 group-hover:text-[#c0a062] transition-colors" style={{ fontSize: 20, width: 20, height: 20 }}>chat</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">WhatsApp</p>
                      <p className="text-gray-400 text-xs">(11) 99999-9999</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
