import React, { useState } from 'react';
import {
  ChevronRight, Save, User, Calendar, Ruler,
  GraduationCap, Briefcase, Moon, MapPin, AlignRight,
  Heart, Coffee, Home, Tag, ImageIcon, Users, Eye, EyeOff, X
} from 'lucide-react';

const EditProfileForm = ({ initialData, onSave, onCancel }) => {
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

  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || initialData?.name || "",
    nickName: initialData?.nickName || "",
    dob: initialData?.dob || "",
    height: initialData?.height || "",
    education: initialData?.education || "",
    job: initialData?.job || initialData?.jobKey || "", 
    religion: initialData?.religion || "اسلام",
    sect: initialData?.sect || "سنی",
    city: initialData?.city || initialData?.cityKey || initialData?.ctiy || "", 
    Address: initialData?.Address || "",
    family: initialData?.family || "",
    hobbies: initialData?.hobbies || "",
    intro: initialData?.intro || "",
    likesDislikes: initialData?.likesDislikes || "",
    profileImage: initialData?.profileImage || initialData?.img || null,
    privacy: initialData?.privacy || {
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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSave(formData);
  };

  const PrivacyLock = ({ field }) => (
    <button 
      type="button"
      onClick={() => togglePrivacy(field)}
      className={`p-1.5 rounded-xl transition-all ${formData.privacy[field] ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}
    >
      {formData.privacy[field] ? <EyeOff size={13} /> : <Eye size={13} />}
    </button>
  );

  const SelectionModal = ({ isOpen, onClose, title, options, onSelect }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 backdrop-blur-xs p-0">
        <div className="bg-[#FFFDF9] w-full max-w-md rounded-t-[40px] p-6 border-t-2 border-[#D4AF37] shadow-2xl max-h-[60vh] flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-100">
            <button type="button" onClick={onClose} className="p-2 bg-gray-100 text-gray-500 rounded-full active:scale-90"><X size={16}/></button>
            <h3 className="text-sm font-black text-[#4A0E0E]">{title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5 overflow-y-auto no-scrollbar p-1 flex-1">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onSelect(opt); onClose(); }}
                className="p-3.5 rounded-2xl bg-[#F5E6D3]/40 text-[#4A0E0E] font-black text-xs hover:bg-[#4A0E0E] hover:text-[#D4AF37] transition-all border border-[#D4AF37]/10 text-center"
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
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col relative overflow-x-hidden" dir="rtl">
      
      <header className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-5 rounded-b-[35px] shadow-xl flex items-center justify-between sticky top-0 z-50 border-b border-[#D4AF37]/20">
        <button type="button" onClick={onCancel} className="text-[#D4AF37] p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
          <ChevronRight size={22} />
        </button>
        <h2 className="text-sm font-black text-[#D4AF37] tracking-tight">معلوماتِ پروفائل ایڈٹ کریں</h2>
        <div className="w-9"></div>
      </header>

      <div className="px-6 space-y-5 pt-6 pb-32 flex-1 overflow-y-auto no-scrollbar">
        <div className="relative flex justify-center">
          <label className="relative w-40 h-52 bg-[#F5E6D3]/30 rounded-[35px] border-2 border-dashed border-[#D4AF37] overflow-hidden shadow-xl flex flex-col items-center justify-center cursor-pointer active:scale-98 transition">
            {formData.profileImage ? (
              <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="text-center p-4">
                <ImageIcon className="text-[#D4AF37] mx-auto mb-1.5" size={32} />
                <span className="text-[#4A0E0E] text-[10px] font-black block">تصویر اپلوڈ کریں</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profileImage')} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-[30px] shadow-xl border border-[#D4AF37]/10">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">پورا نام <User size={10} /></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">عرفیت / نک نیم <Tag size={10} /></label>
              <input name="nickName" value={formData.nickName} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <PrivacyLock field="dob" />
                <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">تاریخ پیدائش <Calendar size={10} /></label>
              </div>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <PrivacyLock field="height" />
                <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">قد / ہائٹ <Ruler size={10} /></label>
              </div>
              <input name="height" value={formData.height} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" placeholder="مثلاً 5 فٹ 6 انچ" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <PrivacyLock field="city" />
                <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">شہر <MapPin size={10} /></label>
              </div>
              <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <PrivacyLock field="family" />
                <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">فیملی تفصیل <Users size={10} /></label>
              </div>
              <input name="family" value={formData.family} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" placeholder="بہن، بھائیوں کی تعداد" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-1">
              <PrivacyLock field="Address" />
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">موجودہ مکمل پتہ <Home size={10} /></label>
            </div>
            <input name="Address" value={formData.Address} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">تعلیمی ڈگری <GraduationCap size={10} /></label>
              <input name="education" value={formData.education} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <PrivacyLock field="job" />
                <label className="text-[9px] font-black text-gray-400 flex items-center gap-1">موجودہ پیشہ / نوکری <Briefcase size={10} /></label>
              </div>
              <input name="job" value={formData.job} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none text-right transition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1" onClick={() => setShowReligionModal(true)}>
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">مذہب <Moon size={10} /></label>
              <div className="w-full bg-[#F5E6D3]/30 border border-[#D4AF37]/20 rounded-xl p-3.5 text-xs font-black text-[#4A0E0E] text-right cursor-pointer hover:bg-[#F5E6D3]/50 transition-all">
                {formData.religion}
              </div>
            </div>
            <div className="space-y-1" onClick={() => setShowSectModal(true)}>
              <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">مسلک / فرقہ <Moon size={10} /></label>
              <div className="w-full bg-[#F5E6D3]/30 border border-[#D4AF37]/20 rounded-xl p-3.5 text-xs font-black text-[#4A0E0E] text-right cursor-pointer hover:bg-[#F5E6D3]/50 transition-all">
                {formData.sect}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 flex items-center gap-1 justify-start px-1">اپنے بارے میں مختصر تعارف <AlignRight size={10} /></label>
            <textarea name="intro" rows="2" value={formData.intro} onChange={handleChange} className="w-full bg-[#F5E6D3]/20 border border-transparent focus:border-[#D4AF37] rounded-xl p-3 text-xs font-bold text-[#4A0E0E] outline-none resize-none text-right transition" placeholder="اپنی عادات و اطوار بیان کریں..." />
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9] to-transparent z-40">
        <button type="button" onClick={handleSubmit} className="w-full h-14 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all text-xs tracking-wider border border-[#D4AF37]/30">
          <span>معلومات محفوظ کریں</span>
          <Save size={16} />
        </button>
      </div>

      <SelectionModal isOpen={showReligionModal} onClose={() => setShowReligionModal(false)} title="مذہب منتخب کریں" options={Object.keys(religionData)} onSelect={(val) => setFormData(prev => ({ ...prev, religion: val, sect: religionData[val][0] }))} />
      <SelectionModal isOpen={showSectModal} onClose={() => setShowSectModal(false)} title="مسلک منتخب کریں" options={religionData[formData.religion] || ["دیگر"]} onSelect={(val) => setFormData(prev => ({ ...prev, sect: val }))} />
    </div>
  );
};

export default EditProfileForm;
