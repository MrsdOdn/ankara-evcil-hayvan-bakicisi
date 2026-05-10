import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Dog } from 'lucide-react';
import logo from '../assets/Nlogo.png';
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Başlangıç değeri (Firebase yüklenene kadar boş görünmemesi için)
  const [telefon, setTelefon] = useState("+90 543 549 87 06");
  
  const closeMenu = () => setIsOpen(false);

  // --- FIREBASE'DEN TELEFONU ÇEKME ---
  useEffect(() => {
    const dbRef = ref(db, 'telefon'); // JSON'daki "telefon" anahtarına odaklanıyoruz
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setTelefon(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">

          {/* 🐾 Logo Bölümü */}
          <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <div className="p-0.5 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                <img
                  src={logo}
                  alt="Ankara Pati Bakım Logo"
                  className="w-16 h-16 object-contain rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                <Dog size={12} className="text-orange-500" />
              </div>
            </div>

            <div className="ml-5 flex flex-col justify-center">
              <h1 className="text-2xl font-extrabold text-slate-800 leading-none tracking-tight flex items-center">
                ANKARA
                <span className="text-orange-600 ml-1.5">PATİ</span>
              </h1>
              <div className="flex items-center mt-1.5">
                <span className="text-[10px] font-black text-slate-400 tracking-[0.35em] uppercase leading-none">
                  BAKIMI
                </span>
              </div>
            </div>
          </div>

          {/* 💻 Masaüstü Menü */}
          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-gray-600">
            <a href="#hizmetler" className="hover:text-orange-600 transition-colors py-2">Hizmetler</a>
            <a href="#bolgeler" className="hover:text-orange-600 transition-colors py-2">Bölgeler</a>
            <a href="#neden-biz" className="hover:text-orange-600 transition-colors py-2">Neden Biz?</a>
            <a href="#iletisim" className="hover:text-orange-600 transition-colors py-2">İletişim</a>

            {/* DİNAMİK TELEFON BUTONU */}
            <a
              href={`tel:${telefon.replace(/\s/g, '')}`}
              className="flex items-center bg-orange-500 text-white px-7 py-3.5 rounded-2xl hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-200 active:scale-95 font-black tracking-normal"
            >
              <Phone size={18} className="mr-2" />
              HEMEN ARA
            </a>
          </div>

          {/* 📱 Mobil Menü Butonu */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 bg-orange-50 p-2 rounded-xl active:scale-90 transition-transform"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobil Menü Paneli */}
      {isOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-12 space-y-2 border-t border-orange-50 animate-in fade-in zoom-in duration-300 shadow-2xl">
          {[
            { name: "Hizmetler", link: "#hizmetler" },
            { name: "Bölgeler", link: "#bolgeler" },
            { name: "Neden Biz?", link: "#neden-biz" },
            { name: "İletişim", link: "#iletisim" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={closeMenu}
              className="flex items-center text-gray-700 font-bold py-4 px-6 rounded-2xl hover:bg-orange-50 transition-all text-lg active:bg-orange-500 active:text-white"
            >
              {item.name}
            </a>
          ))}

          <div className="pt-6">
            <a
              href={`tel:${telefon.replace(/\s/g, '')}`}
              className="flex items-center justify-center w-full bg-orange-500 text-white py-5 rounded-3xl font-black shadow-lg shadow-orange-200 text-xl active:scale-95 transition-transform"
            >
              <Phone size={24} className="mr-3" />
              HEMEN ARA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;