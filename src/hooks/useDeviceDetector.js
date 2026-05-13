import { useState, useEffect } from 'react';

export const useDeviceDetector = () => {
  const [envInfo, setEnvInfo] = useState({
    isTermuxHost: false,
    isMobileBrowser: true,
    connectionStatus: 'offline-safe',
    performanceMode: 'ultra-low-ram'
  });

  useEffect(() => {
    // ۱۔ زیرو ڈیٹا چیک: بغیر کسی نیٹ ورک کال کے لوکل ہوسٹ آئی پی اور پورٹ اسکیننگ
    const currentHost = window.location.hostname;
    const currentPort = window.location.port;
    
    // ٹرمکس عام طور پر 127.0.0.1، localhost یا لوکل نیٹ ورک IP (جیسے 10.x.x.x) پر 5173 پورٹ کے ساتھ چلتا ہے
    const checkTermux = 
      currentHost === 'localhost' || 
      currentHost === '127.0.0.1' || 
      currentHost.startsWith('10.') || 
      currentHost.startsWith('192.168.');

    // ۲۔ زیرو ریم اور زیرو اسٹوریج چیک (براؤزر کے نیویگیٹر سے براہ راست بغیر میموری لوڈ کے)
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const checkMobile = /android|iphone|ipad|ipod/i.test(userAgent);

    setEnvInfo({
      isTermuxHost: checkTermux,
      isMobileBrowser: checkMobile,
      connectionStatus: navigator.onLine ? 'connected-safe' : 'offline-safe',
      performanceMode: 'ultra-low-ram'
    });

    // ۳۔ نیٹ ورک ڈیٹا بچانے کے لیے لائیو مانیٹر (بغیر انٹرنیٹ خرچ کیے لوکل اسٹیٹس)
    const goOnline = () => setEnvInfo(prev => ({ ...prev, connectionStatus: 'connected-safe' }));
    const goOffline = () => setEnvInfo(prev => ({ ...prev, connectionStatus: 'offline-safe' }));

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return envInfo;
};
