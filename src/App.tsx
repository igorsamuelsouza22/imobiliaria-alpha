import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ComparisonProvider } from './contexts/ComparisonContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetails } from './pages/PropertyDetails';
import { About } from './pages/About';
import { Construcao } from './pages/Construcao';
import { Contact } from './pages/Contact';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fadeInPage">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<Listings />} />
        <Route path="/imoveis/:id" element={<PropertyDetails />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/construcao" element={<Construcao />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SiteSettingsProvider>
        <ComparisonProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollToTop />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </ComparisonProvider>
      </SiteSettingsProvider>
    </Router>
  );
}

export default App;
