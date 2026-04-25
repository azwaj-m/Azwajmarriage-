import React, { useState } from 'react';
import { User, Shield, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import { auth } from '../utils/firebase';

const ProfileSettings = ({ userProfile = {} }) => {
  const [hideAddress, setHideAddress] = useState(false);

  return (
    <div className="p-8 pb-12 font-sans text-right" dir="rtl">
      <h2 className="text-2xl font-bold text-[#4A0E0E] mb-6 border-b pb-2">پروفائل سیٹنگز</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#4A0E0E] p-2 rounded-lg text-[#D4AF37]"><Shield size={18}/></div>
            <div>
              <p className="font-bold text-sm">ایڈریس کی رازداری</p>
              <p className="text-xs text-gray-500">کیا آپ اپنا ایڈریس چھپانا چاہتے ہیں؟</p>
            </div>
          </div>
          <button onClick={() => setHideAddress(!hideAddress)}>
            {hideAddress ? <EyeOff className="text-red-500" /> : <Eye className="text-green-500" />}
          </button>
        </div>

        <button onClick={() => auth.signOut()} className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold">
          <LogOut size={20} /> سائن آؤٹ کریں
        </button>
      </div>
    </div>
  );
};
export default ProfileSettings;
