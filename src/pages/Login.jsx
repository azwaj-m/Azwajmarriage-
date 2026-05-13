import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { Phone, Lock, User, ShieldCheck, LogIn, UserPlus } from 'lucide-react';

function Login({ onLoginSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordLogin, setIsPasswordLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isPasswordLogin) {
      AuthService.setupRecaptcha('recaptcha-container');
    }
  }, [isPasswordLogin]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await AuthService.loginWithPhoneAndPassword(phoneNumber, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const exists = await AuthService.checkIfPhoneExists(phoneNumber);
      if (exists && isRegistering) {
        throw new Error("یہ فون نمبر پہلے ہی رجسٹرڈ ہے۔");
      }
      await AuthService.sendOTP(phoneNumber);
      setIsOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await AuthService.verifyOTP(otpCode);
      const userData = await AuthService.saveUserToFirestore(user, {
        displayName: displayName,
        customPassword: password
      });
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userData = await AuthService.loginWithGoogle();
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col justify-center items-center px-5 relative overflow-x-hidden" dir="rtl">
      
      {/* پریمیم بیک گراؤنڈ آرٹ شیڈز */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#F5E6D3]/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#4A0E0E]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-white border border-[#D4AF37]/20 p-6 rounded-[35px] shadow-2xl z-10 relative flex flex-col">
        
        {/* برانڈ لوگو / ہیڈر */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#4A0E0E] to-[#3D0A0A] rounded-2xl mx-auto flex items-center justify-center shadow-lg border border-[#D4AF37]/30 mb-3 animate-bounce-slow">
            <ShieldCheck size={32} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-black text-[#4A0E0E] tracking-tight">ازواج ایپ میں خوش آمدید</h2>
          <p className="text-[10px] font-bold text-gray-400 mt-1">مستند اور پائیدار رشتوں کا محفوظ پلیٹ فارم</p>
        </div>

        {/* 📑 پریمیم موڈ سوئچر ٹابس (اگر OTP موڈ فعال نہ ہو تو لاگ ان/رجسٹر کا ٹگل دکھے گا) */}
        {!isOtpSent && (
          <div className="bg-[#F5E6D3]/30 p-1 rounded-2xl flex items-center mb-5 gap-1 border border-[#D4AF37]/10">
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(true);
                setIsRegistering(false);
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                isPasswordLogin ? 'bg-[#4A0E0E] text-[#D4AF37] shadow-md' : 'text-gray-500 hover:text-[#4A0E0E]'
              }`}
            >
              <LogIn size={13} />
              <span>پاس ورڈ لاگ ان</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(false);
                setIsRegistering(true);
                setIsOtpSent(false);
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                (!isPasswordLogin && isRegistering) ? 'bg-[#4A0E0E] text-[#D4AF37] shadow-md' : 'text-gray-500 hover:text-[#4A0E0E]'
              }`}
            >
              <UserPlus size={13} />
              <span>نیا اکاؤنٹ بنائیں</span>
            </button>
          </div>
        )}

        {/* 🚨 ایرر الرٹ باکس */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] font-black p-3 rounded-2xl mb-4 text-center animate-fadeIn">
            {error}
          </div>
        )}

        <div id="recaptcha-container" className="mb-2"></div>

        {/* 🔐 فارم رینڈرنگ */}
        {isPasswordLogin ? (
          /* پاس ورڈ لاگ ان فارم */
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#4A0E0E]/70 flex items-center gap-1 px-1">موبائل نمبر <Phone size={10} /></label>
              <input
                type="tel"
                placeholder="+923001234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/10 focus:border-[#D4AF37] text-[#4A0E0E] text-xs font-bold rounded-xl px-4 py-3.5 focus:outline-none transition-all text-left"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#4A0E0E]/70 flex items-center gap-1 px-1">پاس ورڈ <Lock size={10} /></label>
              <input
                type="password"
                placeholder="اپنا پاس ورڈ لکھیں"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/10 focus:border-[#D4AF37] text-[#4A0E0E] text-xs font-bold rounded-xl px-4 py-3.5 focus:outline-none transition-all text-right"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 border border-[#D4AF37]/20 mt-2"
            >
              {loading ? 'براہ کرم انتظار کریں...' : 'لاگ ان کریں'}
            </button>
          </form>
        ) : (
          /* او ٹی پی موڈ (یا رجسٹریشن / یا سائن ان بذریعہ OTP) */
          !isOtpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#4A0E0E]/70 flex items-center gap-1 px-1">موبائل نمبر <Phone size={10} /></label>
                <input
                  type="tel"
                  placeholder="+923001234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/10 focus:border-[#D4AF37] text-[#4A0E0E] text-xs font-bold rounded-xl px-4 py-3.5 focus:outline-none transition-all text-left"
                  required
                />
              </div>
              {isRegistering && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#4A0E0E]/70 flex items-center gap-1 px-1">پورا نام <User size={10} /></label>
                    <input
                      type="text"
                      placeholder="اپنا نام لکھیں"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/10 focus:border-[#D4AF37] text-[#4A0E0E] text-xs font-bold rounded-xl px-4 py-3.5 focus:outline-none transition-all text-right"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#4A0E0E]/70 flex items-center gap-1 px-1">مستقبل کے لیے پاس ورڈ <Lock size={10} /></label>
                    <input
                      type="password"
                      placeholder="مضبوط پاس ورڈ بنائیں"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/10 focus:border-[#D4AF37] text-[#4A0E0E] text-xs font-bold rounded-xl px-4 py-3.5 focus:outline-none transition-all text-right"
                      required
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 border border-[#D4AF37]/20 mt-2"
              >
                {loading ? 'بھیجا جا رہا ہے...' : 'او ٹی پی (OTP) حاصل کریں'}
              </button>
            </form>
          ) : (
            /* او ٹی پی کی تصدیق کا مرحلہ */
            <form onSubmit={handleVerifyOTP} className="space-y-4 animate-fadeIn">
              <p className="text-gray-400 text-[10px] font-bold text-center mb-2">آپ کے نمبر پر تصدیقی کوڈ بھیجا گیا ہے</p>
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="او ٹی پی کوڈ درج کریں"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-[#F5E6D3]/20 border border-[#D4AF37]/20 focus:border-[#D4AF37] text-[#4A0E0E] text-center rounded-xl px-4 py-3.5 text-base font-black focus:outline-none tracking-widest"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 border border-green-700/20"
              >
                {loading ? 'تصدیق ہو رہی ہے...' : 'تصدیق کریں اور پروفائل فعال کریں'}
              </button>
            </form>
          )
        )}

        {/* 🔗 نیچے کے ثانوی سوئچ لنکس */}
        <div className="flex justify-center items-center mt-5 text-[11px] font-black">
          {isPasswordLogin ? (
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(false);
                setIsOtpSent(false);
                setIsRegistering(false);
                setError('');
              }}
              className="text-[#4A0E0E] underline hover:text-[#D4AF37] transition-all"
            >
              بغیر پاس ورڈ (OTP) کے سائن ان کریں
            </button>
          ) : (
            !isOtpSent && (
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                className="text-[#4A0E0E] underline hover:text-[#D4AF37] transition-all"
              >
                {isRegistering ? 'پہلے سے اکاؤنٹ ہے؟ پاس ورڈ لاگ ان' : 'بغیر پاس ورڈ نیا اکاؤنٹ بنائیں'}
              </button>
            )
          )}
        </div>

        {/* 👑 ڈیوائیڈر آرٹ یا */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-[10px] font-black text-gray-400 uppercase">
            <span className="bg-white px-3">یا اس کے ذریعے لاگ ان کریں</span>
          </div>
        </div>

        {/* 🌐 گوگل پریمیم بٹن */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-13 bg-[#FFFDF9] hover:bg-gray-50 text-[#4A0E0E] font-black text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-98 disabled:opacity-50 border border-gray-200 shadow-sm"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-4 h-4 object-contain" />
          <span>گوگل اکاؤنٹ کا استعمال کریں</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
