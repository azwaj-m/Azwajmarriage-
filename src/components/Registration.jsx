import React, { useState } from 'react';
import { db, auth } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Registration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    dn: '', religion: '', sect: '', job: '', hobbies: '', bio: '', age: '', city: '',
    p: { n: 0, ph: 0, ad: 0 } // Default Privacy: Hidden
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "profiles", auth.currentUser.uid), {
        ...formData,
        uid: auth.currentUser.uid,
        fn: auth.currentUser.displayName || "صارف", // Original Name from Google/Phone
        email: auth.currentUser.email || "",
        ph: auth.currentUser.phoneNumber || ""
      });
      onComplete();
    } catch (err) { alert("Error saving profile"); }
  };

  return (
    <div className="p-8 bg-[#FDF5F5] min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-black text-[#4A0E0E] mb-6 text-center italic">اپنا پروفائل مکمل کریں</h2>
      <form onSubmit={handleSubmit} className="space-y-4 pb-20">
        <input placeholder="آپشنل نام (ڈسپلے نام)" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, dn: e.target.value})} required />
        
        <div className="flex gap-2">
          <select className="w-1/2 p-4 rounded-2xl border bg-white" onChange={e => setFormData({...formData, religion: e.target.value})}>
            <option>مذہب منتخب کریں</option>
            <option>اسلام</option><option>عیسائیت</option><option>ہندو</option><option>سکھ</option>
          </select>
          <input placeholder="مسلک (مثلا: اہل سنت)" className="w-1/2 p-4 rounded-2xl border" onChange={e => setFormData({...formData, sect: e.target.value})} />
        </div>

        <input placeholder="کاروبار / ملازمت" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, job: e.target.value})} />
        <input placeholder="پسندیدہ مشاغل (Hobbies)" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, hobbies: e.target.value})} />
        <textarea placeholder="مختصر تعارف..." className="w-full p-4 rounded-2xl border h-32" onChange={e => setFormData({...formData, bio: e.target.value})} />
        
        <div className="flex gap-2">
          <input placeholder="عمر" className="w-1/2 p-4 rounded-2xl border" onChange={e => setFormData({...formData, age: e.target.value})} />
          <input placeholder="شہر" className="w-1/2 p-4 rounded-2xl border" onChange={e => setFormData({...formData, city: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-[#4A0E0E] text-[#D4AF37] p-5 rounded-2xl font-black shadow-xl">پروفائل محفوظ کریں</button>
      </form>
    </div>
  );
};

export default Registration;
