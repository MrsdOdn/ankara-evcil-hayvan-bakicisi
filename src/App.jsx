import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Footer from './components/Footer';
import MapSection from './sections/MapSection';
import Portfolio from './sections/Portfolio';
import ServicesSection from './sections/ServicesSection';
import WhyUs from './sections/WhyUs';

function App() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Tabelamızı en üste taktık! */}
      <Navbar /> 
      <main>
        <Hero />
        <ServicesSection />
        <WhyUs />
        <Portfolio />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;