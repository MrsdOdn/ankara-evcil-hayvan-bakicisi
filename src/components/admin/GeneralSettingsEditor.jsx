import React from 'react';
import { Save } from 'lucide-react'; // Sadece çalışan Save ikonunu bırakalım

// Footer'daki gibi manuel SVG İkonları
const ManualIcon = ({ name, color }) => {
  const icons = {
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    facebook: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />,
    youtube: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color || "currentColor"}>
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const GeneralSettingsEditor = ({ settings, setSettings, onSave }) => {
  const handleChange = (f, v) => setSettings(prev => ({ ...prev, [f]: v }));

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-black italic uppercase text-zinc-800">Site Kimliği</h2>
        <button onClick={onSave} className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-900 transition-all">
          <Save size={18} /> KAYDET
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Temel Bilgiler</p>
          <input className="w-full p-3 bg-zinc-50 border rounded-xl" value={settings.telefon} onChange={e => handleChange('telefon', e.target.value)} placeholder="Telefon" />
          <input className="w-full p-3 bg-zinc-50 border rounded-xl" value={settings.email} onChange={e => handleChange('email', e.target.value)} placeholder="E-posta" />
          <input className="w-full p-3 bg-zinc-50 border rounded-xl" value={settings.adres} onChange={e => handleChange('adres', e.target.value)} placeholder="Hizmet Bölgesi" />
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sosyal Medya</p>
          
          <div className="flex items-center gap-2 bg-zinc-50 p-1 border rounded-xl">
             <div className="p-2 bg-white rounded-lg shadow-sm"><ManualIcon name="instagram" color="#E4405F" /></div>
             <input className="flex-1 bg-transparent p-2 outline-none" value={settings.instagram} onChange={e => handleChange('instagram', e.target.value)} placeholder="Instagram Link" />
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 p-1 border rounded-xl">
             <div className="p-2 bg-white rounded-lg shadow-sm"><ManualIcon name="facebook" color="#1877F2" /></div>
             <input className="flex-1 bg-transparent p-2 outline-none" value={settings.facebook} onChange={e => handleChange('facebook', e.target.value)} placeholder="Facebook Link" />
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 p-1 border rounded-xl">
             <div className="p-2 bg-white rounded-lg shadow-sm"><ManualIcon name="youtube" color="#FF0000" /></div>
             <input className="flex-1 bg-transparent p-2 outline-none" value={settings.youtube} onChange={e => handleChange('youtube', e.target.value)} placeholder="YouTube Link" />
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 p-1 border rounded-xl">
             <div className="p-2 bg-white rounded-lg shadow-sm"><ManualIcon name="whatsapp" color="#25D366" /></div>
             <input className="flex-1 bg-transparent p-2 outline-none" value={settings.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} placeholder="WhatsApp Link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsEditor;