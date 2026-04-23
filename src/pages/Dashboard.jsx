import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ShieldCheck, UserCheck, XCircle, DollarSign, Eye } from 'lucide-react';

const Dashboard = () => {
  const [pendingProfiles, setPendingProfiles] = useState([]);
  const [payments, setPayments] = useState([]);

  // 1. وہ پروفائلز جو ابھی منظور نہیں ہوئیں
  useEffect(() => {
    const q = query(collection(db, "profiles"), where("isApproved", "==", false));
    return onSnapshot(q, (snap) => {
      setPendingProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleApprove = async (uid) => {
    try {
      const userRef = doc(db, "profiles", uid);
      await updateDoc(userRef, {
        isApproved: true,
        verifiedAt: new Date(),
        status: "verified"
      });
      alert("پروفائل منظور کر لی گئی ہے");
    } catch (e) { alert("تصدیق میں غلطی: " + e.message); }
  };

  const handleReject = async (uid) => {
    if(window.confirm("کیا آپ واقعی اس پروفائل کو حذف کرنا چاہتے ہیں؟")) {
      await deleteDoc(doc(db, "profiles", uid));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans" dir="rtl">
      <header className="flex justify-between items-center mb-10 bg-[#4A0E0E] p-6 rounded-3xl shadow-lg">
        <h1 className="text-2xl font-black text-[#D4AF37] flex items-center gap-3">
          <ShieldCheck size={32} /> AZWAJ ADMIN CONTROL
        </h1>
        <div className="text-white text-xs bg-white/10 px-4 py-2 rounded-full">سیکیورٹی اسٹیٹس: محفوظ</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Profiles Section */}
        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-700">
            <UserCheck className="text-blue-500" /> نئی پروفائلز ({pendingProfiles.length})
          </h2>
          <div className="space-y-4">
            {pendingProfiles.map(p => (
              <div key={p.id} className="p-5 bg-gray-50 rounded-3xl flex justify-between items-center hover:bg-gray-100 transition-all">
                <div>
                  <p className="font-black text-[#4A0E0E]">{p.fn || p.dn}</p>
                  <p className="text-[10px] text-gray-400">{p.religion} | {p.sect} | {p.city}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(p.id)} className="bg-green-600 text-white p-2 rounded-xl"><UserCheck size={18}/></button>
                  <button onClick={() => handleReject(p.id)} className="bg-red-600 text-white p-2 rounded-xl"><XCircle size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Verification Section */}
        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-700">
            <DollarSign className="text-green-500" /> ادائیگی کی تصدیق
          </h2>
          <p className="text-xs text-gray-400 italic">یہاں وہ صارفین نظر آئیں گے جنہوں نے رسید اپلوڈ کی ہوگی۔</p>
          {/* ادائیگیوں کا لاجک یہاں آئے گا */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
