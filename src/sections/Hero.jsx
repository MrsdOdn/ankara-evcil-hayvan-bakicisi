import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

const Hero = () => {
  const [footprints, setFootprints] = useState([]);
  const heroRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const distanceThreshold = 65;

  // --- DİNAMİK İÇERİK STATE ---
  const [heroVeri, setHeroVeri] = useState({
    anaBaslik: "Ankara'nın Patilerine",
    turuncuBaslik: "Uzman Dokunuş.",
    altMetin: "\"Siz işinizdeyken, dostunuz güvende ve mutlu.\" Seğmenler'den Ahlatlıbel'e her adımda yanınızdayız.",
    whatsapp: "https://wa.me/905435498706"
  });

  // --- FIREBASE'DEN VERİ ÇEKME ---
  useEffect(() => {
    const dbRef = ref(db);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHeroVeri({
          anaBaslik: data.heroAnaBaslik || "Ankara'nın Patilerine",
          turuncuBaslik: data.heroTuruncuBaslik || "Uzman Dokunuş.",
          altMetin: data.heroAltMetin || "\"Siz işinizdeyken, dostunuz güvende ve mutlu.\"",
          whatsapp: data.whatsapp || "https://wa.me/905435498706"
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // --- PATİ İZİ ANİMASYONU ---
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > distanceThreshold) {
      setFootprints((prev) => [...prev.slice(-7), {
        id: Date.now(),
        x,
        y,
        rotate: Math.atan2(dy, dx) * (180 / Math.PI) + 90,
      }]);
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
      {/* Arka Plan Görseli */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2071"
          alt="Ankara Huzurlu Park"
          className="w-full h-full object-cover opacity-20 md:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/95 via-transparent to-transparent"></div>
      </div>

      {/* Pati İzleri Katmanı */}
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
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="16" r="4" className="fill-orange-600/20" />
              <circle cx="7" cy="10" r="2.5" className="fill-orange-500/20" />
              <circle cx="12" cy="7" r="2.5" className="fill-orange-500/20" />
              <circle cx="17" cy="10" r="2.5" className="fill-orange-500/20" />
            </svg>
          </div>
        ))}
      </div>

      {/* İçerik Alanı */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-[1px] w-8 bg-orange-300"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-orange-700/80 uppercase">
            Ankara'nın Patilerine Özel
          </span>
          <div className="h-[1px] w-8 bg-orange-300"></div>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
          {heroVeri.anaBaslik} <br className="hidden md:block" />
          <span className="text-orange-600">{heroVeri.turuncuBaslik}</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto leading-relaxed opacity-90 whitespace-pre-line">
          {heroVeri.altMetin}
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative w-full sm:w-auto px-12 py-5 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/20 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center">
              Hizmetlerimizi Gör <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-orange-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <a
            href={heroVeri.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-12 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center group shadow-sm"
          >
            <MessageCircle className="mr-2 text-green-500 group-hover:scale-110 transition-transform" />
            WhatsApp'tan Yaz
          </a>
        </div>
      </div>

      <style>{`
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