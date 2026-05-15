import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import { MapPin, MessageSquare } from 'lucide-react';

const MapSection = () => {
  const [data, setData] = useState({ regions: [], phone: "905435498706" });
  const [activeRegion, setActiveRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Veritabanını dinle (Yeni işleyiş)
    const mapSectionRef = ref(db, 'mapSection');
    
    const unsubscribe = onValue(mapSectionRef, (snapshot) => {
      const val = snapshot.val();
      const regionsData = val?.regions || [];
      
      // Telefonu genel ayarlardan çekmeye çalış, yoksa varsayılanı kullan
      setData({
        regions: regionsData,
        phone: "905435498706" 
      });

      if (regionsData.length > 0) {
        setActiveRegion(regionsData[0]);
      } else {
        setActiveRegion(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleWhatsAppClick = (name) => {
    const msg = `Merhaba, ${name} bölgesi evcil hayvan bakım hizmetleriniz hakkında bilgi alabilir miyim?`;
    window.open(`https://wa.me/${data.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return null;

  // VERİTABANI BOŞSA GÖSTERİLECEK GÜVENLİ ALAN
  if (data.regions.length === 0 || !activeRegion) {
    return (
      <section id="bolgeler" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <MapPin size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Hizmet Bölgeleri Güncelleniyor</h3>
          <p className="text-gray-500 mt-2">Yakında tüm Ankara'da yanınızdayız.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="bolgeler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* SOL KISIM: Bölge Listesi (Eski Görünüm) */}
          <div className="space-y-4">
            {data.regions.map((reg, idx) => (
              <div
                key={reg.name + idx}
                onClick={() => setActiveRegion(reg)}
                className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between ${
                  activeRegion.name === reg.name
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-orange-200'
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl">
                    {/* Bölge adına göre otomatik ikon seçimi veya varsayılan pati */}
                    {reg.name.includes("Çankaya") ? "🐾" : reg.name.includes("Altındağ") ? "🏠" : "🌳"}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{reg.name}</h4>
                    <p className="text-orange-600 text-sm font-semibold">{reg.info}</p>
                  </div>
                </div>
                
                {/* Eski tasarımdaki yuvarlak seçim göstergesi */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  activeRegion.name === reg.name ? 'border-orange-500' : 'border-gray-300'
                }`}>
                  {activeRegion.name === reg.name && <div className="w-3 h-3 bg-orange-500 rounded-full"></div>}
                </div>
              </div>
            ))}
            
            {/* Alt Bilgi Notu */}
            <div className="p-4 text-center text-gray-400 italic text-sm">
              Diğer bölgelerimiz çok yakında hizmete açılacaktır!
            </div>
          </div>

          {/* SAĞ KISIM: Sevdiğin Orijinal Koyu Tasarım */}
          <div className="relative group text-left">
            {/* Turuncu Ankara Etiketi */}
            <div className="absolute -top-3 -right-3 z-20 bg-[#f25c05] text-white px-6 py-2 rounded-2xl font-black text-sm shadow-lg transform rotate-2">
              ANKARA
            </div>

            <div className="bg-[#111827] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-center border border-zinc-800">
              
              {/* Zıplayan İkon */}
              <div className="text-6xl mb-4 animate-bounce">📍</div>

              <div className="relative z-10">
                <h3 className="text-4xl font-black mb-4 tracking-tight">
                  {activeRegion.name} Bölgesi
                </h3>
                <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-sm">
                  {activeRegion.desc}
                </p>

                <button
                  onClick={() => handleWhatsAppClick(activeRegion.name)}
                  className="bg-[#f25c05] hover:bg-[#d44d04] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-950/20 active:scale-95 flex items-center gap-3 w-full justify-center md:w-auto"
                >
                  <MessageSquare size={22} /> WhatsApp ile Bilgi Al
                </button>
                
                <p className="text-slate-500 text-xs font-medium italic mt-4">
                  * Tıkladığınızda bölge bilginiz otomatik olarak iletilecektir.
                </p>
              </div>

              {/* Sağ Alttaki Şeffaf Köpek İkonu */}
              <div className="absolute bottom-4 right-4 opacity-10 text-8xl grayscale select-none">
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