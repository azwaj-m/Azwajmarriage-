import React, { useState, useMemo } from 'react';
import { initialProfiles } from './utils/seedData';
import Discover from './pages/Discover';
import ProfileSettings from './components/ProfileSettings';
import ProfileDetailModal from './components/ProfileDetailModal';
import { Bell, Menu, Compass, Heart, MessageCircle, User, Search, SlidersHorizontal } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // سرچ انجن کی منطق
  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => 
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, profiles]);

  const handleLike = (id) => {
    console.log("Liked Profile ID:", id);
    alert("پسندیدہ فہرست میں شامل کر دیا گیا!");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden font-sans pb-24">
      <div className="absolute top-0 left-0 right-0 h-[260px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[50px] shadow-2xl z-0"></div>
      
      <header className="relative z-10 p-6 flex items-center justify-between">
        <Menu className="text-white cursor-pointer" />
        <div className="flex flex-col items-center">
           <h1 className="text-4xl font-serif font-bold text-[#D4AF37] drop-shadow-md">Azwaj</h1>
        </div>
        <Bell className="text-white cursor-pointer" />
      </header>

      <div className="relative z-10 px-6 mt-2 mb-10">
        <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 shadow-lg focus-within:bg-white/20 transition-all">
          <Search size={20} className="text-yellow-500" />
          <input 
            type="text" 
            placeholder="تلاش کریں (نام، شہر یا پیشہ)..." 
            className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm text-right"
            dir="rtl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SlidersHorizontal size={20} className="text-yellow-500 cursor-pointer" />
        </div>
      </div>

      <main className="relative z-10">
        {activeTab === 'discover' && (
          <Discover 
            profiles={filteredProfiles} 
            onProfileClick={setSelectedProfile} 
            onLike={handleLike}
          />
        )}
        {activeTab === 'profile' && <ProfileSettings />}
        {(activeTab === 'matches' || activeTab === 'messages') && (
          <div className="text-center p-10 text-[#4A0E0E]/60">یہ سیکشن جلد فعال ہو جائے گا</div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t flex justify-around p-4 z-50 rounded-t-3xl shadow-xl">
        {[
          { key: 'discover', label: 'ڈسکور', icon: Compass },
          { key: 'matches', label: 'میچز', icon: Heart },
          { key: 'messages', label: 'پیغامات', icon: MessageCircle },
          { key: 'profile', label: 'پروفائل', icon: User },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => setActiveTab(item.key)} className={`flex flex-col items-center gap-1 ${activeTab === item.key ? 'text-[#4A0E0E]' : 'text-gray-400'}`}>
              <Icon size={24} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {selectedProfile && (
        <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </div>
  );
};

export default App;
