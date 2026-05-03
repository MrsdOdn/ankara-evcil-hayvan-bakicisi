import { Dog, Heart, MapPin } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Dog size={64} className="text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Ankara Evcil Hayvan Bakıcısı
        </h1>
        <div className="flex items-center justify-center text-gray-600 mb-6">
          <MapPin size={18} className="mr-1" />
          <span>Ankara, Türkiye</span>
        </div>
        <p className="text-gray-600 mb-8">
          Tüylü dostlarınız için en güvenli ve sevgi dolu bakım burada! 🐾
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center w-full transition-colors">
          <Heart className="mr-2" size={20} />
          Bize Ulaşın
        </button>
      </div>
    </div>
  )
}

export default App;