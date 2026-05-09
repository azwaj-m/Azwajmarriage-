import React, { useState, useEffect } from 'react';
import { Phone, Lock, ArrowRight, Shield, CheckCircle, Key } from 'lucide-react';
import { AuthService } from '../services/AuthService';

const Login = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('phone_login'); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [tempUser, setTempUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      AuthService.setupRecaptcha('recaptcha-container');
    } catch (err) {
      console.error("Recaptcha failed:", err);
    }
  }, []);

  const getFullPhoneNumber = () => {
    let cleanPhone = phoneNumber.trim().replace(/^0+/, '');
    return `${countryCode}${cleanPhone}`;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const user = await AuthService.loginWithGoogle();
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'گوگل لاگ ان ناکام رہا۔');
    } finally {
      setLoading(false);
    }
  };

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
      setError(err.message || 'لاگ ان ناکام رہا۔ دوبارہ کوشش کریں۔');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('براہ کرم درست موبائل نمبر درج کریں۔');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const fullPhone = getFullPhoneNumber();
      
      const exists = await AuthService.checkIfPhoneExists(fullPhone);
      if (exists) {
        setError('یہ موبائل نمبر پہلے ہی رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔');
        setLoading(false);
        return;
      }

      await AuthService.sendOTP(fullPhone);
      setMessage('تصدیقی کوڈ کامیابی کے ساتھ آپ کے نمبر پر بھیج دیا گیا ہے۔');
      setAuthMode('verify_otp');
    } catch (err) {
      setError(err.message || 'OTP کوڈ بھیجنے میں ناکامی۔');
    } finally {
      setLoading(false);
    }
  };

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
      setAuthMode('set_profile');
    } catch (err) {
      setError(err.message || 'کوڈ کی تصدیق ناکام رہی۔');
    } finally {
      setLoading(false);
    }
  };

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
        customPassword: password,
      });
      onLoginSuccess(fullUserData);
    } catch (err) {
      setError(err.message || 'پروفائل محفوظ کرنے میں ناکامی۔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#3D0A0A] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden" dir="rtl">
      
      <div id="recaptcha-container" style={{ display: 'none' }}></div>

      <div className="flex flex-col items-center text-center mb-6 z-10">
        <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8928] p-4 rounded-[28px] rotate-6 shadow-2xl mb-4 border border-white/20">
          <img src="/images/Logo.png" className="w-16 h-16 object-contain brightness-110" alt="Azwaj Logo" />
        </div>
        <h1 className="text-4xl font-black text-[#D4AF37] tracking-tight uppercase leading-none">Azwaj</h1>
        <p className="text-[10px] font-bold text-[#D4AF37]/80 tracking-[0.2em] uppercase mt-1">سنجیدہ رشتوں کا پلیٹ فارم</p>
      </div>

      <div className="w-full max-w-[360px] bg-white/5 backdrop-blur-md rounded-[30px] border border-white/10 p-6 shadow-2xl z-10">
        
        <h2 className="text-white text-base font-black mb-5 text-right">
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

        {/* گوگل ون ٹاپ لاگ ان بٹن (صرف مین لاگ ان یا سائن اپ موڈز میں دکھے گا) */}
        {(authMode === 'phone_login' || authMode === 'signup_otp') && (
          <div className="mb-5">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold text-sm py-3 px-4 rounded-2xl shadow-md flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.7 0 3.22.69 4.33 1.8l3.1-3.1C18.42 1.84 15.54 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.79 0 10.24-4.11 10.24-10.24 0-.64-.08-1.27-.2-1.95H12.24z"
                />
              </svg>
              Google کے ساتھ لاگ ان کریں
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-1 border-white/10" />
              <span className="px-3 text-xs text-white/40">یا</span>
              <hr className="flex-1 border-white/10" />
            </div>
          </div>
        )}

        {authMode === 'phone_login' && (
          <form onSubmit={handlePhonePasswordLogin} className="space-y-4">
            <div className="flex gap-2">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#3D0A0A] border border-white/10 rounded-2xl px-2.5 text-white text-sm font-bold outline-none focus:border-[#D4AF37]"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="موبائل نمبر"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-semibold outline-none focus:border-[#D4AF37] text-right"
                  required
                />
                <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="پاس ورڈ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-semibold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-sm py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'پلیز ویٹ...' : 'لاگ ان کریں'}
              <ArrowRight size={14} className="rotate-180" />
            </button>

            <p className="text-center text-white/50 text-xs mt-3">
              اکاؤنٹ نہیں ہے؟{' '}
              <button type="button" onClick={() => { setAuthMode('signup_otp'); setError(''); setMessage(''); }} className="text-[#D4AF37] font-black underline">
                نیا اکاؤنٹ بنائیں
              </button>
            </p>
          </form>
        )}

        {authMode === 'signup_otp' && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="flex gap-2">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#3D0A0A] border border-white/10 rounded-2xl px-2.5 text-white text-sm font-bold outline-none focus:border-[#D4AF37]"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="موبائل نمبر درج کریں"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-semibold outline-none focus:border-[#D4AF37] text-right"
                  required
                />
                <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-sm py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'تصدیق جاری ہے...' : 'بذریعہ SMS کوڈ حاصل کریں'}
              <ArrowRight size={14} className="rotate-180" />
            </button>

            <p className="text-center text-white/50 text-xs mt-3">
              پہلے سے اکاؤنٹ ہے؟{' '}
              <button type="button" onClick={() => { setAuthMode('phone_login'); setError(''); setMessage(''); }} className="text-[#D4AF37] font-black underline">
                لاگ ان کریں
              </button>
            </p>
          </form>
        )}

        {authMode === 'verify_otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="6 ہندسوں کا کوڈ درج کریں"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-bold outline-none focus:border-[#D4AF37] text-center tracking-[0.4em]"
                required
              />
              <Key size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-sm py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'تصدیق کی جا رہی ہے...' : 'کوڈ کی تصدیق کریں'}
            </button>
          </form>
        )}

        {authMode === 'set_profile' && (
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="اپنا پورا نام"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-semibold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <CheckCircle size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="اپنا نیا لاگ ان پاس ورڈ بنائیں"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5E6D3]/10 border border-white/10 rounded-2xl py-3 pr-10 pl-4 text-white text-sm font-semibold outline-none focus:border-[#D4AF37] text-right"
                required
              />
              <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8928] text-[#3D0A0A] font-black text-sm py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'پروفائل بنائی جا رہی ہے...' : 'اکاؤنٹ مکمل کریں'}
            </button>
          </form>
        )}

      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-white/40 z-10 mt-6">
        <Shield size={12} className="text-[#D4AF37]" />
        <span>محفوظ ترین، 100% تصدیق شدہ اور خاندانی ماحول</span>
      </div>
    </div>
  );
};

export default Login;
