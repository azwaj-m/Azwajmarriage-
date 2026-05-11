import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Eye, Lock } from 'lucide-react';

const ProfileSettings = ({ onBack }) => {
  const { t } = useTranslation();
  const [profileVisible, setProfileVisible] = useState(true);

  return (
    <div className="h-full bg-white flex flex-col text-right">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">{t('settings', 'پرائیویسی سیٹنگز')}</span>
        <div className="w-7"></div>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 flex items-center justify-between text-right">
          <Shield className="w-8 h-8 text-rose-500" />
          <div>
            <h4 className="font-bold text-gray-800">حفاظتی معیارات</h4>
            <p className="text-xs text-gray-500 mt-0.5">آپ کا حساس ڈیٹا مکمل طور پر انکرپٹڈ ہے۔</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 text-sm">پروفائل ویزیبلٹی</h3>
          
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={profileVisible} 
                onChange={() => setProfileVisible(!profileVisible)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-rose-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-700 block">پروفائل پبلک رکھیں</span>
              <span className="text-xs text-gray-400">غیر تصدیق شدہ صارفین سے چھپائیں۔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
