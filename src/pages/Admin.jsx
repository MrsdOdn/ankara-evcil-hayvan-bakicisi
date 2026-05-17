import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, onValue, update, push, remove } from "firebase/database";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { CheckCircle2, AlertCircle, X } from 'lucide-react'; 

import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import GeneralSettingsEditor from '../components/admin/GeneralSettingsEditor';
import WhyUsEditor from '../components/admin/WhyUsEditor';
import ServicesEditor from '../components/admin/ServicesEditor';
import GalleryManager from '../components/admin/GalleryManager';
import MapEditor from '../components/admin/MapEditor';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const [generalSettings, setGeneralSettings] = useState({
        telefon: '', email: '', adres: '', instagram: '', youtube: '', facebook: '', whatsapp: ''
    });
    const [services, setServices] = useState({});
    const [whyUs, setWhyUs] = useState({}); // Esnek Neden Biz state'i
    const [regions, setRegions] = useState([]);
    const [projects, setProjects] = useState([]);

    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        const dbRef = ref(db);
        const unsubscribeDb = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGeneralSettings({
                    telefon: data.telefon || '',
                    email: data.email || '',
                    adres: data.adres || '',
                    instagram: data.instagram || '',
                    youtube: data.youtube || '',
                    facebook: data.facebook || '',
                    whatsapp: data.whatsapp || ''
                });

                // Services Okuma Alanı
                const rawHizmetListesi = data.hizmetListesi || {};
                const parsedHizmetListesi = {};

                Object.keys(rawHizmetListesi).forEach((key) => {
                    const card = rawHizmetListesi[key];
                    let fallbackColor = 'bg-orange-500';
                    const titleLower = (card.title || '').toLowerCase();
                    if (titleLower.includes('kuaför')) fallbackColor = 'bg-purple-500';
                    else if (titleLower.includes('bakım')) fallbackColor = 'bg-blue-500';
                    else if (titleLower.includes('sosyal')) fallbackColor = 'bg-green-500';

                    parsedHizmetListesi[key] = {
                        title: card.title || '',
                        description: card.description || '',
                        color: card.color || fallbackColor,
                        iconName: card.iconName || 'Sparkles'
                    };
                });

                setServices({
                    hizmetlerUstBaslik: data.hizmetlerUstBaslik || '',
                    hizmetlerAnaBaslik: data.hizmetlerAnaBaslik || '',
                    hizmetListesi: parsedHizmetListesi
                });

                // --- YENİ ESNEK NEDEN BİZ OKUMA ALANI ---
                setWhyUs({
                    whyUsUstBaslik: data.whyUsUstBaslik || '',
                    whyUsAnaBaslik: data.whyUsAnaBaslik || '',
                    whyUsTuruncuBaslik: data.whyUsTuruncuBaslik || '',
                    whyUsAciklama: data.whyUsAciklama || '',
                    whyUsIstatistikOran: data.whyUsIstatistikOran || '',
                    whyUsIstatistikMetin: data.whyUsIstatistikMetin || '',
                    kartListesi: data.kartListesi || {} // Esnek kart nesnesi
                });

                const mapData = data.mapSection?.regions || data.regions || [];
                setRegions(mapData);

                if (data.projects) {
                    const projectsList = Object.keys(data.projects).map(key => ({
                        id: key,
                        ...data.projects[key]
                    }));
                    setProjects(projectsList);
                } else {
                    setProjects([]);
                }
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeDb();
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => showToast("Yönetici paneline başarıyla giriş yapıldı!", "success"))
            .catch(() => showToast("Giriş başarısız! Bilgilerinizi kontrol edin.", "error"));
    };

    const handleUpdate = (path, updateData) => {
        const updateRef = path === "/" ? ref(db) : ref(db, path);
        update(updateRef, updateData)
            .then(() => {
                showToast("Değişiklikler başarıyla veritabanına kaydedildi!", "success");
            })
            .catch(() => {
                showToast("Güncelleme sırasında bir hata oluştu.", "error");
            });
    };

    const addProject = (projectData) => {
        push(ref(db, 'projects'), projectData)
            .then(() => showToast("Yeni içerik galeriye eklendi!", "success"))
            .catch(() => showToast("İçerik eklenirken hata oluştu.", "error"));
    };

    const deleteProject = async (id) => {
        if (!id) return;
        if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
            try {
                await remove(ref(db, `projects/${id}`));
                showToast("İçerik başarıyla silindi.", "success");
            } catch (error) {
                showToast("Silme işlemi başarısız oldu.", "error");
            }
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-black text-orange-600">Yükleniyor...</div>;
    if (!user) return <LoginForm handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} />;

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-12 font-sans text-zinc-900 relative">

            {/* TOAST BİLDİRİM BİLEŞENİ */}
            {toast.show && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border transition-all duration-300 animate-bounce-short ${
                    toast.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                    {toast.type === 'success' ? <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={20} /> : <AlertCircle className="text-rose-600 flex-shrink-0" size={20} />}
                    <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
                    <button
                        onClick={() => setToast(prev => ({ ...prev, show: false }))}
                        className="ml-2 p-1 rounded-lg hover:bg-black/5 text-zinc-400 hover:text-zinc-700 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-12">
                <AdminDashboard onLogout={() => signOut(auth)} />
                <GeneralSettingsEditor settings={generalSettings} setSettings={setGeneralSettings} onSave={() => handleUpdate("/", generalSettings)} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <ServicesEditor
                        services={services}
                        setServices={setServices}
                        onSave={(guncelVeri) => handleUpdate("/", guncelVeri)}
                    />
                    {/* DÜZELTİLEN YENİ ESNEK WHYUS ÇAĞRISI */}
                    <WhyUsEditor 
                        data={whyUs} 
                        setWhyUs={setWhyUs} 
                        onSave={(guncelWhyUs) => handleUpdate("/", guncelWhyUs)} 
                    />
                </div>

                <MapEditor
                    regions={regions}
                    setRegions={setRegions}
                    onSave={() => handleUpdate('mapSection', { regions: regions })}
                />
                <GalleryManager projects={projects} onAdd={addProject} onDelete={deleteProject} />
            </div>
        </div>
    );
};
export default Admin;