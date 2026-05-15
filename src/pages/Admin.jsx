import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, onValue, update, push, remove } from "firebase/database";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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
    const [whyUs, setWhyUs] = useState({});
    const [regions, setRegions] = useState([]);
    const [projects, setProjects] = useState([]); // Başlangıç değeri dizi

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
                setServices(data.services || {});
                setWhyUs(data.whyUs || {});

                // Harita verisi yolu kontrolü
                const mapData = data.mapSection?.regions || data.regions || [];
                setRegions(mapData);

                // Projeleri diziye çevirerek state'e aktar
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
        signInWithEmailAndPassword(auth, email, password).catch(() => alert("Giriş Başarısız!"));
    };

    const handleUpdate = (path, updateData) => {
        const updateRef = path === "/" ? ref(db) : ref(db, path);
        update(updateRef, updateData)
            .then(() => alert("Başarıyla Güncellendi!"))
            .catch(() => alert("Hata oluştu."));
    };

    const addProject = (projectData) => {
        push(ref(db, 'projects'), projectData);
    };

    const deleteProject = async (id) => {
        if (!id) return;
        if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
            try {
                await remove(ref(db, `projects/${id}`));
                console.log("Silindi:", id);
            } catch (error) {
                alert("Silme hatası!");
            }
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-black text-orange-600">Yükleniyor...</div>;
    if (!user) return <LoginForm handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} />;

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-12 font-sans text-zinc-900">
            <div className="max-w-7xl mx-auto space-y-12">
                <AdminDashboard onLogout={() => signOut(auth)} />
                <GeneralSettingsEditor settings={generalSettings} setSettings={setGeneralSettings} onSave={() => handleUpdate("/", generalSettings)} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <WhyUsEditor data={whyUs} setWhyUs={setWhyUs} onSave={() => handleUpdate('whyUs', whyUs)} />
                    <ServicesEditor services={services} setServices={setServices} onSave={() => handleUpdate('services', services)} />
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