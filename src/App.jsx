import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthService } from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // 72 گھنٹے پرانا کلاسک لوکل سیشن چیک فلو
    const savedSession = AuthService.checkSessionValidity();
    if (savedSession) {
      setCurrentUser(savedSession);
    }
    setInitializing(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setCurrentUser(null);
  };

  if (initializing) {
    return (
      <div className="w-full min-h-screen bg-[#3D0A0A] flex flex-col justify-center items-center" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
        <p className="text-white/70 text-sm font-bold">لوڈ ہو رہا ہے...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3D0A0A]">
      {currentUser ? (
        <Home user={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
