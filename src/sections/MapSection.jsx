import React, { useState, useEffect } from 'react';

import { db } from '../firebase';

import { ref, onValue } from "firebase/database";


const MapSection = () => {

  const [regions, setRegions] = useState([

    { name: "Çankaya", info: "5+ Uzman Bakıcı", desc: "Yıldız, Dikmen, Bahçelievler ve Ümitköy bölgelerinde aktif hizmet." },

    { name: "Altındağ", info: "3+ Uzman Bakıcı", desc: "Aydınlıkevler ve Karapürçek çevresinde güvenli gezdirme." },

    { name: "Yenimahalle", info: "4+ Uzman Bakıcı", desc: "Batıkent ve Demetevler bölgesinde profesyonel bakım." }

  ]);


  const [activeRegion, setActiveRegion] = useState(null);

  const [phone, setPhone] = useState("905435498706");


  useEffect(() => {

    const dbRef = ref(db);

    const unsubscribe = onValue(dbRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        if (data.mapSection?.regions) {

          setRegions(data.mapSection.regions);

        }

        if (data.telefon) {

          setPhone(String(data.telefon).replace(/\D/g, ''));

        }

      }

    });

    return () => unsubscribe();

  }, []);


  useEffect(() => {

    if (regions.length > 0 && !activeRegion) {

      setActiveRegion(regions[0]);

    }

  }, [regions]);


  const handleWhatsAppClick = (regionName) => {

    const message = `Merhaba, ${regionName} bölgesi için verdiğiniz hizmetler hakkında bilgi alabilir miyim?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');

  };


  if (!activeRegion) return null;


  return (

    <section id="bolgeler" className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">



          {/* Sol Kısım: Bölge Listesi */}

          <div className="space-y-4">

            {regions.map((reg) => (

              <div

                key={reg.name}

                onClick={() => setActiveRegion(reg)}

                className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between ${activeRegion.name === reg.name

                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'

                    : 'border-gray-100 bg-white hover:border-orange-200'

                  }`}

              >

                <div className="flex items-center gap-4">

                  <span className="text-3xl">

                    {reg.name === "Çankaya" ? "🐾" : reg.name === "Altındağ" ? "🏠" : "🌳"}

                  </span>

                  <div>

                    <h4 className="text-xl font-bold text-gray-800">{reg.name}</h4>

                    <p className="text-orange-600 text-sm font-semibold">{reg.info}</p>

                  </div>

                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${activeRegion.name === reg.name ? 'border-orange-500' : 'border-gray-300'

                  }`}>

                  {activeRegion.name === reg.name && <div className="w-3 h-3 bg-orange-500 rounded-full"></div>}

                </div>

              </div>

            ))}

            <div className="p-4 text-center text-gray-400 italic text-sm">

              Etimesgut ve Keçiören çok yakında!

            </div>

          </div>


          {/* Sağ Kısım: Sevdiğin Orijinal Tasarım */}

          <div className="relative group">

            {/* Turuncu Ankara Etiketi */}

            <div className="absolute -top-3 -right-3 z-20 bg-[#f25c05] text-white px-6 py-2 rounded-2xl font-black text-sm shadow-lg transform rotate-2">

              ANKARA

            </div>


            <div className="bg-[#111827] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-center">



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

                  className="bg-[#f25c05] hover:bg-[#d44d04] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-950/20 active:scale-95"

                >

                  WhatsApp ile Bilgi Al

                </button>

                <p className="text-slate-500 text-xs font-medium italic">

                  * Tıkladığınızda bölge bilginiz otomatik olarak iletilecektir.

                </p>

              </div>


              {/* Sağ Alttaki Gerçek Köpek İkonu (SVG) */}

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

