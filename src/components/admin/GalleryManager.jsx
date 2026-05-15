import React, { useState } from 'react';
import { Trash2, Plus, Image as ImageIcon, X, UploadCloud, Loader2, Video, Link as LinkIcon, Eye, Maximize2, Crop } from 'lucide-react';

const GalleryManager = ({ projects = [], onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    url: '', 
    type: 'image',
    fitMode: 'cover', // 'cover' (Doldur) veya 'contain' (Sığdır)
    objectPosition: 'center' 
  });

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; 

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        setNewProject(prev => ({ ...prev, url: result.data.url }));
      } else {
        alert("Yükleme hatası: " + result.error.message);
      }
    } catch (error) {
      alert("Bağlantı hatası!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.url) {
      return alert("Lütfen tüm alanları doldurun.");
    }
    onAdd(newProject);
    setNewProject({ title: '', description: '', url: '', type: 'image', fitMode: 'cover', objectPosition: 'center' });
    setIsAdding(false);
  };

  return (
    <div className="w-full space-y-6 text-left">
      {/* Üst Bar */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase italic text-zinc-800">Galeri Yönetimi</h2>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest italic">Görsel Sığdırma & Hizalama Paneli</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isAdding ? 'bg-zinc-100 text-zinc-500' : 'bg-orange-600 text-white shadow-lg shadow-orange-200'}`}
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'İPTAL' : 'YENİ EKLE'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border-2 border-orange-100 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* SOL ALAN: Ayarlar ve Girişler */}
            <div className="lg:col-span-7 space-y-6">
              {/* TİP SEÇİCİ */}
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setNewProject({...newProject, type: 'image', url: ''})} 
                  className={`flex-1 p-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 ${newProject.type === 'image' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-zinc-50 text-zinc-400 border-transparent'}`}
                >
                  <ImageIcon size={18}/> FOTOĞRAF
                </button>
                <button 
                  type="button" 
                  onClick={() => setNewProject({...newProject, type: 'video', url: ''})} 
                  className={`flex-1 p-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 ${newProject.type === 'video' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-zinc-50 text-zinc-400 border-transparent'}`}
                >
                  <Video size={18}/> VİDEO
                </button>
              </div>

              {/* DİNAMİK ALAN */}
              {newProject.type === 'image' ? (
                <div className="space-y-4">
                  <div className={`relative h-44 border-2 border-dashed rounded-3xl overflow-hidden transition-all flex items-center justify-center ${newProject.url ? 'border-green-400 bg-green-50' : 'border-zinc-200 bg-zinc-50 hover:border-orange-300'}`}>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" disabled={uploading} />
                    {uploading ? (
                      <Loader2 className="animate-spin text-orange-600" size={32} />
                    ) : newProject.url ? (
                      <div className="text-center text-green-600 font-bold text-sm">
                        ✓ Yüklendi! Sağdaki pencereden modu değiştirerek test edin.
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-zinc-400">
                        <UploadCloud size={32} />
                        <span className="text-[10px] font-black mt-2 uppercase">Görsel Seç ve Yükle</span>
                      </div>
                    )}
                  </div>

                  {/* BOYUTSAL AYARLAMA SEÇENEKLERİ (İşte Sihirli Kısım) */}
                  {newProject.url && (
                    <div className="space-y-4 animate-fadeIn">
                      {/* 1. Mod Seçimi */}
                      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-wider block">Görsel Boyutlandırma Modu:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setNewProject(prev => ({ ...prev, fitMode: 'cover' }))}
                            className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition-all ${newProject.fitMode === 'cover' ? 'bg-orange-600 border-orange-600 text-white shadow-sm' : 'bg-white border-zinc-200 text-zinc-600'}`}
                          >
                            <Crop size={14}/> Alanı Doldur (Kırp)
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewProject(prev => ({ ...prev, fitMode: 'contain' }))}
                            className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition-all ${newProject.fitMode === 'contain' ? 'bg-orange-600 border-orange-600 text-white shadow-sm' : 'bg-white border-zinc-200 text-zinc-600'}`}
                          >
                            <Maximize2 size={14}/> İçine Sığdır (Kırpma Yok)
                          </button>
                        </div>
                      </div>

                      {/* 2. Dikey Odak Seçimi (Sadece Alanı Doldur seçiliyken anlamlıdır) */}
                      {newProject.fitMode === 'cover' && (
                        <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 space-y-2">
                          <label className="text-xs font-black text-zinc-500 uppercase tracking-wider block">Kırpma Odak Noktası (Dikey Hizalama):</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['top', 'center', 'bottom'].map((pos) => (
                              <button
                                key={pos}
                                type="button"
                                onClick={() => setNewProject(prev => ({ ...prev, objectPosition: pos }))}
                                className={`py-2 text-xs font-bold rounded-xl border transition-all ${newProject.objectPosition === pos ? 'bg-zinc-900 border-zinc-950 text-white' : 'bg-white border-zinc-200 text-zinc-600'}`}
                              >
                                {pos === 'top' ? 'Üstü Sabitle' : pos === 'center' ? 'Ortala' : 'Alti Sabitle'}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                  <LinkIcon size={20} className="text-zinc-400" />
                  <input 
                    className="bg-transparent w-full outline-none text-sm"
                    placeholder="YouTube Video / Shorts Linki"
                    value={newProject.url}
                    onChange={e => setNewProject({...newProject, url: e.target.value})}
                  />
                </div>
              )}

              {/* Başlık ve Açıklama */}
              <div className="space-y-4">
                <input 
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none text-sm" 
                  placeholder="İçerik Başlığı" 
                  value={newProject.title} 
                  onChange={e => setNewProject({...newProject, title: e.target.value})} 
                />
                <textarea 
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl resize-none min-h-[80px] outline-none text-sm" 
                  placeholder="Açıklama (İsteğe Bağlı)" 
                  value={newProject.description} 
                  onChange={e => setNewProject({...newProject, description: e.target.value})} 
                />
              </div>
            </div>

            {/* SAĞ ALAN: BİREBİR CANLI ADAPTİF ÖNİZLEME */}
            <div className="lg:col-span-5 flex flex-col justify-between border-l border-zinc-100 lg:pl-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-wider">
                  <Eye size={14} /> Sitedeki Birebir Görünüm
                </div>
                
                {/* Kart Tasarımı */}
                <div className="w-full bg-zinc-950 rounded-[2.5rem] overflow-hidden aspect-[4/3] border-4 border-zinc-100 shadow-xl flex items-center justify-center relative">
                  {newProject.url ? (
                    newProject.type === 'video' ? (
                      <div className="text-center p-4">
                        <Video size={48} className="text-orange-500 mx-auto mb-2 animate-pulse" />
                        <span className="text-xs font-bold text-gray-400 block truncate max-w-[200px]">{newProject.title || "Video Başlığı"}</span>
                      </div>
                    ) : (
                      <>
                        {/* İçine Sığdır Modu Seçildiyse Arkaya Blur Arka Plan Atıyoruz (Premium Görünüm) */}
                        {newProject.fitMode === 'contain' && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110" 
                            style={{ backgroundImage: `url(${newProject.url})` }}
                          />
                        )}
                        <img 
                          src={newProject.url} 
                          className={`w-full h-full relative z-10 transition-all duration-200 ${
                            newProject.fitMode === 'contain' ? 'object-contain' : 'object-cover'
                          }`} 
                          style={{ objectPosition: newProject.fitMode === 'cover' ? newProject.objectPosition : 'center' }} 
                          alt="Önizleme" 
                        />
                      </>
                    )
                  ) : (
                    <div className="text-zinc-600 text-xs font-bold uppercase tracking-widest text-center px-6">
                      Medya bekleniyor...
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={uploading || !newProject.url}
                className={`w-full p-4 mt-6 rounded-2xl font-black uppercase transition-all ${uploading || !newProject.url ? 'bg-zinc-100 text-zinc-300' : 'bg-zinc-900 text-white hover:bg-orange-600 shadow-md'}`}
              >
                BU GÖRÜNÜMLE SİSTEME KAYDET
              </button>
            </div>

          </div>
        </form>
      )}

      {/* Kaydedilmiş Liste Görüntüleme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group bg-white rounded-[2rem] border border-zinc-100 p-4 hover:shadow-md transition-all">
             <div className="aspect-[4/3] bg-zinc-950 rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center">
                {project.type === 'video' ? (
                  <div className="flex flex-col items-center gap-2 text-orange-500 font-black italic">
                    <Video size={40} />
                    <span className="text-[10px]">VİDEO İÇERİĞİ</span>
                  </div>
                ) : (
                  <>
                    {project.fitMode === 'contain' && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center blur-lg opacity-30 scale-110" 
                        style={{ backgroundImage: `url(${project.url})` }}
                      />
                    )}
                    <img 
                      src={project.url} 
                      className={`w-full h-full relative z-10 ${project.fitMode === 'contain' ? 'object-contain' : 'object-cover'}`} 
                      style={{ objectPosition: project.objectPosition || 'center' }} 
                      alt={project.title} 
                    />
                  </>
                )}
             </div>
             <h4 className="font-bold text-zinc-800 uppercase italic text-sm truncate px-1">{project.title}</h4>
             <button onClick={() => onDelete(project.id)} className="mt-4 w-full py-2 text-red-500 hover:bg-red-50 rounded-xl font-black text-[10px] flex items-center justify-center gap-2">
               <Trash2 size={14}/> SİL
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;