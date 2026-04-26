
import React, { useState, useEffect } from 'react';

import { Menu, Bell, X, Plus, User, LogOut, Heart, CheckCircle } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

import { db } from './utils/firebase';

import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

import Discover from './pages/Discover';



const App = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [profiles, setProfiles] = useState([]);

  const [rotation, setRotation] = useState(0);



  // فارم ڈیٹا سٹیٹ

  const [formData, setFormData] = useState({

    fullName: '',

    age: '',

    education: '',

    city: '',

    profileImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'

  });



  // فائر بیس سے ڈیٹا لوڈ کرنا

  useEffect(() => {

    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setProfiles(data.length > 0 ? data : [

        { 

          id: 'default', 

          fullName: "Ayesha", 

          age: 24, 

          education: "Psychologist", 

          city: "Lahore", 

          profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" 

        }

      ]);

    });

    return () => unsubscribe();

  }, []);



  // ڈیٹا سیو کرنے کا فنکشن

  const handleSaveProfile = async () => {

    if (!formData.fullName || !formData.age) return alert("براہ کرم تمام معلومات درج کریں");

    try {

      await addDoc(collection(db, "profiles"), { 

        ...formData, 

        createdAt: serverTimestamp(),

        isVerified: true 

      });

      setIsUploadOpen(false);

      setFormData({ fullName: '', age: '', education: '', city: '', profileImg: formData.profileImg });

      alert("پروفائل محفوظ کر لیا گیا!");

    } catch (e) { 

      console.error("Error adding document: ", e); 

      alert("محفوظ کرنے میں غلطی ہوئی");

    }

  };



  return (

    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans" dir="rtl">

      

      {/* Sidebar / Drawer */}

      <AnimatePresence>

        {isDrawerOpen && (

          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[101] flex">

            <div className="w-[80%] bg-[#4A0E0E] p-8 text-[#D4AF37] shadow-2xl">

              <X className="mb-10 cursor-pointer" onClick={() => setIsDrawerOpen(false)} />

              <nav className="space-y-8 text-xl">

                <div className="flex items-center gap-4 cursor-pointer"><User /> میرا پروفائل</div>

                <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setIsUploadOpen(true); setIsDrawerOpen(false); }}>

                  <Plus /> رشتہ شامل کریں

                </div>

                <div className="flex items-center gap-4 text-red-400 mt-20 cursor-pointer"><LogOut /> لاگ آؤٹ</div>

              </nav>

            </div>

            <div className="flex-grow bg-black/50" onClick={() => setIsDrawerOpen(false)} />

          </motion.div>

        )}

      </AnimatePresence>



      {/* Header Section */}

      <header className="bg-[#4A0E0E] pt-12 pb-24 relative z-10 shadow-2xl overflow-hidden rounded-b-[100px] border-b-4 border-yellow-600/50">

        <div className="flex justify-between items-center px-6 mb-4 relative z-20">

          <Menu className="text-yellow-500 cursor-pointer" onClick={() => setIsDrawerOpen(true)} />

          <Bell className="text-yellow-500" />

        </div>

        <div className="flex flex-col items-center relative z-20">

          <h1 className="text-yellow-500 text-4xl font-serif font-bold tracking-tighter italic uppercase">Azwaj</h1>

          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-2"></div>

        </div>

      </header>



      {/* Main Discover Component */}

      <Discover 

        profiles={profiles} 

        rotation={rotation} 

        setRotation={setRotation} 

      />



      {/* Features Banner */}

      <div className="grid grid-cols-4 gap-2 bg-white/80 backdrop-blur-sm mx-6 p-4 rounded-3xl border border-gray-100 shadow-lg mb-20 relative z-40">

        {[

          { icon: <CheckCircle size={20} />, label: "Verified Profiles" },

          { icon: "🔒", label: "Private & Secure" },

          { icon: <Heart size={20} />, label: "Serious Matches" },

          { icon: "💬", label: "Meaningful Connections" }

        ].map((item, idx) => (

          <div key={idx} className={`flex flex-col items-center text-center ${idx !== 0 ? 'border-r border-gray-200' : ''}`}>

            <div className="text-yellow-600 mb-1">{item.icon}</div>

            <span className="text-[8px] font-bold leading-tight">{item.label}</span>

          </div>

        ))}

      </div>



      {/* Upload Profile Modal */}

      <AnimatePresence>

        {isUploadOpen && (

          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-white z-[200] p-8 text-right">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-2xl font-bold text-[#4A0E0E]">نیا پروفائل</h2>

              <X className="cursor-pointer" onClick={() => setIsUploadOpen(false)} />

            </div>

            <div className="space-y-4">

              <input type="text" placeholder="مکمل نام" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none" 

                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />

              <input type="number" placeholder="عمر" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none" 

                value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />

              <input type="text" placeholder="تعلیم / پیشہ" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none" 

                value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />

              <input type="text" placeholder="شہر" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none" 

                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />

              <button onClick={handleSaveProfile} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-3xl font-bold shadow-lg active:scale-95 transition-transform mt-4">

                محفوظ کریں

              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

};



export default App;

