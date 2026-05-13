import React from 'react';
import { ShieldAlert, RotateCcw, Radio, WifiOff, Code } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: '',
      errorType: 'UNKNOWN_GLITCH'
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    const message = error?.message || String(error);
    let type = 'RUNTIME_ERROR';

    if (message.includes('syntax') || message.includes('Unexpected token')) {
      type = 'SYNTAX_CRASH (کوڈ کی بناوٹ غلط ہے)';
    } else if (message.includes('is not a function') || message.includes('properties of null')) {
      type = 'TYPE_OR_PROP_MISSING (ڈیٹا امپورٹ یا اسٹیٹ کا مسئلہ)';
    } else if (message.includes('Failed to fetch') || message.includes('Network')) {
      type = 'NETWORK_FAILURE (سرور یا کنکشن کا مسئلہ)';
    }

    this.setState({
      errorInfo: errorInfo?.componentStack || '',
      errorType: type
    });
    
    console.error("[Super Detector Captured]:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#0B0F19] text-gray-100 flex flex-col justify-between p-6 z-[9999999] font-sans selection:bg-red-500" dir="rtl">
          
          {/* ٹاپ بار */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4" dir="ltr">
            <span className="flex items-center gap-2 text-xs font-mono bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
              <Radio size={12} className="animate-pulse" /> SUPER DETECTOR v1.0
            </span>
            <h2 className="text-[#D4AF37] text-xs font-black tracking-widest uppercase">Azwaj Core Protection</h2>
          </div>

          {/* مین الرٹ کنٹینٹ */}
          <div className="my-auto max-w-md mx-auto w-full space-y-4 text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/5 animate-bounce">
              <ShieldAlert size={32} />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-xl font-black text-white">سفید اسکرین (Crash) بلاک کر دی گئی!</h1>
              <p className="text-xs text-gray-400 leading-relaxed px-4">
                ری ایکٹ انجن آپ کا صفحہ رینڈر نہیں کر پا رہا تھا، لیکن سپر ڈیٹیکٹر نے ایپ کو مکمل لاک ہونے سے بچا لیا۔
              </p>
            </div>

            {/* بگ کی تفصیل */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-right space-y-3">
              <div className="flex items-center justify-between flex-row-reverse">
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-md">
                  {this.state.errorType}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">CRITICAL</span>
              </div>
              
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 overflow-x-auto text-left" dir="ltr">
                <p className="text-xs font-mono text-red-400 font-bold whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </p>
              </div>

              {/* مددگار ٹپ */}
              <p className="text-[11px] text-amber-200/90 font-medium bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                💡 <strong>تجزیہ:</strong> جب آپ نے بٹن دبایا تو اس پیج کے کوڈ میں کوئی ایسا ڈیٹا یا ویری ایبل مانگا گیا جو پیچھے سے ملا ہی نہیں۔ برائے مہربانی اس پیج کی امپورٹس چیک کریں۔
              </p>
            </div>
          </div>

          {/* باٹم ایکشن بٹن */}
          <div className="border-t border-white/10 pt-4 flex gap-3">
            <button 
              onClick={() => window.location.reload()} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-95"
            >
              <RotateCcw size={14} /> پیج دوبارہ لوڈ کریں
            </button>
            <button 
              onClick={() => {
                // فیل سیف ریکوری: ہوم پیج پر واپس بھیجیں
                window.location.href = '/';
              }} 
              className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 border border-white/10"
            >
              ہوم پیج پر جائیں
            </button>
          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
