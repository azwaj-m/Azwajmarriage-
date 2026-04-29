import React, { useState } from 'react';
import { Camera, Shield, LogOut, Check } from 'lucide-react';

const ProfileSettings = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploading(false);
        alert("تصویر کامیابی سے اپلوڈ ہو گئی!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 text-right" dir="rtl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 rounded-full border-4 border-[#D4AF37] p-1 overflow-hidden bg-gray-200">
          {image ? <img src={image} className="w-full h-full object-cover rounded-full" /> : <div className="flex items-center justify-center h-full text-gray-400">تصویر نہیں ہے</div>}
          <label className="absolute bottom-1 right-1 bg-[#4A0E0E] p-2 rounded-full text-[#D4AF37] cursor-pointer shadow-lg">
            <Camera size={20} />
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>
        <h3 className="mt-4 font-bold text-[#4A0E0E]">پروفائل تصویر اپلوڈ کریں</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <span className="font-bold">اکاؤنٹ ویریفیکیشن</span>
          <Check className="text-green-500" />
        </div>
        <button className="w-full p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2">
          <LogOut size={20} /> لاگ آؤٹ
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
