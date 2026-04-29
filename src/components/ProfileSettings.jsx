
--- File: src/components/ProfileSettings.jsx ---

import React, { useState } from 'react';

import { Camera, LogOut, Check, Calendar, Moon, User } from 'lucide-react';



const ProfileSettings = () => {

  const [image, setImage] = useState(null);



  return (

    <div className="p-6 text-right pb-32" dir="rtl">

      {/* پروفائل ہیڈر */}

      <div className="flex flex-col items-center mb-8">

        <div className="relative w-32 h-32 rounded-full border-4 border-[#D4AF37] p-1 shadow-inner bg-white">

          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">

            {image ? <img src={image} className="w-full h-full object-cover" /> : <User size={50} className="text-gray-300" />}

          </div>

          <label className="absolute bottom-0 right-0 bg-[#4A0E0E] p-2.5 rounded-full text-[#D4AF37] cursor-pointer shadow-lg border-2 border-white">

            <Camera size={18} />

            <input type="file" className="hidden" accept="image/*" onChange={(e) => {

              const file = e.target.files[0];

              if(file) setImage(URL.createObjectURL(file));

            }}/>

          </label>

        </div>

        <h3 className="mt-4 text-xl font-bold text-[#4A0E0E]">میری پروفائل</h3>

      </div>



      {/* فائر بیس ڈیٹا فیلڈز */}

      <div className="space-y-4">

        <SettingItem icon={Calendar} label="تاریخ پیدائش" value="1995-05-15" />

        <SettingItem icon={Moon} label="مذہب / مسلک" value="اسلام (سنی)" />

        

        <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#D4AF37]/10 flex items-center justify-between mt-6">

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-2 rounded-lg text-green-600"><Check size={18}/></div>

            <span className="font-bold text-[#4A0E0E]">اکاؤنٹ تصدیق شدہ ہے</span>

          </div>

        </div>



        <button className="w-full mt-8 p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">

          <LogOut size={20} /> لاگ آؤٹ کریں

        </button>

      </div>

    </div>

  );

};



const SettingItem = ({ icon: Icon, label, value }) => (

  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">

    <p className="text-[10px] text-gray-400 mb-1">{label}</p>

    <div className="flex items-center gap-3">

      <Icon size={18} className="text-[#D4AF37]" />

      <span className="font-semibold text-[#4A0E0E]">{value}</span>

    </div>

  </div>

);



export default ProfileSettings;

