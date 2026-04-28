import React, { useState, useEffect } from 'react';
import { initialProfiles } from './utils/seedData';
import Discover from './pages/Discover';
import ProfileSettings from './components/ProfileSettings';
import ProfileDetailModal from './components/ProfileDetailModal';
import { Bell, Menu, Compass, Heart, MessageCircle, User, Search, SlidersHorizontal, Settings } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false); // Seed data loads instantly

  const navItems = [
    { key: 'discover', label: 'Discover', icon: Compass },
    { key: 'matches', label: 'Matches', icon: Heart },
    { key: 'messages', label: 'Messages', icon: MessageCircle },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden font-sans pb-24">
      {/* Premium Header Background Area */}
      <div className="absolute top-0 left-0 right-0 h-[260px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[50px] shadow-2xl z-0"></div>

      <header className="relative z-10 p-6 flex items-center justify-between">
        <Menu className="text-white" />
        <div className="flex flex-col items-center">
           <img src="/images/Logo.png" alt="Azwaj" className="h-16 drop-shadow-xl" />
           <h1 className="text-4xl font-serif font-bold text-[#D4AF37] -mt-2 drop-shadow-md">Azwaj</h1>
        </div>
        <div className="relative">
          <Bell className="text-white" />
          <span className="absolute -top-1 -right-1 bg-yellow-500 w-2.5 h-2.5 rounded-full border-2 border-[#4A0E0E]"></span>
        </div>
      </header>

      <div className="relative z-10 px-6 mt-2 mb-10">
        <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 shadow-lg group focus-within:bg-white/20 transition-all">
          <Search size={20} className="text-yellow-500" />
          <input type="text" placeholder="Search by name, city or profession..." className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm" />
          <SlidersHorizontal size={20} className="text-yellow-500 cursor-pointer" />
        </div>
      </div>

      <main className="relative z-10">
        {activeTab === 'discover' && <Discover profiles={profiles} onProfileClick={setSelectedProfile} />}
        {activeTab === 'profile' && <ProfileSettings />}
        {(activeTab === 'matches' || activeTab === 'messages') && (
            <div className="text-center p-10 text-[#4A0E0E]/60">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} پیج جلد آ رہا ہے...</div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t flex justify-around p-4 z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
                <React.Fragment key={item.key}>
                    {index === 2 && ( // Center Heart Button
                        <button className="bg-[#4A0E0E] p-3.5 rounded-full -mt-10 border-4 border-[#FDF5F5] text-[#D4AF37] shadow-xl active:scale-90 transition-transform">
                          <Heart fill="currentColor" size={28} />
                        </button>
                    )}
                    <button onClick={() => setActiveTab(item.key)} className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#4A0E0E]' : 'text-gray-400'} group`}>
                      <Icon className={isActive ? '' : 'group-hover:text-[#4A0E0E]/70'}/>
                      <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                </React.Fragment>
            )
        })}
      </nav>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </div>
  );
};

export default App;
