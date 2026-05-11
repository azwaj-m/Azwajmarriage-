import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Save, User, Briefcase, MapPin } from 'lucide-react';
import { updateUserProfile } from '../services/AuthService';

const EditProfileForm = ({ onSave, onCancel }) => {
  const { userData, setUserData } = useUser();
  const [name, setName] = useState(userData?.displayName || '');
  const [profession, setProfession] = useState(userData?.profession || '');
  const [city, setCity] = useState(userData?.city || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedData = { displayName: name, profession, city };
      await updateUserProfile(userData.uid, updatedData);
      setUserData(prev => ({ ...prev, ...updatedData }));
      onSave();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col text-right">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-bold text-lg text-gray-800">ایڈٹ پروفائل</span>
        <div className="w-7"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 flex-1 space-y-4 overflow-y-auto">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">پورا نام</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 pr-10 pl-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-right"
              required
            />
            <User className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">پیشہ ورانہ کام (Profession)</label>
          <div className="relative">
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full border border-gray-200 pr-10 pl-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-right"
            />
            <Briefcase className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">شہر</label>
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-200 pr-10 pl-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-right"
            />
            <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-100 disabled:bg-gray-300 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'محفوظ ہو رہا ہے...' : 'محفوظ کریں'}</span>
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
