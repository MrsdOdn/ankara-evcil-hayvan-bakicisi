import React from 'react';
import { LogOut, LayoutDashboard, UserCircle } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  return (
    <header className="bg-white rounded-[2rem] p-4 shadow-sm border border-zinc-100 mb-8">
      <div className="flex items-center justify-between px-4">
        
        {/* Sol Kısım: Logo ve Başlık */}
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-100">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-zinc-800 tracking-tight leading-none">
              ANKARA PATİ
            </h1>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">
              Yönetim Paneli
            </span>
          </div>
        </div>

        {/* Sağ Kısım: Kullanıcı ve Çıkış */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100">
            <UserCircle size={18} className="text-zinc-400" />
            <span className="text-sm font-bold text-zinc-600">Admin</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-zinc-200"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">GÜVENLİ ÇIKIŞ</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default AdminDashboard;