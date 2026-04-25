import React from 'react';
import { User, Shield, Bell, LogOut } from 'lucide-react';
import { auth } from '../utils/firebase';

const ProfileSettings = ({ userProfile = {}, lang = 'ur' }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="p-8 pb-12 font-sans text-right" dir="rtl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-[#4A0E0E]">پروفائل سیٹنگز</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100">
          <div className="bg-[#4A0E0E] p-3 rounded-xl text-[#D4AF37]"><User size={20} /></div>
          <div className="flex-grow text-right">
            <h4 className="font-bold text-gray-800">ذاتی معلومات</h4>
            <p className="text-xs text-gray-500">نام اور بائیو تبدیل کریں</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="bg-[#4A0E0E] p-3 rounded-xl text-[#D4AF37]"><Shield size={20} /></div>
          <div className="flex-grow text-right">
            <h4 className="font-bold text-gray-800">سیکیورٹی</h4>
            <p className="text-xs text-gray-500">پاس ورڈ اور پرائیویسی</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} /> سائن آؤٹ کریں
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
