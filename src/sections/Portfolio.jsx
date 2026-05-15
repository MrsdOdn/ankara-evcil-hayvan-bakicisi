import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Video } from 'lucide-react';
// --- FIREBASE BAĞLANTISI ---
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";

const PortfolioSlider = ({ title, data, isVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  // YouTube videoları için temiz gömme (embed) linki üreten fonksiyon
  const getEmbedUrl = (url, isBackground = false) => {
    if (!url) return "";
    let videoId = "";

    if (url.includes('shorts/')) {
      videoId = url.split('shorts/')[1].split(/[?#&]/)[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split(/[?#&]/)[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?#&]/)[0];
    }

    if (!videoId) return url;

    // Eğer arka plan videosu ise: sessiz yap, otomatik oynat, kontrolleri gizle ve döngüye al
    if (isBackground) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0`;
    }

    // Normal ön plandaki video oynatıcı
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
  };

  const currentItem = data[currentIndex];

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full lg:w-1/2 flex flex-col mb-16 px-2 text-left">
      {/* Sektörel İkon ve Başlık */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className={`p-2.5 rounded-2xl ${isVideo ? 'bg-orange-600' : 'bg-orange-500'} text-white shadow-lg shadow-orange-200`}>
          {isVideo ? <Video size={20} /> : <Camera size={20} />}
        </div>
        <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight italic">{title}</h3>
      </div>

      {/* Ana Çerçeve */}
      <div className="relative group bg-zinc-950 rounded-[3rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(234,88,12,0.15)] aspect-[4/3] sm:aspect-square lg:aspect-[4/3] border-4 border-white">
        <div className="w-full h-full relative flex items-center justify-center">
          {isVideo ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* [YENİ] VİDEO ARKASI SİNEMATİK BLUR KATMANI */}
              {/* Sadece normal yatay videolarda (Shorts olmayan) arkaya hareketli blur basar */}
              {!currentItem?.url?.includes('shorts/') && (
                <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 blur-2xl scale-150 z-0 select-none">
                  <iframe
                    className="w-full h-full object-cover border-0"
                    src={getEmbedUrl(currentItem?.url, true)}
                    title="Arka Plan Ambiyansı"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              )}

              {/* Ön Plandaki Gerçek Video Oynatıcı */}
              <iframe
                key={currentItem?.url}
                className={`w-full border-0 relative z-10 ${
                  currentItem?.url?.includes('shorts/') ? 'h-full aspect-[9/16]' : 'aspect-video'
                }`}
                src={getEmbedUrl(currentItem?.url, false)}
                title={currentItem?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Fotoğraf için Blur Arka Planı */}
              {currentItem?.fitMode === 'contain' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none" 
                  style={{ backgroundImage: `url(${currentItem?.url})` }}
                />
              )}

              {/* Fotoğrafın Kendisi */}
              <img 
                src={currentItem?.url} 
                alt={currentItem?.title} 
                className={`w-full h-full relative z-10 transition-transform duration-700 ${
                  currentItem?.fitMode === 'contain' ? 'object-contain' : 'object-cover group-hover:scale-110'
                }`} 
                style={{ 
                  objectPosition: currentItem?.fitMode === 'cover' ? (currentItem?.objectPosition || 'center') : 'center' 
                }} 
              />

              {/* Fotoğraf Yazı Katmanı */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end z-20 pointer-events-none">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">Bakım & Sosyalleşme</span>
                <h4 className="text-white text-2xl font-black uppercase italic tracking-tighter">{currentItem?.title}</h4>
                <p className="text-gray-300 text-sm mt-2 opacity-90 font-medium leading-relaxed">{currentItem?.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigasyon Okları */}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-500 text-white p-4 rounded-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/20">
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-500 text-white p-4 rounded-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/20">
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Alt Kontroller */}
      <div className="flex items-center justify-between mt-8 px-4">
        <div className="flex gap-2 flex-1 max-w-[200px]">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out
                ${currentIndex === index 
                  ? 'flex-[4] bg-orange-600' 
                  : 'flex-1 bg-gray-200 hover:bg-orange-200'}`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
             <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">
               {isVideo ? 'Pati Video' : 'Pati Foto'}
             </span>
             <span className="text-sm font-black text-gray-800">
               {currentIndex + 1} <span className="text-orange-300">/</span> {data.length}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FIREBASE'DEN VERİ ÇEKME ---
  useEffect(() => {
    const dbRef = ref(db, 'projects');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setAllProjects(projectsList);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const videos = allProjects.filter(p => p.type === 'video');
  const photos = allProjects.filter(p => p.type === 'image');

  if (loading) return null;

  return (
    <section id="galeri" className="py-32 bg-[#fdfaf5] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -mr-48 -mt-48"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-10 bg-orange-300"></div>
             <span className="text-orange-600 font-bold tracking-[0.3em] uppercase text-xs">Ankara Pati Galeri</span>
             <div className="h-px w-10 bg-orange-300"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-tight">
            MUTLU <span className="text-orange-600">PATİLERİMİZ</span>
          </h2>
          <div className="h-2 w-32 bg-orange-500 mt-6 rounded-full shadow-[0_5px_15px_rgba(234,88,12,0.3)]"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-20 items-start">
          <PortfolioSlider title="Eğlenceli Anlar" data={videos} isVideo={true} />
          <PortfolioSlider title="Bakım Günlüğü" data={photos} isVideo={false} />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;