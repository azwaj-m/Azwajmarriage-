import React from 'react';

function Home({ user, onLogout }) {
  // اگر یوزر کا نام نہ ہو تو یہ فال بیک کرے گا، بغیر کسی کریش کے
  const getFirstName = () => {
    const name = user.displayName || user.name || "صارف";
    return name.split(' ')[0];
  };

  const userPhoto = user.photoURL || user.img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <div className="w-full min-h-screen bg-[#3D0A0A] text-white font-sans" dir="rtl">
      {/* ہیڈر */}
      <header className="border-b border-[#D4AF37]/20 bg-[#2A0606] px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold text-[#D4AF37]">ازواج پورٹل</h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-white/80">خوش آمدید، {getFirstName()}!</span>
          <div className="relative w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white/10">
            <img 
              src={userPhoto} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
              }}
            />
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-900/60 border border-red-700/60 hover:bg-red-800 text-white text-xs px-3 py-2 rounded-xl transition"
          >
            لاگ آؤٹ
          </button>
        </div>
      </header>

      {/* مین باڈی */}
      <main className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-[#2A0606] border border-[#D4AF37]/20 p-8 rounded-3xl shadow-2xl inline-block max-w-md w-full">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#D4AF37] overflow-hidden mb-4 bg-white/10">
            <img 
              src={userPhoto} 
              alt="User" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
              }}
            />
          </div>
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">{user.displayName || "صارف"}</h2>
          <p className="text-white/60 text-sm mb-6">{user.phoneNumber || user.email || "نمبر دستیاب نہیں"}</p>

          <div className="bg-[#3D0A0A]/60 border border-[#D4AF37]/10 p-4 rounded-xl text-center text-sm text-[#D4AF37]">
            رابطہ کامیابی سے بحال ہو گیا ہے۔ اب آپ پروجیکٹ پر پرانے تسلسل کے ساتھ کام جاری رکھ سکتے ہیں!
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
