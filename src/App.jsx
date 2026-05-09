import React, { useState, useEffect } from 'react';
import { useUser } from './context/UserContext';
import { SearchProvider, useSearch } from './context/SearchContext';
import { AuthService } from './services/AuthService';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';
import EditProfileForm from './components/EditProfileForm';
import NotificationToast from './components/NotificationToast';
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
import HelpSupport from './pages/HelpSupport';
import BlockedProfiles from './pages/BlockedProfiles';

const AppContent = () => {
  const userContext = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [activeNotification, setActiveNotification] = useState(null);

  const { searchQuery, setSearchQuery, filteredResults } = useSearch();

  useEffect(() => {
    const activeSession = AuthService.checkSessionValidity();
    if (activeSession) {
      setIsAuthenticated(true);
      setCurrentUser(activeSession);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setActiveTab('home');
    setCurrentView('main');
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    console.log("--- APP INITIALIZED ---");
    if (userContext) {
      const welcomeTimer = setTimeout(() => {
        setActiveNotification({
          type: 'chat',
          title: 'عائشہ خان',
          message: 'السلام علیکم! کیا آپ بات کرنے کے لیے دستیاب ہیں؟'
        });
      }, 4000);
      return () => clearTimeout(welcomeTimer);
    }
  }, [userContext]);

  if (!userContext) {
    return (
      <div className="p-10 text-red-600 bg-red-100 h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold">سسٹم لوڈ نہیں ہو سکا!</h1>
        <p>UserContext فراہم نہیں کیا گیا۔</p>
      </div>
    );
  }

  const { loading, userData } = userContext;

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const requireVerification = (actionCallback) => {
    if (loading) return;
    const status = userData?.verificationStatus || 'unverified';
    if (status === 'verified') {
      actionCallback();
    } else {
      alert("رابطہ قائم کرنے یا تفصیلات دیکھنے سے پہلے شناختی تصدیق (CNIC/Selfie) لازمی ہے۔");
      setCurrentView('verification');
    }
  };

  const handleTabChange = (tab) => {
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
                setSelectedProfile={(profile) => {
                  requireVerification(() => setSelectedProfile(profile));
                }}
              />
            );
          case 'discover':
            return (
              <Discover
                profiles={filteredResults || []}
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
            return <ProfileManager onLogout={handleLogout} />;
          default:
            return (
              <Home 
                setSelectedProfile={(profile) => {
                  requireVerification(() => setSelectedProfile(profile));
                }} 
              />
            );
        }
      }

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
        <p className="mt-4 font-bold text-gray-700">ڈیٹا لوڈ ہو رہا ہے...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FDF5F5] flex flex-col overflow-hidden relative shadow-2xl">
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
        onLogout={handleLogout}
      />

      {currentView === 'edit_profile' ? (
        <EditProfileForm onSave={() => setCurrentView('main')} onCancel={() => setCurrentView('main')} />
      ) : (
        <>
          {activeTab !== 'chat' && activeTab !== 'profile' && currentView === 'main' && (
            <Header
              toggleSidebar={() => setIsSidebarOpen(true)}
              onNotificationClick={() => setActiveTab('notifications')}
            />
          )}

          <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
            {renderContent()}
          </main>

          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            setNotificationFilter={setNotificationFilter}
          />
        </>
      )}

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

const App = () => {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
};

export default App;
