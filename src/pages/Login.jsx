import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, ArrowRight, Chrome, Shield } from 'lucide-react';
import { AuthService } from '../services/AuthService';

const Login = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ای میل اور پاس ورڈ سے لاگ ان / سائن اپ کا فلو
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('براہ کرم ای میل اور پاس ورڈ درج کریں۔');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // عارضی یا فائر بیس لاگ ان فلو
      const user = await AuthService.loginWithEmail(email, password);
      if (user) {
        onLoginSuccess(user);
      } else {
        setError('لاگ ان کرنے میں ناکامی۔ ای میل یا پاس ورڈ چیک کریں۔');
      }
    } catch (err) {
      setError(err.message || 'کوئی خرابی پیش آگئی ہے۔');
    } finally {
      setLoading(false);
    }
  };

  // گوگل لاگ ان کا فلو
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await AuthService.loginWithGoogle();
      if (user) {
        onLoginSuccess(user);
      }
    } catch (err) {
      setError('گوگل لاگ ان ناکام رہا۔ دوبارہ کوشش کریں۔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#3D0A0A] flex flex-col justify-between px-6 py-10 relative overflow-hidden" dir="rtl">
      {/* سجاوٹی گولڈن بیک گراؤنڈ ڈیزائنز */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#D4AF37]/10 blur-2xl"></div>
      <div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

      {/* ۱۔ اوپری برانڈنگ ایریا */}
      <div className="flex flex-col items-center text-center mt-8 z-10">
        <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8928] p-3 rounded-3xl rotate-6 shadow-2xl mb-4 border border-white/25">
          <img src="/images/Logo.png" className="w-14 h-14 object-contain brightness-110" alt="Azwaj Logo" />
        </div>
        <h1 className="text-4xl font-black text-[#D4AF37] tracking-tight uppercase leading-none">Azwaj</h1>
        <p className="text-[10px] font-bold text-[#D4AF37]/80 tracking-[0.3em] uppercase mt-1">سنجیدہ رشتوں کا پلیٹ فارم</p>
      </div>

      {/* ۲۔ مرکزی فارم اور لاگ ان آپشنز */}
      <div className="w-full bg-white/5 backdrop-blur-md rounded-[35px] border border-white/10 p-6 shadow-2xl z-10 my-auto">
        <h2 className="text-white text-lg font-black mb-5 text-right">{t('login_title', 'لاگ ان کریں یا اکاؤنٹ بنائیں')}</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 text-xs py-2 px-3 rounded-xl mb-4 text-right font-bold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {/* ای میل ان پٹ */}
          <div className="relative">
            <input
              type="email"
              placeholder="ای میل ایڈریس"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] transition-all text-right placeholder:text-white/30"
              required
            />
            <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
          </div>

          {/* پاس ورڈ ان پٹ */}
          <div className="relative">
            <input
              type="password"
              placeholder="پاس ورڈ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] transition-all text-right placeholder:text-white/30"
              required
            />
            <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
          </div>

          {/* آگے بڑھیں بٹن */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-xs py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 uppercase active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'پلیز ویٹ...' : 'جاری رکھیں'}
            <ArrowRight size={14} className="rotate-180" />
          </button>
        </form>

        {/* ڈیوائیڈر */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-white/30 text-[9px] font-bold uppercase">یا ان کے ساتھ سائن ان کریں</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* سوشل لاگ ان بٹنز */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-2xl text-white text-[10px] font-black active:scale-[0.95] transition-transform disabled:opacity-50"
          >
            <Chrome size={14} className="text-red-400" />
            GOOGLE
          </button>
          
          <button
            onClick={() => alert('آئی فون / ایپل سائن ان فیچر جلد ہی لائیو ہو جائے گا!')}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-2xl text-white text-[10px] font-black active:scale-[0.95] transition-transform"
          >
            <span className="text-sm">🍎</span>
            APPLE ID
          </button>
        </div>
      </div>

      {/* ۳۔ نچلی کسٹمر سپورٹ / سیفٹی پٹی */}
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-white/40 z-10 mt-4">
        <Shield size={11} className="text-[#D4AF37]" />
        <span>محفوظ ترین، 100% تصدیق شدہ اور خاندانی ماحول</span>
      </div>
    </div>
  );
};

export default Login;
