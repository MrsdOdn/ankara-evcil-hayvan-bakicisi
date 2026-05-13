import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, onValue, update, push, remove } from "firebase/database";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Save, Plus, Trash2, LogOut, Video, Image as ImageIcon } from 'lucide-react';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // Veritabanı State'leri
    const [services, setServices] = useState({});
    const [whyUs, setWhyUs] = useState({});
    const [projects, setProjects] = useState({});
    const [newProject, setNewProject] = useState({ title: '', url: '', type: 'image', description: '' });

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Verileri Çek
        const dbRef = ref(db);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setServices(data.services || {});
                setWhyUs(data.whyUs || {});
                setProjects(data.projects || {});
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => alert("Giriş Başarısız: " + err.message));
    };

    const handleUpdate = (path, data) => {
        update(ref(db, path), data)
            .then(() => alert("Güncellendi!"))
            .catch(err => alert("Hata: " + err.message));
    };

    const addProject = () => {
        if (!newProject.title || !newProject.url) return;
        push(ref(db, 'projects'), newProject)
            .then(() => {
                setNewProject({ title: '', url: '', type: 'image', description: '' });
                alert("Eklendi!");
            });
    };

    const deleteProject = (id) => {
        if (window.confirm("Bu görseli/videoyu silmek istediğine emin misin?")) {
            remove(ref(db, `projects/${id}`));
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold">Yükleniyor...</div>;

    if (!user) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 relative overflow-hidden">

                {/* Arka Plan Süsü - Dekoratif bir pati izi veya yuvarlak */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

                <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-sm w-full border border-white/50 relative z-10 group">

                    {/* Geri Dön Butonu */}
                    <button
                        onClick={() => window.location.href = '/'}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-500 hover:text-orange-600 font-bold transition-all group-hover:scale-105"
                    >
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </div>
                        <span>SİTEYE DÖN</span>
                    </button>

                    {/* Logo/İkon Alanı */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-orange-600 p-4 rounded-3xl shadow-lg shadow-orange-200 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v4" /><path d="M14 12h-4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic">
                            Pati <span className="text-orange-600 italic">Admin</span>
                        </h2>
                        <p className="text-zinc-400 text-xs font-bold mt-2 uppercase tracking-widest">Yönetim Paneli Girişi</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group/input">
                            <input
                                type="email"
                                placeholder="E-posta Adresi"
                                className="w-full p-4 pl-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium text-zinc-700"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/input:text-orange-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                        </div>

                        <div className="relative group/input">
                            <input
                                type="password"
                                placeholder="Şifre"
                                className="w-full p-4 pl-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium text-zinc-700"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/input:text-orange-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                        </div>

                        <button className="w-full bg-zinc-900 text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-zinc-200 hover:shadow-orange-200 uppercase tracking-tighter mt-4 flex items-center justify-center gap-2 active:scale-95">
                            GİRİŞ YAP
                        </button>
                    </form>

                    <p className="text-center text-zinc-300 text-[10px] mt-8 font-medium">
                        © 2026 Pati Bakım Admin Sistemi • Ankara
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">Yönetim <span className="text-orange-600">Paneli</span></h1>
                    <button onClick={() => signOut(auth)} className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-700 transition-all">
                        <LogOut size={18} /> Çıkış
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* NEDEN BİZ BÖLÜMÜ */}
                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Save size={20} /></div>
                            <h2 className="text-xl font-bold uppercase italic">Neden Biz Metinleri</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-zinc-400 mb-1 block">Ana Başlık</label>
                                <input className="w-full p-3 border rounded-xl" defaultValue={whyUs.title} onChange={(e) => setWhyUs({ ...whyUs, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-zinc-400 mb-1 block">Açıklama</label>
                                <textarea className="w-full p-3 border rounded-xl h-24" defaultValue={whyUs.description} onChange={(e) => setWhyUs({ ...whyUs, description: e.target.value })} />
                            </div>
                            <button onClick={() => handleUpdate('whyUs', whyUs)} className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-sm w-full hover:bg-orange-700">GÜNCELLE</button>
                        </div>
                    </section>

                    {/* HİZMETLER BÖLÜMÜ */}
                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Save size={20} /></div>
                            <h2 className="text-xl font-bold uppercase italic">Hizmet Başlıkları</h2>
                        </div>
                        <div className="space-y-4">
                            {Object.keys(services).map((key) => (
                                <div key={key}>
                                    <label className="text-[10px] font-black uppercase text-zinc-400 mb-1 block">{key} Başlığı</label>
                                    <input className="w-full p-3 border rounded-xl" defaultValue={services[key]} onChange={(e) => {
                                        const updated = { ...services, [key]: e.target.value };
                                        setServices(updated);
                                    }} />
                                </div>
                            ))}
                            <button onClick={() => handleUpdate('services', services)} className="bg-zinc-900 text-white px-6 py-2 rounded-xl font-bold text-sm w-full hover:bg-zinc-800">HİZMETLERİ KAYDET</button>
                        </div>
                    </section>

                    {/* GALERİ YÖNETİMİ */}
                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 lg:col-span-2">
                        <h2 className="text-2xl font-bold uppercase italic mb-8">Galeri & Portfolyo Yönetimi</h2>

                        {/* Yeni Ekleme Formu */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 p-6 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                            <input placeholder="Başlık" className="p-3 border rounded-xl bg-white" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                            <input placeholder="Video/Resim Linki" className="p-3 border rounded-xl bg-white md:col-span-2" value={newProject.url} onChange={(e) => setNewProject({ ...newProject, url: e.target.value })} />
                            <select className="p-3 border rounded-xl bg-white font-bold" value={newProject.type} onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}>
                                <option value="image">Fotoğraf</option>
                                <option value="video">YouTube / Shorts</option>
                            </select>
                            <button onClick={addProject} className="bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-100">
                                <Plus size={20} /> EKLE
                            </button>
                        </div>

                        {/* Mevcut Liste */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(projects).map(([id, project]) => (
                                <div key={id} className="group relative bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                    <div className="aspect-video bg-zinc-200 rounded-xl mb-3 overflow-hidden">
                                        {project.type === 'video' ? (
                                            <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-600"><Video size={40} /></div>
                                        ) : (
                                            <img src={project.url} className="w-full h-full object-cover" alt="" />
                                        )}
                                    </div>
                                    <h4 className="font-bold text-zinc-800 text-sm truncate">{project.title}</h4>
                                    <button onClick={() => deleteProject(id)} className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Admin;