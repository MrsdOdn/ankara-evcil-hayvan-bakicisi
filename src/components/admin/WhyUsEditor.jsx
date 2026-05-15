import React from 'react';
import { Save, Star, Quote, Hash, Type, AlignLeft } from 'lucide-react';

const WhyUsEditor = ({ data, setWhyUs, onSave }) => {
  
  const handleChange = (key, value) => {
    setWhyUs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    // w-full ekleyerek genişliği sabitledik ve dış boşluk verdik
    <div className="w-full bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8 mb-8">
      
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-lg text-white shadow-lg shadow-orange-100">
            <Star size={20} />
          </div>
          <h2 className="text-xl font-black italic uppercase text-zinc-800 tracking-tight">
            Neden Biz Editörü
          </h2>
        </div>
        <button 
          onClick={onSave}
          className="bg-zinc-900 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-zinc-200"
        >
          <Save size={18} /> KAYDET
        </button>
      </div>

      <div className="space-y-6">
        {/* Giriş Metinleri Bölümü */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100">
          <div className="col-span-full">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Giriş Metinleri</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">ÜST BAŞLIK</label>
            <input 
              className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
              value={data?.whyUsUstBaslik || ""} // Opsiyonel chaining ve boş string kontrolü
              onChange={(e) => handleChange('whyUsUstBaslik', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">ANA BAŞLIK</label>
            <input 
              className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
              value={data?.whyUsAnaBaslik || ""}
              onChange={(e) => handleChange('whyUsAnaBaslik', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">VURGULU (TURUNCU) BAŞLIK</label>
            <input 
              className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
              value={data?.whyUsTuruncuBaslik || ""}
              onChange={(e) => handleChange('whyUsTuruncuBaslik', e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 ml-2">ORAN</label>
              <input 
                className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                value={data?.whyUsIstatistikOran || ""}
                onChange={(e) => handleChange('whyUsIstatistikOran', e.target.value)}
              />
            </div>
            <div className="flex-[2] space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 ml-2">İSTATİSTİK METNİ</label>
              <input 
                className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                value={data?.whyUsIstatistikMetin || ""}
                onChange={(e) => handleChange('whyUsIstatistikMetin', e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">UZUN AÇIKLAMA</label>
            <textarea 
              className="w-full p-4 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 h-28 resize-none font-medium leading-relaxed"
              value={data?.whyUsAciklama || ""}
              onChange={(e) => handleChange('whyUsAciklama', e.target.value)}
            />
          </div>
        </div>

        {/* Kartlar Bölümü */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="col-span-full text-[10px] font-black text-zinc-400 uppercase tracking-widest">Kart İçerikleri</p>
          
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:border-orange-200 transition-colors">
              <label className="text-[10px] font-black text-orange-600 mb-2 block uppercase tracking-tighter">
                {num}. Kart Açıklaması
              </label>
              <textarea 
                className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm h-24 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/10 transition-all resize-none font-medium"
                value={data?.[`reason${num}Desc`] || ""}
                onChange={(e) => handleChange(`reason${num}Desc`, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUsEditor;