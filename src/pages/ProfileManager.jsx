import React from 'react';
import { useUser } from '../context/UserContext';
import { Shield, CreditCard, HelpCircle } from 'lucide-react';

const ProfileManager = () => {
  const { userData } = useUser();

  return (
    <div className="p-4 space-y-6 text-right">
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
        <img
          src={userData?.photoURL || 'https://via.placeholder.com/150'}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-2 border-rose-400 object-cover"
        />
        <h2 className="text-lg font-bold text-gray-800 mt-3">{userData?.displayName}</h2>
        <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full mt-1">بیسک ممبر</span>
      </div>

      <div className="space-y-3">
        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <Shield className="w-5 h-5 text-rose-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">شناختی تصدیق کی حیثیت</h4>
            <p className="text-xs text-gray-400">غیر تصدیق شدہ</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <CreditCard className="w-5 h-5 text-rose-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">ممبرشپ پلان</h4>
            <p className="text-xs text-gray-400">فری ورژن</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
