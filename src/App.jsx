import React, { useState, useEffect } from 'react';
import { useUser } from './context/UserContext';
import { SearchProvider, useSearch } from './context/SearchContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';
import EditProfileForm from './components/EditProfileForm';
import NotificationToast from './components/NotificationToast';
import ProfileSettings from './components/ProfileSettings';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ProfileManager from './pages/ProfileManager';
import Subscription from './pages/Subscription';
import Verification from './pages/Verification';
import HelpSupport from './pages/HelpSupport';
import BlockedProfiles from './pages/BlockedProfiles';

// اندرونی فلو اور رینڈرنگ کنٹرول کرنے والا مین ایپ کمپوننٹ
const AppContent = () => {
  const userContext = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // باٹم پٹی کے ایکٹیو بٹنز کے لیے نوٹیفیکیشن فلٹر کی اسٹیٹ
  const [notificationFilter, setNotificationFilter] = useState('all');

  // لائیو نوٹیفیکیشن ٹوسٹ کی اسٹیٹ
  const [activeNotification, setActiveNotification] = useState(null);

  // عالمی سرچ انجن سے نتائج اور اسٹیٹ حاصل کرنا
  const { searchQuery, setSearchQuery, filteredResults } = useSearch();

  useEffect(() => {
    console.log("--- APP INITIALIZED ---");
    console.log("Context Data:", userContext);

    const welcomeTimer = setTimeout(() => {
      setActiveNotification({
        type: 'chat',
        title: 'عائشہ خان',
        message: 'السلام علیکم! کیا آپ بات کرنے کے لیے دستیاب ہیں؟'
      });
    }, 4000);

    return () => clearTimeout(welcomeTimer);
  }, [userContext]);

  if (!userContext) {
    return (
      <div className="p-10 text-red-600 bg-red-100 h-screen">
        <h1 className="font-bold">بیماری مل گئی!</h1>
        <p>UserContext فراہم نہیں کیا گیا۔ چیک کریں کہ کیا main.jsx میں UserProvider موجود ہے؟</p>
      </div>
    );
  }

  const { loading, userData } = userContext;

  // تصدیق کا قانون لاگو کرنے کا مرکزی فنکشن
  const requireVerification = (actionCallback) => {
    const status = userData?.verificationStatus;
    if (status === 'verified') {
      actionCallback();
    } else {
      alert("رابطہ قائم کرنے یا تفصیلات دیکھنے سے پہلے شناختی تصدیق (CNIC/Selfie) لازمی ہے تاکہ فیک یوزرز کو روکا جا سکے۔");
      setCurrentView('verification');
    }
  };

  const handleTabChange = (tab) => {
    console.log("Tab Changed to:", tab);
    setActiveTab(tab);
    setCurrentView('main');
  };

  const renderContent = () => {
    try {
      if (currentView === 'main') {
        switch (activeTab) {
          case 'home':
            return (
              <Home
                profiles={filteredResults}
                setSelectedProfile={(profile) => {
                  requireVerification(() => setSelectedProfile(profile));
                }}
              />
            );
          case 'discover':
            return (
              <Discover
                profiles={filteredResults}
                setSelectedProfile={(profile) => {
                  requireVerification(() => setSelectedProfile(profile));
                }}
              />
            );
          case 'chat':
            return <Chat />;
          case 'notifications':
            return (
              <Notifications 
                setActiveTab={setActiveTab} 
                setCurrentView={setCurrentView} 
                activeFilter={notificationFilter}
                setNotificationFilter={setNotificationFilter}
              />
            );
          case 'profile':
            return <ProfileManager />;
          default:
            return <Home profiles={filteredResults} setSelectedProfile={setSelectedProfile} />;
        }
      }

      // سائیڈ بار ویوز کا کنٹرول
      if (currentView === 'blocked') return <BlockedProfiles onBack={() => setCurrentView('main')} />;
      if (currentView === 'premium') return <Subscription />;
      if (currentView === 'help') return <HelpSupport onBack={() => setCurrentView('main')} />;
      if (currentView === 'privacy_settings') return <ProfileSettings onBack={() => setCurrentView('main')} />;
      if (currentView === 'verification') return <Verification onBack={() => setCurrentView('main')} />;
    } catch (err) {
      return <div className="p-5 text-red-500 font-mono text-xs">Render Error: {err.message}</div>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 font-bold text-gray-700">ڈیٹا لوڈ ہو رہا ہے... (اگر یہ پھنس جائے تو فائر بیس کیز چیک کریں)</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FDF5F5] flex flex-col overflow-hidden relative shadow-2xl">

      {/* پش نوٹیفیکیشن ٹوسٹ پاپ اپ */}
      {activeNotification && (
        <NotificationToast
          notification={activeNotification}
          onClose={() => setActiveNotification(null)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAction={(v, t) => {
          setCurrentView(v);
          if(t) setActiveTab(t);
          setIsSidebarOpen(false);
        }}
        onEditProfile={() => setCurrentView('edit_profile')}
      />

      {currentView === 'edit_profile' ? (
        <EditProfileForm onSave={() => setCurrentView('main')} onCancel={() => setCurrentView('main')} />
      ) : (
        <>
          {activeTab !== 'chat' && activeTab !== 'profile' && currentView === 'main' && (
            <Header
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              toggleSidebar={() => setIsSidebarOpen(true)}
              onNotificationClick={() => setActiveTab('notifications')}
            />
          )}

          <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
            {renderContent()}
          </main>

          {/* باٹم پٹی سے کلکس کو نوٹیفیکیشن پیج پر بھیجنے کے لیے فنکشنز پاس کیے گئے ہیں */}
          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            setNotificationFilter={setNotificationFilter}
          />
        </>
      )}

      {/* اگر پروفائل منتخب ہو چکی ہے تو ڈیٹیل ماڈل دکھائیں */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onStartChat={(p) => {
            setActiveTab("chat");
            setSelectedProfile(null);
          }}
        />
      )}
    </div>
  );
};

// اصلی ایکسپورٹ جس پر سرچ پرووائیڈر لپیٹا گیا ہے
const App = () => {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
};

export default App;
