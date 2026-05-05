import React from 'react';

const services = [
  {
    title: "Gezdirme",
    description: "Enerji dolu bir yürüyüş için Ankara'nın en güzel parklarını seçiyoruz.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    color: "bg-orange-500"
  },
  {
    title: "Kuaför",
    description: "Dostunuzun stili ve hijyeni için profesyonel kesim ve banyo hizmeti.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
      </svg>
    ),
    color: "bg-blue-500"
  },
  {
    title: "Bakım",
    description: "Beslenme, tırnak kesimi ve rutin sağlık kontrollerini kapsayan tam destek.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "bg-green-500"
  },
  {
    title: "Sosyalleştirme",
    description: "Diğer dostlarıyla güvenli bir ortamda oyun oynayarak sosyal becerilerini geliştirme.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "bg-purple-500"
  }
];

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Arka plan pati izi süslemesi */}
      <div className="absolute top-10 right-10 opacity-[0.03] rotate-12 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.7 0-1.5.5-2 1.2-.5-.7-1.3-1.2-2-1.2-1.7 0-3 1.3-3 3 0 1.5.8 2.3 1.6 3l1.4 1.2c.6.5 1.3.8 2 .8s1.4-.3 2-.8l1.4-1.2c.8-.7 1.6-1.5 1.6-3 0-1.7-1.3-3-3-3zm-8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" /></svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-semibold tracking-wide uppercase">Neler Yapıyoruz?</h2>
          <p className="mt-2 text-3xl md:text-5xl font-extrabold text-gray-900">
            Dostlarınız İçin <span className="text-orange-600">Tam Kapsamlı</span> Bakım
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* İkon Dairesi */}
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Alt Dekoratif Çizgi */}
              <div className={`w-0 group-hover:w-full h-1 mt-6 rounded-full ${service.color} opacity-30 transition-all duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;