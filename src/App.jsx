
import React, { useState, useEffect } from 'react';

import { db } from './utils/firebase';

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import Discover from './pages/Discover';

import { Search, Bell, Menu, Heart, MessageCircle, User, Compass } from 'lucide-react';



const App = () => {

  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [rotation, setRotation] = useState(0);



  useEffect(() => {

    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setProfiles(data);

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);



  if (loading) return (

    <div className="min-h-screen flex items-center justify-center bg-[#4A0E0E] text-[#D4AF37]">

      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div>

    </div>

  );



  return (

    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans">

      

      {/* Header Section */}

      <header className="p-6 flex items-center justify-between">

        <Menu className="text-[#4A0E0E]" />

        <div className="flex flex-col items-center">

           <img src="/images/Logo.png" alt="Azwaj" className="h-12 mb-1" />

           <h1 className="text-2xl font-serif font-bold text-[#4A0E0E]">Azwaj</h1>

        </div>

        <div className="relative">

          <Bell className="text-[#4A0E0E]" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full border-2 border-white"></span>

        </div>

      </header>



      {/* Search Bar */}

      <div className="px-6 mb-4">

        <div className="relative flex items-center bg-white/50 border border-gray-200 rounded-full px-4 py-3 shadow-sm">

          <Search size={18} className="text-gray-400" />

          <input 

            type="text" 

            placeholder="Search by name, city or profession..." 

            className="bg-transparent w-full px-3 outline-none text-sm"

          />

        </div>

      </div>



      {/* Discover Component (Main Logic) */}

      <Discover profiles={profiles} rotation={rotation} setRotation={setRotation} />



      {/* Bottom Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around p-4 rounded-t-[30px] shadow-2xl z-50">

        <button className="flex flex-col items-center text-[#4A0E0E]"><Compass size={24} /><span className="text-[10px] mt-1">Discover</span></button>

        <button className="flex flex-col items-center text-gray-400"><Heart size={24} /><span className="text-[10px] mt-1">Matches</span></button>

        <div className="relative -top-8 bg-[#4A0E0E] p-4 rounded-full border-[6px] border-[#FDF5F5] text-[#D4AF37] shadow-xl">

          <Heart size={28} fill="currentColor" />

        </div>

        <button className="flex flex-col items-center text-gray-400"><MessageCircle size={24} /><span className="text-[10px] mt-1">Messages</span></button>

        <button className="flex flex-col items-center text-gray-400"><User size={24} /><span className="text-[10px] mt-1">Profile</span></button>

      </nav>

    </div>

  );

};



export default App;

