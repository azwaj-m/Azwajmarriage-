
import React from 'react';

import { User, Shield, Bell, LogOut } from 'lucide-react';

import { auth } from '../utils/firebase';



const ProfileSettings = ({ userProfile, lang }) => {

  return (

    <div className="p-8 pb-12 font-[Noto_Sans_Urdu] text-right" dir="rtl">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-[#4A0E0E]">پروفائل سیٹنگز</h2>

      </div>

      <div className="space-y-6">

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">

          <div className="bg-[#4A0E0E] p-3 rounded-xl text-[#D4AF37]"><User size={20} /></div>

          <div className="flex-grow">

            <h4 className="font-bold text-gray-800">ذاتی معلومات</h4>

            <p className="text-xs text-gray-500">نام اور تصویر تبدیل کریں</p>

          </div>

        </div>

        <button onClick={() => auth.signOut()} className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold">

          <LogOut size={20} /> سائن آؤٹ کریں

        </button>

      </div>

    </div>

  );

};

export default ProfileSettings;

