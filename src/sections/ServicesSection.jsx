import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";
import * as Icons from 'lucide-react'; 

const ServicesSection = () => {
  const [titles, setTitles] = useState({
    ust: "Neler Yapıyoruz?",
    ana: "Dostlarınız İçin Tam Kapsamlı Bakım"
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const dbRef = ref(db);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTitles({
          ust: data.hizmetlerUstBaslik || "Neler Yapıyoruz?",
          ana: data.hizmetlerAnaBaslik || "Dostlarınız İçin Tam Kapsamlı Bakım"
        });

        if (data.hizmetListesi) {
          const dynamicServices = Object.keys(data.hizmetListesi).map(key => ({
            id: key,
            ...data.hizmetListesi[key]
          }));
          setServices(dynamicServices);
        } else {
          setServices([]);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="hizmetler" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Başlıklar */}
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-semibold tracking-wide uppercase">{titles.ust}</h2>
          <p className="mt-2 text-3xl md:text-5xl font-extrabold text-gray-900">{titles.ana}</p>
        </div>

        {/* Dinamik Kartlar Grubu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = Icons[service.iconName] || Icons.Sparkles;

            return (
              <div 
                key={service.id}
                className="group relative p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Dinamik Renk ve İkon */}
                <div className={`w-16 h-16 rounded-2xl ${service.color || 'bg-orange-500'} flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                  <IconComponent size={28} />
                </div>

                {/* Dinamik Başlık ve Açıklama */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                <div className={`w-0 group-hover:w-full h-1 mt-6 rounded-full ${service.color || 'bg-orange-500'} opacity-30 transition-all duration-500`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;