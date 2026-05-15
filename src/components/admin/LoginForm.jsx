import React from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const LoginForm = ({ handleLogin, setEmail, setPassword }) => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 p-10 border border-zinc-100">
        
        {/* Logo & Başlık */}
        <div className="text-center mb-10">
          <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange-100">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-zinc-800 tracking-tight">ADMİN GİRİŞİ</h1>
          <p className="text-zinc-400 text-sm font-medium mt-1">Ankara Pati Yönetim Paneli</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* E-posta */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 ml-1 tracking-widest uppercase">E-Posta</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* Şifre */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 ml-1 tracking-widest uppercase">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Buton */}
          <button 
            type="submit"
            className="w-full bg-zinc-900 hover:bg-orange-600 text-white p-5 rounded-2xl font-black text-sm tracking-widest transition-all flex items-center justify-center gap-3 group active:scale-[0.98] shadow-xl"
          >
            GİRİŞ YAP 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-zinc-400 text-xs font-bold hover:text-zinc-800 transition-colors">
            ← SİTEYE GERİ DÖN
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;