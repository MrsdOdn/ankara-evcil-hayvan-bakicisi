import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/Nlogo.png';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

// --- YARDIMCI BİLEŞEN: SocialLink ---
const SocialLink = ({ href, icon, color, label }) => {
  const icons = {
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    youtube: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
    facebook: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  };

  return (
    <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 w-full sm:w-auto">
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md group-hover:scale-110 shrink-0"
        style={{ backgroundColor: color }}
      >
        <svg role="img" viewBox="0 0 24 24" fill="white" className="w-6 h-6">{icons[icon]}</svg>
      </div>
      <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-base">{label}</span>
    </a>
  );
};

const Footer = () => {
  const [footprints, setFootprints] = useState([]);
  const footerRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const distanceThreshold = 60;

  // Başlangıçta boş kalmaması için varsayılan değerler
  const [iletisimBilgileri, setIletisimBilgileri] = useState({
    telefon: "+90 543 549 87 06",
    email: "info@ankarapatibakim.com",
    instagram: "https://www.instagram.com/ankaracimbicici",
    whatsapp: "https://wa.me/905435498706",
    youtube: "https://www.youtube.com/@FatihErdogan-fk4te",
    facebook: "https://www.facebook.com/share/1AAH98mPp2/"
  });

  useEffect(() => {
    // Veritabanının kök dizinine (root) bağlanıyoruz çünkü veriler orada
    const dbRef = ref(db);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIletisimBilgileri({
          telefon: String(data.telefon || iletisimBilgileri.telefon),
          email: data.email || iletisimBilgileri.email,
          instagram: data.instagram || iletisimBilgileri.instagram,
          whatsapp: data.whatsapp || iletisimBilgileri.whatsapp,
          // JSON'da yoksa statik kalsın veya JSON'a ekle:
          youtube: data.youtube || "https://www.youtube.com/@FatihErdogan-fk4te",
          facebook: data.facebook || "https://www.facebook.com/share/1AAH98mPp2/"
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > distanceThreshold) {
      setFootprints((prev) => [...prev.slice(-7), {
        id: Date.now(), x, y, rotate: Math.atan2(dy, dx) * (180 / Math.PI) + 90,
      }]);
      lastPos.current = { x, y };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setFootprints((prev) => prev.slice(1)), 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-gray-950 text-white pt-16 pb-8 border-t border-orange-900/30 overflow-hidden cursor-default"
    >
      {/* Pati İzi Animasyonu */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {footprints.map((print) => (
          <div
            key={print.id}
            className="absolute z-0 animate-fade-in-out"
            style={{ left: print.x, top: print.y, transform: `translate(-50%, -50%) rotate(${print.rotate}deg)` }}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="16" r="4" className="fill-orange-500/30" />
              <circle cx="7" cy="10" r="2.5" className="fill-orange-500/25" />
              <circle cx="12" cy="7" r="2.5" className="fill-orange-500/25" />
              <circle cx="17" cy="10" r="2.5" className="fill-orange-500/25" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" id="iletisim">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Sosyal Medya */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6 border-b border-orange-500/20 pb-2">📱 SOSYAL MEDYA</h4>
            <div className="grid grid-cols-1 gap-4">
              <SocialLink href={iletisimBilgileri.instagram} icon="instagram" color="#E4405F" label="Instagram" />
              <SocialLink href={iletisimBilgileri.youtube} icon="youtube" color="#FF0000" label="YouTube" />
              <SocialLink href={iletisimBilgileri.facebook} icon="facebook" color="#1877F2" label="Facebook" />
              <SocialLink href={iletisimBilgileri.whatsapp} icon="whatsapp" color="#25D366" label="WhatsApp" />
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6 border-b border-orange-500/20 pb-2">📞 İLETİŞİM</h4>
            <div className="space-y-4">
              <a href={`tel:${iletisimBilgileri.telefon.replace(/\s/g, '')}`} className="group flex items-center gap-2">
                <div className="p-2 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  <Phone size={18} className="text-orange-500" />
                </div>
                <span className="text-xl font-bold hover:text-orange-400">{iletisimBilgileri.telefon}</span>
              </a>
              <a href={`mailto:${iletisimBilgileri.email}`} className="group flex items-center gap-2">
                <div className="p-2 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  <Mail size={18} className="text-orange-500" />
                </div>
                <span className="text-base text-gray-300 hover:text-orange-400 break-all">{iletisimBilgileri.email}</span>
              </a>
            </div>
          </div>

          {/* Hizmet Bölgesi */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6 border-b border-orange-500/20 pb-2">📍 HİZMET BÖLGEMİZ</h4>
            <div className="flex items-start gap-2">
              <MapPin size={20} className="text-orange-500 mt-1 shrink-0" />
              <p className="text-gray-400 leading-relaxed text-lg text-center sm:text-left">
                Çankaya, Altındağ & Yenimahalle<br />
                <span className="text-white font-medium">Ankara, Türkiye</span>
              </p>
            </div>
          </div>

          {/* Logo ve Motto */}
          <div className="flex flex-col items-center lg:items-end justify-center">
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-2 bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-orange-500/50 group-hover:scale-105 shadow-2xl">
                <img
                  src={logo}
                  alt="Ankara Pati Logo"
                  className="h-32 w-32 sm:h-40 sm:w-40 object-contain rounded-full shadow-inner"
                />
                <div className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2c-.7 0-1.5.5-2 1.2-.5-.7-1.3-1.2-2-1.2-1.7 0-3 1.3-3 3 0 1.5.8 2.3 1.6 3l1.4 1.2c.6.5 1.3.8 2 .8s1.4-.3 2-.8l1.4-1.2c.8-.7 1.6-1.5 1.6-3 0-1.7-1.3-3-3-3zm-8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center lg:text-right space-y-1">
              <p className="text-orange-500 font-black tracking-[0.3em] text-[11px] uppercase italic">
                Ankara'nın En İyi Bakım Servisi
              </p>
              <p className="text-gray-400 text-xs font-medium leading-relaxed opacity-80 max-w-[200px]">
                Dostlarınız için profesyonel ve güvenilir hizmet.
              </p>
            </div>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="mt-16 pt-8 border-t border-gray-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs md:text-sm">
          <p>&copy; {new Date().getFullYear()} <span className="text-orange-600 font-medium">Ankara Pati Bakım</span>. Tüm hakları saklıdır.</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-fade-in-out { animation: fadeInOut 2s ease-out forwards; }
      `}</style>
    </footer>
  );
};

export default Footer;