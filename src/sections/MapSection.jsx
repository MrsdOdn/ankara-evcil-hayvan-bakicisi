import React, { useState } from 'react';

const regions = [
  { 
    name: "Çankaya", 
    info: "5+ Uzman Bakıcı", 
    desc: "Yıldız, Dikmen, Bahçelievler ve Ümitköy bölgelerinde aktif hizmet.",
    icon: "🐾" 
  },
  { 
    name: "Altındağ", 
    info: "3+ Uzman Bakıcı", 
    desc: "Aydınlıkevler ve Karapürçek çevresinde güvenli gezdirme.",
    icon: "🏠" 
  },
  { 
    name: "Yenimahalle", 
    info: "4+ Uzman Bakıcı", 
    desc: "Batıkent ve Demetevler bölgesinde profesyonel bakım.",
    icon: "🌳" 
  },
];

const MapSection = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <section id="bolgeler" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hizmet <span className="text-orange-600">Bölgelerimiz</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ankara'nın her köşesine sevgi taşıyoruz. Şu an aktif olduğumuz ilçeler:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Sol: Bölge Seçimi ve Kartlar */}
          <div className="space-y-4">
            {regions.map((reg) => (
              <div 
                key={reg.name}
                onClick={() => setActiveRegion(reg)}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeRegion.name === reg.name 
                  ? 'border-orange-500 bg-orange-50 shadow-lg translate-x-2' 
                  : 'border-gray-100 bg-white hover:border-orange-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{reg.icon}</span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{reg.name}</h4>
                      <p className="text-orange-600 font-medium text-sm">{reg.info}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${activeRegion.name === reg.name ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}></div>
                </div>
              </div>
            ))}
            
            <div className="p-6 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50">
              <p className="text-gray-400 text-center italic">Etimesgut ve Keçiören çok yakında!</p>
            </div>
          </div>

          {/* Sağ: Görsel Temsil ve Detay Ekranı */}
          <div className="relative">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl min-h-[400px] flex flex-col justify-center">
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                ANKARA
              </div>
              
              <div className="space-y-6">
                <div className="text-6xl mb-4 animate-bounce">📍</div>
                <h3 className="text-3xl font-bold">{activeRegion.name} Bölgesi</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {activeRegion.desc}
                </p>
                <div className="pt-6 border-t border-gray-700">
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-colors w-full md:w-auto">
                    Bu Bölgede Randevu Al
                  </button>
                </div>
              </div>

              {/* Dekoratif Ankara Arka Planı (Sadece görsel amaçlı) */}
              <div className="absolute bottom-4 right-4 opacity-10 text-8xl grayscale">
                🐕
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;