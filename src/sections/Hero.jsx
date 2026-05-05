import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [footprints, setFootprints] = useState([]);
  const heroRef = useRef(null);
  
  // Farenin katettiği mesafeyi ölçmek için ref
  const lastPos = useRef({ x: 0, y: 0 });
  const distanceThreshold = 65; // İzlerin sıklığı

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    
    // Kapsayıcıya göre koordinat hesaplama
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Fare hareket ettikçe mesafeyi hesapla
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Eğer fare yeterince mesafe katettiyse yeni pati izi bırak
    if (distance > distanceThreshold) {
      const newFootprint = {
        id: Date.now(),
        x: x,
        y: y,
        rotate: Math.atan2(dy, dx) * (180 / Math.PI) + 90,
      };
      
      setFootprints((prev) => [...prev.slice(-7), newFootprint]);
      lastPos.current = { x, y };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFootprints((prev) => prev.slice(1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#fdfaf5] pt-32 md:pt-16 cursor-default"
    >
      {/* 🌳 Arka Plan */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2071" 
          alt="Ankara Huzurlu Park" 
          className="w-full h-full object-cover opacity-20 md:opacity-25" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/95 via-transparent to-transparent"></div>
      </div>

      {/* 🐾 Akışkan Pati İzleri */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {footprints.map((print) => (
          <div
            key={print.id}
            className="absolute animate-fade-in-out"
            style={{
              left: print.x,
              top: print.y,
              transform: `translate(-50%, -50%) rotate(${print.rotate}deg)`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="16" r="4" className="fill-orange-600/20" />
              <circle cx="7" cy="10" r="2.5" className="fill-orange-500/20" />
              <circle cx="12" cy="7" r="2.5" className="fill-orange-500/20" />
              <circle cx="17" cy="10" r="2.5" className="fill-orange-500/20" />
            </svg>
          </div>
        ))}
      </div>

      {/* ✍️ İçerik */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-[1px] w-8 bg-orange-300"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-orange-700/80 uppercase">
            Ankara'nın Patilerine Özel
          </span>
          <div className="h-[1px] w-8 bg-orange-300"></div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
          Ankara'nın Patilerine <br className="hidden md:block" />
          <span className="text-orange-600">Uzman Dokunuş.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
          "Siz işinizdeyken, dostunuz güvende ve mutlu." <br className="hidden sm:block" />
          Seğmenler'den Ahlatlıbel'e her adımda yanınızdayız.
        </p>

        {/* 🔘 Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="group relative w-full sm:w-auto px-12 py-5 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/20 active:scale-95">
            <span className="relative z-10 flex items-center justify-center">
              Hizmetlerimizi Gör <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-orange-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center group shadow-sm">
            <MessageCircle className="mr-2 text-green-500 group-hover:scale-110 transition-transform" />
            WhatsApp'tan Yaz
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;