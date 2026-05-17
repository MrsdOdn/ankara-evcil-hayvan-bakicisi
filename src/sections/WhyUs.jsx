import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";

const WhyUs = () => {
  const [content, setContent] = useState({
    ustBaslik: "Güvenli Eller",
    anaBaslik: "Neden Bizi",
    turuncuBaslik: "Tercih Etmelisiniz?",
    aciklama: "Ankara'nın patili dostlarına sadece bir hizmet değil, sevgi ve güvenlik dolu bir deneyim sunuyoruz.",
    istatistikOran: "100%",
    istatistikMetin: "Müşteri Memnuniyeti"
  });

  // Başlangıçta boş bir nesne atıyoruz, Firebase'den gelen dinamik kartları map edeceğiz
  const [kartListesi, setKartListesi] = useState({});

  useEffect(() => {
    const dbRef = ref(db);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent({
          ustBaslik: data.whyUsUstBaslik || "Güvenli Eller",
          anaBaslik: data.whyUsAnaBaslik || "Neden Bizi",
          turuncuBaslik: data.whyUsTuruncuBaslik || "Tercih Etmelisiniz?",
          aciklama: data.whyUsAciklama || "Ankara'nın patili dostlarına sadece bir hizmet değil, sevgi ve güvenlik dolu bir deneyim sunuyoruz.",
          istatistikOran: data.whyUsIstatistikOran || "100%",
          istatistikMetin: data.whyUsIstatistikMetin || "Müşteri Memnuniyeti"
        });

        // Veritabanındaki esnek listeyi al, eğer yoksa veya eskiyse boş nesne ata
        setKartListesi(data.kartListesi || {});
      }
    });
    return () => unsubscribe();
  }, []);

  const kartAnahtarlari = Object.keys(kartListesi);

  return (
    <section id="neden-biz" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sol: Başlık Alanı */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-bold tracking-wide uppercase">
              {content.ustBaslik}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {content.anaBaslik} <br/>
              <span className="text-orange-600">{content.turuncuBaslik}</span>
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {content.aciklama}
            </p>
            
            <div className="pt-4 border-l-4 border-orange-500 pl-6">
              <span className="text-3xl font-black text-gray-900">{content.istatistikOran}</span>
              <p className="text-gray-500 font-medium">{content.istatistikMetin}</p>
            </div>
          </div>

          {/* Sağ: Tamamen Esnek Dinamik Kartlar Alanı */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {kartAnahtarlari.map((key) => {
              const reason = kartListesi[key];
              return (
                <div 
                  key={key} 
                  className="p-8 rounded-[2.5rem] bg-gray-50 border border-transparent hover:bg-white hover:shadow-2xl hover:border-orange-100 transition-all duration-500 group"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {reason.emoji || "🐾"}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {reason.description}
                  </p>
                  {reason.detail && (
                    <div className="inline-block text-[10px] font-black text-orange-700 bg-orange-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                      {reason.detail}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Eğer panelden tüm kartlar silindiyse bir uyarı gösterelim */}
            {kartAnahtarlari.length === 0 && (
              <div className="col-span-full text-center p-12 text-zinc-400 text-sm">
                Yönetim panelinden henüz kart içeriği girilmedi.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;