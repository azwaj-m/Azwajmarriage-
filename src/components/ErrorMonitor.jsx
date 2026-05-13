import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, Cpu, Trash2, X } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorLog: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorLog: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🔴 Captured Crash:", error, errorInfo);
    // لوکل سیشن میں ایرر محفوظ کریں بغیر اسٹوریج ریم پر بوجھ ڈالے
    window.__lastCrashLog = error.toString() + "\n" + errorInfo.componentStack;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#3D0A0A] text-[#F5E6D3] flex flex-col items-center justify-center p-6 text-center" dir="rtl">
          <div className="bg-[#4A0E0E] p-6 rounded-[35px] border-2 border-red-600/50 max-w-sm shadow-2xl">
            <ShieldAlert size={48} className="text-red-500 mx-auto mb-4 animate-bounce" />
            <h1 className="text-lg font-black text-white uppercase tracking-wider">کوڈ میں ایرر پکڑا گیا ہے!</h1>
            <p className="text-[10px] text-gray-400 mt-2 font-bold leading-relaxed">ری ایکٹ انجن کو سفید ہونے سے بچا لیا گیا ہے۔ نیچے موجود اصل خرابی دیکھیں:</p>
            <div className="bg-black/40 text-left p-3 rounded-xl mt-4 text-[9px] font-mono text-red-400 overflow-x-auto whitespace-pre-wrap max-h-40 border border-red-900/30">
              {this.state.errorLog}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-5 w-full bg-[#D4AF37] text-[#3D0A0A] py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            >
              <RefreshCw size={14} /> پیج دوبارہ ری لوڈ کریں
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ErrorMonitorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [memoryInfo, setMemoryInfo] = useState('N/A');

  useEffect(() => {
    // ۱۔ براؤزر لیول کے تمام چھپے ہوئے ایررز کو پکڑنا
    const handleError = (event) => {
      const msg = `${event.message} (${event.filename}:${event.lineno})`;
      setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    window.addEventListener('error', handleError);

    // ۲۔ بغیر ریم بوجھ کے لوکل پرفارمنس میموری چیک
    if (performance && performance.memory) {
      const usedMem = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      setMemoryInfo(`${usedMem} MB`);
    }

    return () => window.removeEventListener('error', handleError);
  }, []);

  // کریش لاگز صاف کرنا
  const clearLogs = () => {
    setLogs([]);
    window.__lastCrashLog = null;
  };

  return (
    <>
      {/* 🛠️ خفیہ لائیو مانیٹر فلوٹنگ نوچ بٹن */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-14 left-3 z-[9999] bg-[#4A0E0E] text-[#D4AF37] p-2 rounded-xl border border-[#D4AF37]/40 shadow-xl flex items-center gap-1 text-[9px] font-black active:scale-90 transition"
      >
        <Cpu size={12} className={logs.length > 0 || window.__lastCrashLog ? "text-red-500 animate-spin" : "text-green-500"} />
        <span>لاگ ڈیش بورڈ</span>
        {logs.length > 0 && <span className="w-2 h-2 bg-red-600 rounded-full animate-ping absolute top-0 right-0"></span>}
      </button>

      {/* 🎪 مانیٹر پینل اوورلے */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99999] flex items-end justify-center animate-fadeIn" dir="rtl">
          <div className="w-full max-w-md bg-[#FFFDF9] rounded-t-[35px] border-t-2 border-[#D4AF37] p-5 text-[#4A0E0E] shadow-2xl max-h-[70vh] flex flex-col justify-between">
            
            {/* ہیڈر */}
            <div className="flex justify-between items-center border-b pb-3 border-[#4A0E0E]/10">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-[#D4AF37]" />
                <h3 className="font-black text-xs uppercase tracking-wider">الٹرا لائٹ مانیٹرنگ سسٹم</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-200 text-gray-500"><X size={16} /></button>
            </div>

            {/* ریسورس میٹر */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-[#F5E6D3] p-2.5 rounded-xl text-center border border-[#D4AF37]/20">
                <span className="text-[8px] font-bold block text-gray-500">براؤزر ایکٹو ریم رن</span>
                <span className="text-xs font-black text-[#4A0E0E]">{memoryInfo}</span>
              </div>
              <div className="bg-[#F5E6D3] p-2.5 rounded-xl text-center border border-[#D4AF37]/20">
                <span className="text-[8px] font-bold block text-gray-500">اسٹوریج رائٹ موڈ</span>
                <span className="text-xs font-black text-green-700">0% لوکل ہوسٹ</span>
              </div>
            </div>

            {/* لاگ ونڈو */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#3D0A0A] text-[#F5E6D3] p-3 rounded-2xl font-mono text-[9px] text-left">
              <span className="text-[#D4AF37] font-black block text-right mb-2 text-[8px]">🚨 لائیو جاوا اسکرپٹ کیچ لاگز:</span>
              
              {window.__lastCrashLog && (
                <div className="text-red-400 mb-2 p-1.5 border-b border-red-900/40 whitespace-pre-wrap">
                  💥 ہاٹ کریش: {window.__lastCrashLog}
                </div>
              )}

              {logs.length === 0 && !window.__lastCrashLog ? (
                <span className="text-green-400 block text-center py-6 font-sans text-[10px]">کوڈ بالکل پرفیکٹ ہے، کوئی پوشیدہ ایرر نہیں ہے! ✅</span>
              ) : (
                logs.map((log, index) => <div key={index} className="text-yellow-400 mb-1 border-b border-white/5 pb-1">⚠️ {log}</div>)
              )}
            </div>

            {/* ایکشن بار */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={clearLogs}
                className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 active:scale-95 transition"
              >
                <Trash2 size={12} /> کلیئر لاگز
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 shadow-md active:scale-95 transition"
              >
                <RefreshCw size={12} /> فورس ریفریش
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
