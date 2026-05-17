import React from 'react';
import { Save, Star, Plus, Trash2, Layers, Smile, Type, AlignLeft } from 'lucide-react';

const WhyUsEditor = ({ data, setWhyUs, onSave }) => {
  
  const handleMetaChange = (key, value) => {
    setWhyUs(prev => ({ ...prev, [key]: value }));
  };

  const handleCardUpdate = (cardId, field, value) => {
    setWhyUs(prev => ({
      ...prev,
      kartListesi: {
        ...prev.kartListesi,
        [cardId]: {
          ...prev.kartListesi[cardId],
          [field]: value
        }
      }
    }));
  };

  const addNewCard = () => {
    const newId = `neden_${Date.now()}`;
    const newCard = {
      title: "",
      description: "",
      emoji: "🐾", // Varsayılan evcil hayvan emojisi
      detail: ""
    };

    setWhyUs(prev => ({
      ...prev,
      kartListesi: {
        ...(prev.kartListesi || {}),
        [newId]: newCard
      }
    }));
  };

  const deleteCard = (cardId) => {
    setWhyUs(prev => {
      const updatedList = { ...(prev.kartListesi || {}) };
      delete updatedList[cardId];
      return { ...prev, kartListesi: updatedList };
    });
  };

  // Gecikmesiz ve taze state kaydı için yerel tetikleyici
  const handleLocalSave = () => {
    setWhyUs(currentData => {
      const guncelPaket = {
        whyUsUstBaslik: currentData.whyUsUstBaslik || "",
        whyUsAnaBaslik: currentData.whyUsAnaBaslik || "",
        whyUsTuruncuBaslik: currentData.whyUsTuruncuBaslik || "",
        whyUsAciklama: currentData.whyUsAciklama || "",
        whyUsIstatistikOran: currentData.whyUsIstatistikOran || "",
        whyUsIstatistikMetin: currentData.whyUsIstatistikMetin || "",
        kartListesi: currentData.kartListesi || {}
      };
      onSave(guncelPaket);
      return currentData;
    });
  };

  // Popüler pet sitesi emojileri
  const emojiOptions = ["🐾", "📜", "📸", "🧼", "🐕", "🐈", "❤️", "🏡", "⭐", "🥇", "🏥"];
  const listeleme = data.kartListesi ? Object.keys(data.kartListesi) : [];

  return (
    <div className="w-full bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8 mb-8">
      
      {/* Üst Bar */}
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
          onClick={handleLocalSave}
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
              value={data?.whyUsUstBaslik || ""}
              onChange={(e) => handleMetaChange('whyUsUstBaslik', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">ANA BAŞLIK</label>
            <input 
              className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
              value={data?.whyUsAnaBaslik || ""}
              onChange={(e) => handleMetaChange('whyUsAnaBaslik', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">VURGULU (TURUNCU) BAŞLIK</label>
            <input 
              className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
              value={data?.whyUsTuruncuBaslik || ""}
              onChange={(e) => handleMetaChange('whyUsTuruncuBaslik', e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 ml-2">ORAN</label>
              <input 
                className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                value={data?.whyUsIstatistikOran || ""}
                onChange={(e) => handleMetaChange('whyUsIstatistikOran', e.target.value)}
              />
            </div>
            <div className="flex-[2] space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 ml-2">İSTATİSTİK METNİ</label>
              <input 
                className="w-full p-3 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                value={data?.whyUsIstatistikMetin || ""}
                onChange={(e) => handleMetaChange('whyUsIstatistikMetin', e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 ml-2">UZUN AÇIKLAMA</label>
            <textarea 
              className="w-full p-4 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 h-24 resize-none font-medium leading-relaxed"
              value={data?.whyUsAciklama || ""}
              onChange={(e) => handleMetaChange('whyUsAciklama', e.target.value)}
            />
          </div>
        </div>

        {/* Esnek Kartlar Yönetim Bölümü */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-zinc-400" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Kart İçerikleri ({listeleme.length})</p>
            </div>
            <button
              type="button"
              onClick={addNewCard}
              className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} /> Yeni Kart Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {listeleme.map((cardId) => {
              const card = data.kartListesi[cardId];
              return (
                <div key={cardId} className="p-5 border border-zinc-100 bg-zinc-50/30 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => deleteCard(cardId)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                    title="Kartı Sil"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Emoji Seçimi */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 block">EMOJİ</label>
                      <select
                        className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl outline-none text-xl cursor-pointer"
                        value={card.emoji || "🐾"}
                        onChange={(e) => handleCardUpdate(cardId, 'emoji', e.target.value)}
                      >
                        {emojiOptions.map(em => <option key={em} value={em}>{em}</option>)}
                      </select>
                    </div>

                    {/* Kart Başlığı */}
                    <div className="sm:col-span-6 space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 block">KART BAŞLIĞI</label>
                      <input
                        type="text"
                        className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl outline-none font-bold text-sm"
                        placeholder="Örn: Sertifikalı Uzmanlar"
                        value={card.title || ""}
                        onChange={(e) => handleCardUpdate(cardId, 'title', e.target.value)}
                      />
                    </div>

                    {/* Alt Etiket (Detail) */}
                    <div className="sm:col-span-4 space-y-1 pr-8">
                      <label className="text-[10px] font-bold text-zinc-400 block">ALT ROZET METNİ</label>
                      <input
                        type="text"
                        className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl outline-none font-bold text-xs text-orange-600 uppercase"
                        placeholder="Örn: Butik Hizmet"
                        value={card.detail || ""}
                        onChange={(e) => handleCardUpdate(cardId, 'detail', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Açıklama Alanı */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 block">AÇIKLAMA</label>
                    <textarea
                      className="w-full p-3 bg-white border border-zinc-200 rounded-xl text-xs h-16 resize-none outline-none focus:ring-2 focus:ring-orange-500/10 font-medium"
                      placeholder="Kart açıklama metnini buraya girin..."
                      value={card.description || ""}
                      onChange={(e) => handleCardUpdate(cardId, 'description', e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {listeleme.length === 0 && (
            <div className="text-center p-8 border border-dashed border-zinc-200 rounded-2xl text-zinc-400 text-xs">
              Henüz hiç neden biz kartı eklenmedi. "Yeni Kart Ekle" butonuna basarak başlayın.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyUsEditor;