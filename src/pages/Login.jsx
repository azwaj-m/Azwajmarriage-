import React, { useState, useEffect } from 'react';
import { Phone, Lock, ArrowRight, Shield, CheckCircle, Key } from 'lucide-react';
import { AuthService } from '../services/AuthService';

const Login = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('phone_login'); // Modes: 'phone_login', 'signup_otp', 'verify_otp', 'set_profile'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+92'); // ڈیفالٹ پاکستان
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [tempUser, setTempUser] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ری کیپچا لوڈ کرنا
  useEffect(() => {
    AuthService.setupRecaptcha('recaptcha-container');
  }, []);

  const getFullPhoneNumber = () => {
    let cleanPhone = phoneNumber.trim().replace(/^0+/, ''); // شروع کے صفر ہٹائیں
    return `${countryCode}${cleanPhone}`;
  };

  // ۱۔ موبائل نمبر اور پاس ورڈ سے لاگ ان
  const handlePhonePasswordLogin = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      setError('براہ کرم موبائل نمبر اور پاس ورڈ درج کریں۔');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fullPhone = getFullPhoneNumber();
      const user = await AuthService.loginWithPhoneAndPassword(fullPhone, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'لاگ ان ناکام رہا۔ تفصیلات چیک کریں۔');
    } finally {
      setLoading(false);
    }
  };

  // ۲۔ نیا اکاؤنٹ بنانے کے لیے OTP بھیجنا
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('براہ کرم درست موبائل نمبر درج کریں۔');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fullPhone = getFullPhoneNumber();
      await AuthService.sendOTP(fullPhone);
      setMessage('آپ کے نمبر پر تصدیقی کوڈ بھیج دیا گیا ہے۔');
      setAuthMode('verify_otp');
    } catch (err) {
      setError(err.message || 'OTP کوڈ بھیجنے میں ناکامی۔ انٹرنیٹ چیک کریں۔');
    } finally {
      setLoading(false);
    }
  };

  // ۳۔ OTP تصدیق کرنا
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      setError('براہ کرم تصدیقی کوڈ درج کریں۔');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const firebaseUser = await AuthService.verifyOTP(otpCode);
      setTempUser(firebaseUser);
      // تصدیق کامیاب ہونے کے بعد، صارف کو اپنا نام اور پاس ورڈ سیٹ کرنے دیں
      setAuthMode('set_profile');
    } catch (err) {
      setError(err.message || 'کوڈ کی تصدیق ناکام رہی۔');
    } finally {
      setLoading(false);
    }
  };

  // ۴۔ نام اور پاس ورڈ سیٹ کر کے اکاؤنٹ مکمل کرنا
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!fullName || !password) {
      setError('براہ کرم اپنا نام اور پاس ورڈ سیٹ کریں۔');
      return;
    }
    if (password.length < 6) {
      setError('پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fullUserData = await AuthService.saveUserToFirestore(tempUser, {
        displayName: fullName,
        customPassword: password, // پاس ورڈ کو کلاؤڈ ویلیڈیشن کے لیے محفوظ کریں
      });
      onLoginSuccess(fullUserData);
    } catch (err) {
      setError(err.message || 'پروفائل محفوظ کرنے میں ناکامی۔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#3D0A0A] flex flex-col justify-between px-6 py-10 relative overflow-hidden" dir="rtl">
      
      {/* ری کیپچا کے لیے پوشیدہ کنٹینر */}
      <div id="recaptcha-container" className="hidden"></div>

      {/* ۱۔ اوپری برانڈنگ ایریا */}
      <div className="flex flex-col items-center text-center mt-4 z-10">
        <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8928] p-3 rounded-3xl rotate-6 shadow-2xl mb-2 border border-white/25">
          <img src="/images/Logo.png" className="w-14 h-14 object-contain brightness-110" alt="Azwaj Logo" />
        </div>
        <h1 className="text-3xl font-black text-[#D4AF37] tracking-tight uppercase leading-none">Azwaj</h1>
        <p className="text-[9px] font-bold text-[#D4AF37]/80 tracking-[0.2em] uppercase mt-1">سنجیدہ رشتوں کا پلیٹ فارم</p>
      </div>

      {/* ۲۔ مرکزی فارم کنٹرولر */}
      <div className="w-full bg-white/5 backdrop-blur-md rounded-[35px] border border-white/10 p-6 shadow-2xl z-10 my-auto">
        
        {/* ٹائٹل مینیجر */}
        <h2 className="text-white text-lg font-black mb-4 text-right">
          {authMode === 'phone_login' && 'موبائل نمبر سے لاگ ان کریں'}
          {authMode === 'signup_otp' && 'موبائل سے نیا اکاؤنٹ بنائیں'}
          {authMode === 'verify_otp' && 'کوڈ کی تصدیق کریں'}
          {authMode === 'set_profile' && 'اپنا پاس ورڈ اور نام سیٹ کریں'}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 text-xs py-2 px-3 rounded-xl mb-4 text-right font-bold">
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-200 text-xs py-2 px-3 rounded-xl mb-4 text-right font-bold">
            ✓ {message}
          </div>
        )}

        {/* فلو کنٹرول: موبائل نمبر + پاس ورڈ لاگ ان */}
        {authMode === 'phone_login' && (
          <form onSubmit={handlePhonePasswordLogin} className="space-y-4">
            <div className="flex gap-2">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl px-2 text-white text-xs font-bold outline-none focus:border-[#D4AF37]"
              >
                <option value="+92" className="bg-[#3D0A0A]">🇵🇰 +92</option>
                <option value="+91" className="bg-[#3D0A0A]">🇮🇳 +91</option>
                <option value="+966" className="bg-[#3D0A0A]">🇸🇦 +966</option>
                <option value="+971" className="bg-[#3D0A0A]">🇦🇪 +971</option>
                <option value="+44" className="bg-[#3D0A0A]">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="موبائل نمبر"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-right"
                  required
                />
                <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="پاس ورڈ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-xs py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'پلیز ویٹ...' : 'لاگ ان کریں'}
              <ArrowRight size={14} className="rotate-180" />
            </button>

            <p className="text-center text-white/50 text-[10px] mt-2">
              اکاؤنٹ نہیں ہے؟{' '}
              <button type="button" onClick={() => setAuthMode('signup_otp')} className="text-[#D4AF37] font-black underline">
                نیا اکاؤنٹ بنائیں
              </button>
            </p>
          </form>
        )}

        {/* فلو کنٹرول: نیا سائن اپ (بذریعہ OTP حاصل کریں) */}
        {authMode === 'signup_otp' && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="flex gap-2">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl px-2 text-white text-xs font-bold outline-none focus:border-[#D4AF37]"
              >
                <option value="+92" className="bg-[#3D0A0A]">🇵🇰 +92</option>
                <option value="+91" className="bg-[#3D0A0A]">🇮🇳 +91</option>
                <option value="+966" className="bg-[#3D0A0A]">🇸🇦 +966</option>
                <option value="+971" className="bg-[#3D0A0A]">🇦🇪 +971</option>
                <option value="+44" className="bg-[#3D0A0A]">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="موبائل نمبر درج کریں"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-right"
                  required
                />
                <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-xs py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'کوڈ بھیجا جا رہا ہے...' : 'بذریعہ SMS کوڈ حاصل کریں'}
              <ArrowRight size={14} className="rotate-180" />
            </button>

            <p className="text-center text-white/50 text-[10px] mt-2">
              پہلے سے اکاؤنٹ ہے؟{' '}
              <button type="button" onClick={() => setAuthMode('phone_login')} className="text-[#D4AF37] font-black underline">
                یہاں لاگ ان کریں
              </button>
            </p>
          </form>
        )}

        {/* فلو کنٹرول: موصول شدہ OTP کوڈ کی ویریفیکیشن */}
        {authMode === 'verify_otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="6 ہندسوں کا کوڈ درج کریں"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-center tracking-[0.5em]"
                required
              />
              <Key size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-xs py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'تصدیق کی جا رہی ہے...' : 'کوڈ کی تصدیق کریں'}
            </button>
          </form>
        )}

        {/* فلو کنٹرول: نام اور پاس ورڈ سیٹ کرنا */}
        {authMode === 'set_profile' && (
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="اپنا پورا نام"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <CheckCircle size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="اپنا نیا لاگ ان پاس ورڈ بنائیں"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border-2 border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white text-xs font-bold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-xs py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'پروفائل بنائی جا رہی ہے...' : 'اکاؤنٹ مکمل کریں'}
            </button>
          </form>
        )}

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
