import { ScrollReveal } from './ScrollReveal';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export function Footer() {
  const settings = useSiteSettings();
  const addressLine1 = [settings.street, settings.number].filter(Boolean).join(', ');
  const addressLine2 = [settings.city, settings.state].filter(Boolean).join(', ');

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <ScrollReveal delay={0}>
              <span className="font-serif text-2xl font-bold tracking-tight text-white mb-6 block">
                ALPHA<span className="text-[#c0a062]">.</span>
              </span>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Especialistas em imóveis de alto padrão. Conectamos pessoas extraordinárias a lugares extraordinários.
              </p>
              <div className="flex space-x-4">
                <a href={settings.instagramUrl || '#'} className="text-gray-400 hover:text-[#c0a062] transition-colors"><span className="sr-only">Instagram</span><span className="material-icons">photo_camera</span></a>
                <a href={settings.facebookUrl || '#'} className="text-gray-400 hover:text-[#c0a062] transition-colors"><span className="sr-only">Facebook</span><span className="material-icons">facebook</span></a>
                <a href={settings.linkedinUrl || '#'} className="text-gray-400 hover:text-[#c0a062] transition-colors"><span className="sr-only">LinkedIn</span><span className="material-icons">work</span></a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <h4 className="text-lg font-semibold mb-6 text-white">Navegação</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#c0a062] transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-[#c0a062] transition-colors">Imóveis à Venda</a></li>
              <li><a href="#" className="hover:text-[#c0a062] transition-colors">Imóveis para Alugar</a></li>
              <li><a href="#" className="hover:text-[#c0a062] transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[#c0a062] transition-colors">Blog</a></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <h4 className="text-lg font-semibold mb-6 text-white">Contato</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-icons text-[#c0a062]">location_on</span>
                <span>{addressLine1}{addressLine1 && addressLine2 && <br />}{addressLine2}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-[#c0a062]">phone</span>
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-[#c0a062]">email</span>
                <span>{settings.email}</span>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <h4 className="text-lg font-semibold mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Receba as novidades mais exclusivas.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Seu e-mail" className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#c0a062] transition-colors" />
              <button className="bg-[#c0a062] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#1d4ed8] transition-colors">
                Inscrever-se
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2026 Imobiliária Alpha. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
