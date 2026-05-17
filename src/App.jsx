import React, { useState, useMemo, useEffect } from 'react';
import { AuthService } from "./services/AuthService";
import { initialProfiles } from './utils/seedData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';
import ProfileSettings from './components/ProfileSettings';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ProfileManager from './pages/ProfileManager';
import Subscription from './pages/Subscription';
import Verification from './pages/Verification';

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // 🛡️ پاورفل آٹو ڈیٹیکٹر
  useEffect(() => {
    console.log("🔍 DETECTOR: Initializing AZWAJ Core...");
    const unsubscribe = AuthService?.observeAuthState((userData) => {
      setUser(userData);
      setAuthLoading(false);
      console.log(userData ? "✅ DETECTOR: User Authenticated" : "ℹ️ DETECTOR: No Active Session");
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const filteredProfiles = useMemo(() => {
    const list = initialProfiles || [];
    return list.filter(p =>
      p?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p?.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSidebarAction = (view, subTab = null) => {
    if (subTab) setActiveTab(subTab);
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  // 🚨 فیز 1: لوڈنگ ڈیٹیکٹر
  if (authLoading) {
    return (
      <div className="h-screen bg-[#1a0007] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <p className="text-[#D4AF37] mt-4 font-black text-[10px] tracking-widest uppercase">Initializing Core...</p>
      </div>
    );
  }

  // 🚨 فیز 2: آتھ چیک
  if (!user) {
    return <Login onLoginSuccess={(data) => setUser(data)} />;
  }

  const renderContent = () => {
    if (currentView !== 'main') {
      switch(currentView) {
        case 'privacy_settings': return <ProfileSettings onBack={() => setCurrentView('main')} />;
        case 'verification': return <Verification onBack={() => setCurrentView('main')} />;
        case 'premium': return <Subscription onUpgrade={() => setCurrentView('main')} onBack={() => setCurrentView('main')} />;
        default: return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      }
    }

    switch (activeTab) {
      case 'home': return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      case 'discover': return <Discover profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      case 'chat': return <Chat />;
      case 'notifications': return <Notifications setActiveTab={setActiveTab} setCurrentView={setCurrentView} />;
      case 'profile': return <ProfileManager onNavigate={setActiveTab} setCurrentView={setCurrentView} />;
      default: return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
    }
  };

  return (
    /* 🏰 اب پوری ایپ کا مین فریم آپ کی نئی بنائی گئی فرشی امیج (BkG.png) پر لاکڈ ہے */
    <div
      className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/BkG.png')" }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onAction={handleSidebarAction} />

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onStartChat={() => { setActiveTab('chat'); setSelectedProfile(null); }}
        />
      )}

      {/* 🎯 ہیڈر صرف اور صرف ہوم پیج (home) پر لوڈ ہوگا */}
      {currentView === 'main' && activeTab === 'home' && (
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} toggleSidebar={() => setIsSidebarOpen(true)} />
      )}

      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
