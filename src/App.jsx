import React, { useState, useMemo, useEffect } from 'react';
import { initialProfiles } from './utils/seedData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';

// پیجز کی امپورٹ
import Login from './pages/Login';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile'; 
import Subscription from './pages/Subscription';
import PrivacySettings from './pages/PrivacySettings';
import Verification from './pages/Verification';

const App = () => {
  const [user, setUser] = useState({ uid: 'u101', displayName: 'شاہ زیب خان' });
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  // 📡 سائیڈ بار کے کسٹم ایونٹس کو سننے کی لائیو لاجک
  useEffect(() => {
    const handleSwitchTab = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
        setCurrentView('main');
      }
    };

    const handleOpenPrivacy = () => {
      setCurrentView('privacy_settings');
    };

    const handleOpenBlocked = () => {
      setCurrentView('blocked');
    };

    window.addEventListener('switch-tab', handleSwitchTab);
    window.addEventListener('open-privacy-settings', handleOpenPrivacy);
    window.addEventListener('open-blocked-list', handleOpenBlocked);

    return () => {
      window.removeEventListener('switch-tab', handleSwitchTab);
      window.removeEventListener('open-privacy-settings', handleOpenPrivacy);
      window.removeEventListener('open-blocked-list', handleOpenBlocked);
    };
  }, []);

  const filteredProfiles = useMemo(() => {
    const profilesList = initialProfiles || [];
    return profilesList.filter(p => {
      if (!p || !p.fullName) return false;
      const query = searchQuery.toLowerCase();
      return (
        p.fullName.toLowerCase().includes(query) ||
        (p.city && p.city.toLowerCase().includes(query)) ||
        (p.profession && p.profession.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const handleSidebarAction = (view, subTab = null) => {
    if (subTab) {
      setActiveTab(subTab);
    }
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  const renderContent = () => {
    if (currentView === 'main') {
      switch (activeTab) {
        case 'home':
          return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
        case 'discover':
          return <Discover profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
        case 'chat':
          return <Chat />;
        case 'notifications':
          return <Notifications setActiveTab={setActiveTab} setCurrentView={setCurrentView} />;
        case 'profile':
          // اگر ProfileManager غائب ہے تو ہم براہِ راست تفصیلی Profile.jsx پیج لوڈ کریں گے تاکہ کریش نہ ہو
          return <Profile onBack={() => setActiveTab('home')} />;
        default:
          return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      }
    }

    if (currentView === 'privacy_settings') {
      return <PrivacySettings onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'verification') {
      return <Verification onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'blocked') {
      return (
        <div className="w-full min-h-screen bg-[#FFFDF9] p-10 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4 border border-red-100">🚫</div>
           <h2 className="text-[#4A0E0E] font-black mb-2 text-base">بلاک شدہ لسٹ مینیجر</h2>
           <p className="text-gray-500 text-xs mb-6 font-bold">آپ نے فی الحال کسی بھی صارف کو بلاک نہیں کیا ہے۔</p>
           <button type="button" onClick={() => setCurrentView('main')} className="bg-[#4A0E0E] text-[#D4AF37] px-6 py-2.5 rounded-xl font-black text-xs shadow-md">واپس جائیں</button>
        </div>
      );
    }

    if (currentView === 'premium') {
      return <Subscription onUpgrade={() => { setIsPremium(true); setCurrentView('main'); }} />;
    }

    if (currentView === 'help') {
      return (
        <div className="w-full min-h-screen bg-[#FFFDF9] p-10 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-[#F5E6D3]/40 rounded-2xl flex items-center justify-center text-[#4A0E0E] mb-4 border border-[#D4AF37]/20">❓</div>
           <h2 className="text-[#4A0E0E] font-black mb-2 text-base">مدد اور آفیشل سپورٹ</h2>
           <p className="text-gray-500 text-xs mb-6 font-bold">رشتوں کی تصدیق یا شکایات کے لیے ای میل کریں:</p>
           <a href="mailto:support@azwaj.com" className="bg-[#4A0E0E] text-[#D4AF37] px-6 py-3 rounded-xl font-black text-xs shadow-md">support@azwaj.com</a>
           <button type="button" onClick={() => setCurrentView('main')} className="text-[#4A0E0E] font-black text-xs underline mt-6">واپس جائیں</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FFFDF9] flex flex-col overflow-hidden relative shadow-2xl">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAction={handleSidebarAction}
      />

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onStartChat={() => { setActiveTab('chat'); setCurrentView('main'); setSelectedProfile(null); }}
        />
      )}

      {currentView === 'main' && activeTab !== 'chat' && (
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSidebar={() => setIsSidebarOpen(true)}
          onNotificationClick={() => {
            setCurrentView('main');
            setActiveTab('notifications');
          }}
        />
      )}

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {currentView === 'main' && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default App;
