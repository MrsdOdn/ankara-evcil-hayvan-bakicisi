import React from 'react';
import { Save, LayoutGrid, Type, AlignLeft, Plus, Trash2, Palette, Layers, Smile } from 'lucide-react';
import * as Icons from 'lucide-react';

const ServicesEditor = ({ services, setServices, onSave }) => {

  const handleTitleUpdate = (key, value) => {
    setServices(prev => ({ ...prev, [key]: value }));
  };

  const handleServiceCardUpdate = (cardId, field, value) => {
    setServices(prev => ({
      ...prev,
      hizmetListesi: {
        ...prev.hizmetListesi,
        [cardId]: {
          ...prev.hizmetListesi[cardId],
          [field]: value
        }
      }
    }));
  };

  const addNewService = () => {
    const newId = `hizmet_${Date.now()}`; 
    const newCard = {
      title: "",        
      description: "",  
      color: "bg-orange-500",
      iconName: "Sparkles" 
    };

    setServices(prev => ({
      ...prev,
      hizmetListesi: {
        ...prev.hizmetListesi,
        [newId]: newCard
      }
    }));
  };

  const deleteService = (cardId) => {
    setServices(prev => {
      const updatedList = { ...prev.hizmetListesi };
      delete updatedList[cardId];
      return { ...prev, hizmetListesi: updatedList };
    });
  };

  // KRİTİK ÇÖZÜM FONKSİYONU: 
  // Gecikmeli state sorununu aşmak için functional güncelleme ile en taze veriyi yakalayıp gönderiyoruz.
  const handleLocalSave = () => {
    setServices(currentServices => {
      const guncellenecekPaket = {
        hizmetlerUstBaslik: currentServices.hizmetlerUstBaslik || "",
        hizmetlerAnaBaslik: currentServices.hizmetlerAnaBaslik || "",
        hizmetListesi: currentServices.hizmetListesi || {}
      };
      
      // Admin.jsx'teki handleUpdate fonksiyonuna en güncel veriyi pasla
      onSave(guncellenecekPaket);
      
      return currentServices; // State'i bozmadan aynen koru
    });
  };

  const colorOptions = [
    { name: "Turuncu", value: "bg-orange-500" },
    { name: "Mavi", value: "bg-blue-500" },
    { name: "Yeşil", value: "bg-green-500" },
    { name: "Mor", value: "bg-purple-500" },
    { name: "Kırmızı", value: "bg-red-500" }
  ];

  const iconOptions = [
    { name: "Yıldız (Işıltı)", value: "Sparkles" },
    { name: "Köpek/Pati", value: "Bone" },
    { name: "Kalp (Bakım)", value: "Heart" },
    { name: "Makas (Kuaför)", value: "Scissors" },
    { name: "Kullanıcı/Dost", value: "User" },
    { name: "Kalkan (Güvenlik)", value: "Shield" },
    { name: "Güneş/Yürüyüş", value: "Sun" },
    { name: "Ev/Otel", value: "Home" }
  ];

  const listeleme = services.hizmetListesi ? Object.keys(services.hizmetListesi) : [];

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8 max-w-5xl mx-auto w-full">
      
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
        {/* onClick event'ini yerel güvenli fonksiyona bağladık */}
        <button 
          onClick={handleLocalSave}
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
                onChange={(e) => handleTitleUpdate('hizmetlerUstBaslik', e.target.value)}
              />
            </div>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                className="w-full bg-white border border-zinc-200 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Ana Başlık (Örn: Dostlarınız İçin...)"
                value={services.hizmetlerAnaBaslik || ''}
                onChange={(e) => handleTitleUpdate('hizmetlerAnaBaslik', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 2. Bölüm: Kart Görünümlü Hizmet İçerikleri */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-zinc-400" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Hizmet İçerikleri ({listeleme.length})</p>
            </div>
            <button
              type="button"
              onClick={addNewService}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} /> Yeni Kart Ekle
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listeleme.map((cardId) => {
              const card = services.hizmetListesi[cardId];
              
              const bgClass = card.color === "bg-blue-500" ? "bg-blue-50/70 border-blue-200 text-blue-700" :
                              card.color === "bg-green-500" ? "bg-green-50/70 border-green-200 text-green-700" :
                              card.color === "bg-purple-500" ? "bg-purple-50/70 border-purple-200 text-purple-700" :
                              card.color === "bg-red-500" ? "bg-red-50/70 border-red-200 text-red-700" :
                              "bg-orange-50/70 border-orange-200 text-orange-700";

              const SelectedIcon = Icons[card.iconName] || Icons.Sparkles;

              return (
                <div key={cardId} className={`p-5 border rounded-2xl relative space-y-3 transition-all duration-200 ${bgClass}`}>
                  
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="p-1.5 bg-white/80 rounded-lg shadow-sm">
                        <SelectedIcon size={16} className="text-zinc-700" />
                      </div>
                      <input 
                        type="text"
                        className="bg-transparent font-bold text-xs uppercase tracking-wider outline-none border-b border-transparent focus:border-current placeholder-zinc-400 w-full"
                        placeholder="HİZMET ADINI YAZIN (Örn: Gezdirme)"
                        value={card.title || ''}
                        onChange={(e) => handleServiceCardUpdate(cardId, 'title', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteService(cardId)}
                      className="text-zinc-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                      title="Kartı Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <textarea 
                    className="w-full bg-white border border-zinc-200/60 p-3 rounded-xl text-sm h-24 resize-none outline-none focus:ring-2 focus:ring-black/5 text-zinc-700 shadow-sm"
                    placeholder="Sitenizde görünecek hizmet açıklamasını buraya yazın..."
                    value={card.description || ''}
                    onChange={(e) => handleServiceCardUpdate(cardId, 'description', e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200/40 text-zinc-500">
                    
                    {/* İkon Seçici */}
                    <div className="flex items-center gap-1.5">
                      <Smile size={13} className="text-zinc-400 flex-shrink-0" />
                      <select
                        className="text-xs bg-white border border-zinc-200 p-1.5 rounded-lg outline-none cursor-pointer font-medium text-zinc-600 shadow-sm w-full"
                        value={card.iconName || 'Sparkles'}
                        onChange={(e) => handleServiceCardUpdate(cardId, 'iconName', e.target.value)}
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon.value} value={icon.value}>{icon.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Renk Seçici */}
                    <div className="flex items-center gap-1.5">
                      <Palette size={13} className="text-zinc-400 flex-shrink-0" />
                      <select
                        className="text-xs bg-white border border-zinc-200 p-1.5 rounded-lg outline-none cursor-pointer font-medium text-zinc-600 shadow-sm w-full"
                        value={card.color || 'bg-orange-500'}
                        onChange={(e) => handleServiceCardUpdate(cardId, 'color', e.target.value)}
                      >
                        {colorOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.name} Rengi</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {listeleme.length === 0 && (
            <div className="text-center p-12 border border-dashed border-zinc-200 rounded-2xl text-zinc-400 text-sm">
              Henüz hiç hizmet kartı eklenmedi. "Yeni Kart Ekle" butonuna basarak başlayın.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesEditor;