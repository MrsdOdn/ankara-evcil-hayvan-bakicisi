import React from 'react';
import { Save, LayoutGrid, Type, AlignLeft } from 'lucide-react';

const ServicesEditor = ({ services, setServices, onSave }) => {
  // Başlıkları ve açıklamaları toplu yönetmek için yardımcı fonksiyon
  const handleUpdate = (key, value) => {
    setServices(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8">
      {/* Üst Bar */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <LayoutGrid size={20} />
          </div>
          <h2 className="text-xl font-black italic uppercase text-zinc-800 tracking-tight">
            Hizmetler Editörü
          </h2>
        </div>
        <button 
          onClick={onSave}
          className="bg-zinc-900 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-zinc-200"
        >
          <Save size={18} /> KAYDET
        </button>
      </div>

      <div className="space-y-8">
        {/* 1. Bölüm: Ana Başlıklar */}
        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-4">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Bölüm Başlıkları</p>
          <div className="space-y-4">
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                className="w-full bg-white border border-zinc-200 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Üst Başlık (Örn: Neler Yapıyoruz?)"
                value={services.hizmetlerUstBaslik || ''}
                onChange={(e) => handleUpdate('hizmetlerUstBaslik', e.target.value)}
              />
            </div>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                className="w-full bg-white border border-zinc-200 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Ana Başlık (Örn: Dostlarınız İçin...)"
                value={services.hizmetlerAnaBaslik || ''}
                onChange={(e) => handleUpdate('hizmetlerAnaBaslik', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 2. Bölüm: Hizmet Açıklamaları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="col-span-full text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Hizmet İçerikleri</p>
          
          {/* Gezdirme */}
          <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
            <label className="text-xs font-bold text-orange-700 mb-2 block">Gezdirme Açıklaması</label>
            <textarea 
              className="w-full bg-white border border-orange-200 p-3 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-orange-500/20 outline-none"
              value={services.gezdirmeDesc || ''}
              onChange={(e) => handleUpdate('gezdirmeDesc', e.target.value)}
            />
          </div>

          {/* Kuaför */}
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <label className="text-xs font-bold text-blue-700 mb-2 block">Kuaför Açıklaması</label>
            <textarea 
              className="w-full bg-white border border-blue-200 p-3 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-blue-500/20 outline-none"
              value={services.kuaforDesc || ''}
              onChange={(e) => handleUpdate('kuaforDesc', e.target.value)}
            />
          </div>

          {/* Bakım (sosyalDesc ile eşleşiyor) */}
          <div className="p-4 bg-green-50/50 border border-green-100 rounded-2xl">
            <label className="text-xs font-bold text-green-700 mb-2 block">Bakım Açıklaması</label>
            <textarea 
              className="w-full bg-white border border-green-200 p-3 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-green-500/20 outline-none"
              value={services.bakimDesc || ''} // Veritabanında bakimDesc olarak tutmak daha sağlıklıdır
              onChange={(e) => handleUpdate('bakimDesc', e.target.value)}
            />
          </div>

          {/* Sosyalleştirme */}
          <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl">
            <label className="text-xs font-bold text-purple-700 mb-2 block">Sosyalleştirme Açıklaması</label>
            <textarea 
              className="w-full bg-white border border-purple-200 p-3 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-purple-500/20 outline-none"
              value={services.sosyalDesc || ''}
              onChange={(e) => handleUpdate('sosyalDesc', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesEditor;