import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const settings = useSiteSettings();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <svg viewBox="0 0 280 48" className="h-10 w-auto text-[#bfa163]" xmlns="http://www.w3.org/2000/svg">
              <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round">
                <circle cx="20" cy="5" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M 2 24 L 8 24 L 8 46 L 15 46 L 15 32 L 25 32 L 25 46 L 32 46 L 32 24 L 38 24 L 20 6 Z"/>
                <path d="M 10.7 36 L 20 10 L 29.3 36"/>
                <path d="M 15 24 L 25 24"/>
              </g>
              <line x1="52" y1="12" x2="52" y2="40" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
              <text x="68" y="30" fontFamily="ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" fontSize="26" fontWeight="500" letterSpacing="0.15em" fill="currentColor">ALPHA</text>
              <text x="70" y="44" fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" fontSize="7" fontWeight="400" letterSpacing="0.38em" fill="currentColor">NEGÓCIOS IMOBILIÁRIOS</text>
            </svg>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${isActive('/') ? 'text-[#c0a062]' : 'text-gray-600 hover:text-[#c0a062]'}`}>
              Início
            </Link>
            <Link to="/sobre" className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${isActive('/sobre') ? 'text-[#c0a062]' : 'text-gray-600 hover:text-[#c0a062]'}`}>
              Sobre Nós
            </Link>
            <Link to="/construcao" className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${isActive('/construcao') ? 'text-[#c0a062]' : 'text-gray-600 hover:text-[#c0a062]'}`}>
              Construção
            </Link>
            <Link to="/imoveis" className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${isActive('/imoveis') ? 'text-[#c0a062]' : 'text-gray-600 hover:text-[#c0a062]'}`}>
              Imóveis
            </Link>
            <Link to="/contato" className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${isActive('/contato') ? 'text-[#c0a062]' : 'text-gray-600 hover:text-[#c0a062]'}`}>
              Contato
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            <div className="flex items-center space-x-4">
              <a href={settings.instagramUrl || 'https://www.instagram.com/'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={settings.youtubeUrl || 'https://www.youtube.com/'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <span className="material-icons">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider text-gray-700 hover:text-[#c0a062] hover:bg-gray-50">Início</Link>
            <Link to="/sobre" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider text-gray-700 hover:text-[#c0a062] hover:bg-gray-50">Sobre Nós</Link>
            <Link to="/construcao" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider text-gray-700 hover:text-[#c0a062] hover:bg-gray-50">Construção</Link>
            <Link to="/imoveis" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider text-gray-700 hover:text-[#c0a062] hover:bg-gray-50">Imóveis</Link>
            <Link to="/contato" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider text-gray-700 hover:text-[#c0a062] hover:bg-gray-50">Contato</Link>
            
            <div className="border-t border-gray-100 my-2 pt-2 flex items-center space-x-6 px-3">
              <a href={settings.instagramUrl || 'https://www.instagram.com/'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={settings.youtubeUrl || 'https://www.youtube.com/'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
