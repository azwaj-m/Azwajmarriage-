import React, { useState } from 'react';
import { Shield, CreditCard, Settings, Ban, LogOut, ChevronLeft, Award } from 'lucide-react';
import EditProfileForm from '../components/EditProfileForm';
import BlockedProfiles from './BlockedProfiles';

const ProfileManager = ({ onNavigate, setCurrentView }) => {
  // اسٹیٹ مینجمنٹ
  const [activeSubView, setActiveSubView] = useState("menu"); // "menu" | "edit" | "blocked"

  // فرضی صارف کا ڈیٹا
  const [userData, setUserData] = useState({
    uid: 'u101',
    displayName: 'شاہ زیب خان',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    premiumStatus: true,
    city: 'Karachi',
    memberType: 'رائل ممبر'
  });

  const handleSaveProfile = (updatedData) => {
    setUserData(prev => ({
      ...prev,
      displayName: updatedData.fullName || prev.displayName,
      photoURL: updatedData.profileImage || prev.photoURL
    }));
    setActiveSubView("menu");
    alert("پروفائل کامیابی سے محفوظ کر لی گئی ہے!");
  };

  // 1️⃣ اگر ایڈٹ پروفائل اوپن ہو
  if (activeSubView === "edit") {
    return (
      <EditProfileForm 
        initialData={userData} 
        onSave={handleSaveProfile} 
        onCancel={() => setActiveSubView("menu")} 
      />
    );
  }

  // 2️⃣ اگر بلاک شدہ لسٹ اوپن ہو
  if (activeSubView === "blocked") {
    return (
      <BlockedProfiles onBack={() => setActiveSubView("menu")} />
    );
  }

  // 3️⃣ مین مینیو ویو
  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col relative overflow-x-hidden" dir="rtl">
      
      {/* پریمیم برانڈ ہیڈر */}
      <header className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-5 rounded-b-[35px] shadow-xl flex items-center justify-between sticky top-0 z-50 border-b border-[#D4AF37]/20">
        <div className="w-9"></div>
        <h2 className="text-sm font-black text-[#D4AF37] tracking-tight uppercase">میرا اکاؤنٹ مینیجر</h2>
        <button type="button" onClick={() => window.location.reload()} className="text-[#D4AF37] p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
          <LogOut size={18} />
        </button>
      </header>

      <div className="px-5 space-y-6 pt-6 pb-28 flex-1 overflow-y-auto no-scrollbar">
        
        {/* 👑 صارف کا پروفائل کارڈ */}
        <div className="flex flex-col items-center justify-center p-6 bg-white border border-[#D4AF37]/10 rounded-[35px] shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5E6D3]/20 rounded-bl-full pointer-events-none" />
          
          <div className="relative">
            <img
              src={userData.photoURL}
              alt="Avatar"
              className="w-24 h-24 rounded-[30px] border-2 border-[#D4AF37] object-cover shadow-md"
            />
            <div className="absolute -bottom-2 -left-2 bg-[#D4AF37] text-[#4A0E0E] p-1.5 rounded-xl shadow-md border border-white">
              <Award size={14} />
            </div>
          </div>

          <h2 className="text-base font-black text-[#4A0E0E] mt-4">{userData.displayName}</h2>
          <span className="text-[10px] font-black text-[#D4AF37] bg-[#4A0E0E] px-3 py-1 rounded-full mt-2 tracking-wider shadow-sm">
            {userData.memberType}
          </span>
        </div>

        {/* 🛠️ مینیو لسٹنگ ایکشنز */}
        <div className="space-y-3">
          
          {/* پروفائل ایڈٹ کریں (Settings آئیکن کے ساتھ فکسڈ) */}
          <button 
            type="button"
            onClick={() => setActiveSubView("edit")}
            className="w-full bg-white border border-gray-100 p-4 rounded-2xl shadow-md flex items-center justify-between transition-all active:scale-98 hover:border-[#D4AF37]/20 text-right"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-[#F5E6D3]/30 rounded-xl text-[#4A0E0E]">
                <Settings size={18} />
              </div>
              <div>
                <h4 className="font-black text-[#4A0E0E] text-xs">معلوماتِ پروفائل تبدیل کریں</h4>
                <p className="text-[9px] font-bold text-gray-400 mt-0.5">تعلیم، پیشہ، فیملی اور ذاتی تفصیلات</p>
              </div>
            </div>
            <ChevronLeft size={16} className="text-gray-400" />
          </button>

          {/* بلاک لسٹ */}
          <button 
            type="button"
            onClick={() => setActiveSubView("blocked")}
            className="w-full bg-white border border-gray-100 p-4 rounded-2xl shadow-md flex items-center justify-between transition-all active:scale-98 hover:border-[#D4AF37]/20 text-right"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
                <Ban size={18} />
              </div>
              <div>
                <h4 className="font-black text-[#4A0E0E] text-xs">بلاک شدہ لسٹ مینیجر</h4>
                <p className="text-[9px] font-bold text-gray-400 mt-0.5">ان بلاک کریں یا بلاک اکاؤنٹس دیکھیں</p>
              </div>
            </div>
            <ChevronLeft size={16} className="text-gray-400" />
          </button>

          {/* شناختی تصدیق */}
          <div className="w-full bg-white border border-gray-100 p-4 rounded-2xl shadow-md flex items-center justify-between text-right">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
                <Shield size={18} />
              </div>
              <div>
                <h4 className="font-black text-[#4A0E0E] text-xs">شناختی تصدیق کی حیثیت</h4>
                <p className="text-[9px] font-bold text-green-600 mt-0.5">✓ تصدیق شدہ آفیشل ممبر</p>
              </div>
            </div>
          </div>

          {/* ممبرشپ کارڈ */}
          <div className="w-full bg-white border border-gray-100 p-4 rounded-2xl shadow-md flex items-center justify-between text-right">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                <CreditCard size={18} />
              </div>
              <div>
                <h4 className="font-black text-[#4A0E0E] text-xs">ممبرشپ پلان</h4>
                <button onClick={() => setCurrentView("subscription")} className="text-[9px] font-bold text-amber-600 mt-0.5">لائف ٹائم رائل پاس ایکٹو ہے</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileManager;
