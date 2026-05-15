import React from 'react';
import { MapPin, Save, Plus, Trash2 } from 'lucide-react';

const MapEditor = ({ regions = [], setRegions, onSave }) => {
  
  // Input değişikliklerini yönetir
  const updateRegion = (index, field, value) => {
    const newRegions = [...regions];
    newRegions[index][field] = value;
    setRegions(newRegions);
  };

  // Yeni boş bir bölge kartı ekler (Veritabanı boşken hayat kurtarır)
  const addEmptyRegion = () => {
    const newRegions = [...regions, { name: '', info: '', desc: '' }];
    setRegions(newRegions);
  };

  // Mevcut bölgeyi listeden siler
  const removeRegion = (index) => {
    const newRegions = regions.filter((_, idx) => idx !== index);
    setRegions(newRegions);
  };

  return (
    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 lg:col-span-2">
      
      {/* Üst Başlık ve Ekleme Butonu */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
            <MapPin size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase italic text-zinc-800">Hizmet Bölgeleri Yönetimi</h2>
            <p className="text-xs text-gray-400 mt-0.5">Sitede listelenecek operasyon bölgelerini ayarlayın.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addEmptyRegion}
          className="bg-orange-50 text-orange-600 border border-orange-200 px-4 py-2.5 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} /> Yeni Bölge Ekle
        </button>
      </div>

      {/* Bölgeler Listesi/Kutuları */}
      {regions.length === 0 ? (
        <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <p className="text-zinc-400 text-sm font-medium">Henüz eklenmiş bir hizmet bölgesi yok.</p>
          <button 
            type="button" 
            onClick={addEmptyRegion} 
            className="text-orange-600 font-bold text-xs underline mt-1 block mx-auto"
          >
            İlk bölgeyi şimdi oluşturun
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((reg, index) => (
            <div key={index} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200/60 relative group space-y-3 pt-8">
              
              {/* Bölge Silme Butonu */}
              <button
                type="button"
                onClick={() => removeRegion(index)}
                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                title="Bölgeyi Sil"
              >
                <Trash2 size={16} />
              </button>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400">Bölge Adı</label>
                <input 
                  className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl font-bold text-sm focus:border-orange-500 focus:outline-none" 
                  value={reg.name || ''} 
                  onChange={(e) => updateRegion(index, 'name', e.target.value)}
                  placeholder="Örn: Çankaya"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400">Özet Bilgi</label>
                <input 
                  className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-semibold text-orange-600 focus:border-orange-500 focus:outline-none" 
                  value={reg.info || ''} 
                  onChange={(e) => updateRegion(index, 'info', e.target.value)}
                  placeholder="Örn: 10+ Aktif Bakıcı"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400">Detaylı Açıklama</label>
                <textarea 
                  className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl text-sm h-24 resize-none focus:border-orange-500 focus:outline-none" 
                  value={reg.desc || ''} 
                  onChange={(e) => updateRegion(index, 'desc', e.target.value)}
                  placeholder="Bölge servis detayları, çalışma saatleri veya ek bilgiler..."
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kaydetme Paneli */}
      <button 
        onClick={onSave} 
        disabled={regions.length === 0}
        className="mt-8 bg-zinc-950 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all w-full md:w-auto flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:hover:bg-zinc-950"
      >
        <Save size={18} /> DEĞİŞİKLİKLERİ VERİTABANINA YAZ
      </button>
    </section>
  );
};

export default MapEditor;