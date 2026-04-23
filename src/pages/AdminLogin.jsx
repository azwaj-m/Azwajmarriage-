import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const MASTER_PIN = "9988"; // آپ کا خفیہ کوڈ

  const checkPin = () => {
    if (pin === MASTER_PIN) {
      onLogin(true);
    } else {
      alert("غلط پن کوڈ!");
    }
  };

  return (
    <div className="min-h-screen bg-[#4A0E0E] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[50px] shadow-2xl w-full max-w-sm text-center">
        <ShieldCheck size={60} className="mx-auto text-[#4A0E0E] mb-6" />
        <h2 className="text-xl font-black mb-6">ایڈمن لاگ ان</h2>
        <input 
          type="password" 
          placeholder="سیکیورٹی پن درج کریں" 
          className="w-full p-4 rounded-2xl bg-gray-100 text-center text-2xl tracking-[10px] outline-none mb-6"
          onChange={(e) => setPin(e.target.value)}
        />
        <button onClick={checkPin} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-2xl font-black shadow-xl">
          رسائی حاصل کریں
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
