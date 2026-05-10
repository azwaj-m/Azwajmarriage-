import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

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
    <div className="w-full min-h-screen bg-[#3D0A0A] flex flex-col justify-center items-center px-4" dir="rtl">
      <div className="max-w-md w-full bg-[#2A0606] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-6">ازواج ایپ میں خوش آمدید</h2>

        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-200 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div id="recaptcha-container"></div>

        {isPasswordLogin ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-bold mb-2">موبائل نمبر</label>
              <input
                type="tel"
                placeholder="+923001234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-bold mb-2">پاس ورڈ</label>
              <input
                type="password"
                placeholder="اپنا پاس ورڈ لکھیں"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#3D0A0A] font-bold py-3 px-4 rounded-xl hover:bg-[#bfa032] disabled:opacity-50"
            >
              {loading ? 'براہ کرم انتظار کریں...' : 'لاگ ان کریں'}
            </button>
          </form>
        ) : (
          !isOtpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2">موبائل نمبر</label>
                <input
                  type="tel"
                  placeholder="+923001234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
              {isRegistering && (
                <>
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">پورا نام</label>
                    <input
                      type="text"
                      placeholder="اپنا نام لکھیں"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">پاس ورڈ سیٹ کریں</label>
                    <input
                      type="password"
                      placeholder="پاس ورڈ بنائیں"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none"
                      required
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] text-[#3D0A0A] font-bold py-3 px-4 rounded-xl hover:bg-[#bfa032] disabled:opacity-50"
              >
                {loading ? 'بھیجا جا رہا ہے...' : 'او ٹی پی (OTP) حاصل کریں'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-white/60 text-sm text-center mb-4">تصدیقی کوڈ درج کریں</p>
              <div>
                <input
                  type="text"
                  placeholder="او ٹی پی کوڈ"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-[#1F0404] border border-[#D4AF37]/30 text-white text-center rounded-xl px-4 py-3 text-lg focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'تصدیق ہو رہی ہے...' : 'رجسٹر کریں اور لاگ ان ہوں'}
              </button>
            </form>
          )
        )}

        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            type="button"
            onClick={() => {
              setIsPasswordLogin(!isPasswordLogin);
              setIsOtpSent(false);
              setIsRegistering(false);
            }}
            className="text-[#D4AF37] underline"
          >
            {isPasswordLogin ? 'او ٹی پی سے سائن ان کریں' : 'پاس ورڈ سے لاگ ان کریں'}
          </button>

          {!isPasswordLogin && (
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setIsOtpSent(false);
              }}
              className="text-[#D4AF37] underline"
            >
              {isRegistering ? 'پہلے سے اکاؤنٹ ہے؟' : 'نیا اکاؤنٹ بنائیں'}
            </button>
          )}
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#2A0606] px-2 text-white/40">یا</span></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-5 h-5" />
          گوگل سے لاگ ان کریں
        </button>
      </div>
    </div>
  );
}

export default Login;
