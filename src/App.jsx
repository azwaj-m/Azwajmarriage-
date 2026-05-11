import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'; // آپ کا رائل مرون اور گولڈن ہوم پیج
import { useUser } from './context/UserContext';

function App() {
  const { i18n } = useTranslation();
  const { userData, loading } = useUser();

  // i18n.dir() کے کریش سے بچنے کے لیے محفوظ متبادل طریقہ
  const currentLanguage = i18n?.language || 'ur';
  const direction = (currentLanguage === 'ur' || currentLanguage === 'ar') ? 'rtl' : 'ltr';

  useEffect(() => {
    // پورے پیج کی ڈائریکشن کو خودکار طریقے سے سیٹ کریں
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, direction]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-right" style={{ direction: direction }}>
      <Router>
        <Routes>
          <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
