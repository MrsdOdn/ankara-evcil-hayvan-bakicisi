import React, { useState } from 'react';
import { Menu, X, Phone, Dog, Award } from 'lucide-react';
import logo from '../assets/Nlogo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          
          {/* 🐾 Yenilenen Logo Bölümü: Şık Bir Madalyon Tasarımı */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative flex items-center">
              {/* Logo Çerçevesi */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-1 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="bg-white p-1 rounded-xl">
                  <img 
                    src={logo} 
                    alt="Ankara Pati Bakım Logo" 
                    className="w-14 h-14 object-contain" 
                  />
                </div>
              </div>
              
              {/* Yazı Alanı */}
              <div className="ml-4 flex flex-col justify-center border-l-2 border-orange-100 pl-4 h-12">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-gray-800 tracking-tighter leading-none">
                    ANKARA
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-bold text-orange-500 tracking-[0.4em] uppercase leading-none">
                    PATİ BAKIM
                  </span>
                  <Dog size={14} className="text-orange-500 ml-1 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* 💻 Masaüstü Menü */}
          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-gray-600">
            <a href="#hizmetler" className="group relative py-2">
              Hizmetler
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#galeri" className="group relative py-2">
              Galeri
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#neden-biz" className="group relative py-2">
              Neden Biz?
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#iletisim" className="group relative py-2">
              İletişim
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
            
            <a 
              href="tel:+905000000000" 
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
              className="text-gray-700 bg-orange-50 p-2 rounded-xl"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobil Menü */}
      {isOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-10 space-y-2 border-t border-orange-50 animate-in fade-in zoom-in duration-300">
          {["Hizmetler", "Galeri", "Neden Biz?", "İletişim"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              onClick={closeMenu} 
              className="flex items-center text-gray-700 font-bold py-5 px-6 rounded-2xl hover:bg-orange-500 hover:text-white transition-all text-lg"
            >
              {item}
            </a>
          ))}
          <div className="pt-6">
            <a 
              href="tel:+905000000000"
              className="flex items-center justify-center w-full bg-orange-500 text-white py-5 rounded-3xl font-black shadow-lg text-xl"
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