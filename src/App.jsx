import { Routes, Route } from 'react-router-dom'; // Bunu ekle
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Footer from './components/Footer';
import MapSection from './sections/MapSection';
import Portfolio from './sections/Portfolio';
import ServicesSection from './sections/ServicesSection';
import WhyUs from './sections/WhyUs';
import Admin from './pages/Admin'; // Admin sayfasını import et

function App() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Routes>
        {/* ANA SAYFA DİZİNİ */}
        <Route path="/" element={
          <>
            <Navbar /> 
            <main>
              <Hero />
              <ServicesSection />
              <WhyUs />
              <Portfolio />
              <MapSection />
            </main>
            <Footer />
          </>
        } />

        {/* ADMIN SAYFASI DİZİNİ */}
        <Route path="/admin-giris" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;