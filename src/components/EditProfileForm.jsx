import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  ChevronRight, Save, User, Calendar, Ruler,
  GraduationCap, Briefcase, Moon, MapPin, AlignRight,
  Heart, Coffee, Home, Tag, Camera, Image as ImageIcon, Users,
  Lock, Eye, EyeOff, X
} from 'lucide-react';

const EditProfileForm = ({ onSave, onCancel }) => {
  const { user, userData, updateProfile } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  // مذاہب اور مسالک کا ڈیٹا
  const religionData = {
    "اسلام": ["سنی", "شیعہ", "اہل حدیث", "دیوبندی", "بریلوی", "دیگر"],
    "عیسائیت": ["کیتھولک", "پروٹسٹنٹ", "آرتھوڈوکس", "دیگر"],
    "ہندومت": ["وشنو مت", "شیو مت", "شاکتی مت", "سمارتا مت", "دیگر"],
    "سکھ مت": ["خالصہ", "نامہ دھاری", "نرنکاری", "دیگر"],
    "بدھ مت": ["تھیرواد", "مہایان", "وجریان", "دیگر"],
    "دیگر": ["دیگر"]
  };

  const [showReligionModal, setShowReligionModal] = useState(false);
  const [showSectModal, setShowSectModal] = useState(false);

  // اسٹیٹ کو موجودہ ڈیٹا سے لوڈ کیا گیا
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    nickName: userData?.nickName || "",
    dob: userData?.dob || "",
    height: userData?.height || "",
    education: userData?.education || "",
    job: userData?.job || "",
    religion: userData?.religion || "اسلام",
    sect: userData?.sect || "سنی",
    city: userData?.city || "", 
    Address: userData?.Address || "",
    family: userData?.family || "",
    hobbies: userData?.hobbies || "",
    intro: userData?.intro || "",
    likesDislikes: userData?.likesDislikes || "",
    profileImage: userData?.profileImage || null,
    privacy: userData?.privacy || {
      dob: false,
      height: false,
      city: false,
      Address: true,
      family: true,
      job: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePrivacy = (field) => {
    setFormData(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: !prev.privacy[field] }
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!user) {
        alert("آپ لاگ ان نہیں ہیں!");
        return;
    }
    
    setIsSaving(true);
    const result = await updateProfile(formData);
    setIsSaving(false);

    if (result.success) {
      alert("پروفائل کامیابی سے اپڈیٹ ہو گئی!");
      onSave(); // واپس مین ویو پر جانے کے لیے
    } else {
      alert("خرابی: ڈیٹا محفوظ نہیں ہو سکا");
    }
  };

  const PrivacyLock = ({ field }) => (
    <button 
      type="button"
      onClick={() => togglePrivacy(field)}
      className={`p-1 rounded-md transition-all ${formData.privacy[field] ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'}`}
    >
      {formData.privacy[field] ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
  );

  const SelectionModal = ({ isOpen, onClose, title, options, onSelect }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
            <h3 className="text-lg font-bold text-[#4A0E0E]">{title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto p-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onSelect(opt); onClose(); }}
                className="p-4 rounded-2xl bg-[#FDF5F5] text-[#4A0E0E] font-bold text-sm hover:bg-[#D4AF37] hover:text-white transition-colors border border-red-50"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#2D0A0A] overflow-y-auto overflow-x-hidden flex flex-col" dir="rtl">
      <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 rounded-b-[40px] shadow-lg flex items-center justify-between sticky top-0 z-50">
        <button type="button" onClick={onCancel} className="text-white opacity-80 p-2 hover:bg-white/10 rounded-full transition-all">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#D4AF37]">پروفائل ایڈٹ کریں</h2>
        <div className="w-10"></div>
      </header>

      <div className="px-6 space-y-6 pt-8 pb-32">
        <div className="relative flex justify-center">
          <label className="relative w-48 h-64 bg-[#3D1212] rounded-[30px] border-2 border-[#D4AF37] overflow-hidden shadow-2xl flex flex-col items-center justify-center cursor-pointer group">
            {formData.profileImage ? (
              <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="text-center">
                <ImageIcon className="text-[#D4AF37] mx-auto mb-2" size={40} />
                <span className="text-[#D4AF37] text-xs font-bold">پروفائل فوٹو</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profileImage')} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-[35px] shadow-2xl border border-red-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">نام <User size={12} /></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" required />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">عرفیت <Tag size={12} /></label>
              <input name="nickName" value={formData.nickName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-end gap-2 px-2">
                <PrivacyLock field="dob" />
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">تاریخ پیدائش <Calendar size={12} /></label>
              </div>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-end gap-2 px-2">
                <PrivacyLock field="height" />
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">قد <Ruler size={12} /></label>
              </div>
              <input name="height" value={formData.height} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-end gap-2 px-2">
                <PrivacyLock field="city" />
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">شہر <MapPin size={12} /></label>
              </div>
              <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-end gap-2 px-2">
                <PrivacyLock field="family" />
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">فیملی <Users size={12} /></label>
              </div>
              <input name="family" value={formData.family} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-end gap-2 px-2">
              <PrivacyLock field="Address" />
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">پتہ <Home size={12} /></label>
            </div>
            <input name="Address" value={formData.Address} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">تعلیم <GraduationCap size={12} /></label>
              <input name="education" value={formData.education} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-end gap-2 px-2">
                <PrivacyLock field="job" />
                <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1">پیشہ <Briefcase size={12} /></label>
              </div>
              <input name="job" value={formData.job} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1" onClick={() => setShowReligionModal(true)}>
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">مذہب <Moon size={12} /></label>
              <div className="w-full bg-[#FDF5F5] rounded-2xl p-4 text-xs text-[#4A0E0E] text-right cursor-pointer border border-transparent hover:border-[#D4AF37] transition-all">
                {formData.religion}
              </div>
            </div>
            <div className="space-y-1" onClick={() => setShowSectModal(true)}>
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">مسلک <Moon size={12} /></label>
              <div className="w-full bg-[#FDF5F5] rounded-2xl p-4 text-xs text-[#4A0E0E] text-right cursor-pointer border border-transparent hover:border-[#D4AF37] transition-all">
                {formData.sect}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 flex items-center gap-1 justify-end">تعارف <AlignRight size={12} /></label>
            <textarea name="intro" rows="3" value={formData.intro} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none resize-none text-right" />
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-[#2D0A0A] via-[#2D0A0A] to-transparent z-50">
        <button 
          onClick={handleSubmit} 
          disabled={isSaving}
          className={`w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#4A0E0E] rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all uppercase tracking-wider text-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSaving ? "محفوظ ہو رہا ہے..." : "معلومات محفوظ کریں"} <Save size={20} />
        </button>
      </div>

      <SelectionModal isOpen={showReligionModal} onClose={() => setShowReligionModal(false)} title="مذہب منتخب کریں" options={Object.keys(religionData)} onSelect={(val) => setFormData(prev => ({ ...prev, religion: val, sect: religionData[val][0] }))} />
      <SelectionModal isOpen={showSectModal} onClose={() => setShowSectModal(false)} title="مسلک منتخب کریں" options={religionData[formData.religion] || ["دیگر"]} onSelect={(val) => setFormData(prev => ({ ...prev, sect: val }))} />
    </div>
  );
};

export default EditProfileForm;
