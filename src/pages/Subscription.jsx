
import React, { useState } from "react";
import {
  Crown,
  ShieldCheck,
  Eye,
  MessageCircle,
  BadgeCheck,
  Heart,
  User,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Landmark,
  ChevronDown,
  Sparkles,
  Zap,
  Check
} from "lucide-react";
import { PaymentService } from "../services/PaymentService";

export default function Subscription({ onBack, setPage }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    { id: "silver", name: "SILVER", duration: "1 MONTH", pkr: "999", crown: "🥈", color: "from-gray-300 to-gray-500", shadow: "shadow-gray-400/20", features: ["Unlimited Messages", "Full Profile Access", "Standard Badge", "See Visitors"] },
    { id: "gold", name: "GOLD", duration: "3 MONTHS", pkr: "1999", crown: "👑", popular: true, color: "from-yellow-400 via-[#D4AF37] to-yellow-600", shadow: "shadow-[#D4AF37]/40", features: ["Unlimited Messages", "Full Profile Access", "Highlighted Badge", "Priority Support", "Profile Boost"] },
    { id: "platinum", name: "PLATINUM", duration: "6 MONTHS", pkr: "2999", crown: "💎", color: "from-slate-200 via-slate-400 to-slate-600", shadow: "shadow-slate-400/20", features: ["Unlimited Messages", "Full Profile Access", "VIP Badge", "Priority Support", "Profile Boost", "Top Search Ranking"] }
  ];

  const benefits = [
    { id: "msg", icon: <MessageCircle size={22} />, title: "Unlimited Messages", desc: "Connect without limits." },
    { id: "prof", icon: <User size={22} />, title: "Profile Access", desc: "View full bio & photos." },
    { id: "badge", icon: <BadgeCheck size={22} />, title: "Royal Badge", desc: "Stand out from others." },
    { id: "visitors", icon: <Eye size={22} />, title: "See Visitors", desc: "Track profile views." }
  ];

  const faqs = [
    { q: "کیا میں سبسکرپشن کسی بھی وقت ختم کر سکتا ہوں؟", a: "جی ہاں، آپ سیٹنگز سے کسی بھی وقت سبسکرپشن کینسل کر سکتے ہیں۔" },
    { q: "کیا میری پیمنٹ معلومات محفوظ ہیں؟", a: "بالکل، تمام ٹرانزیکشنز SSL انکرپشن کے ساتھ مکمل محفوظ ہیں۔" },
    { q: "کیا یہ خود بخود رینیو ہوگا؟", a: "نہیں، لوکل پیمنٹ میتھڈز میں آپ کو ہر بار خود اجازت دینی ہوتی ہے۔" }
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await PaymentService.processPayment({ plan: selectedPlan, method: paymentMethod, phone: mobileNumber });
      setPaymentStatus(res);
    } catch (err) { console.log(err); }
    setLoading(false);
  };

  const handleNavClick = (pageName) => {
    if (setPage) setPage(pageName);
    else if (onBack && pageName === "HOME") onBack();
  };

  return (
    <div className="min-h-screen bg-[#1a0007] text-white pb-32 font-sans selection:bg-[#D4AF37]" dir="rtl">
      {/* LUXURY BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#4a0018] via-[#1a0007] to-black pointer-events-none"></div>

      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#2b000d]/80 border-b border-[#D4AF37]/20 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <button onClick={() => handleNavClick("ProfileManager")} className="relative active:scale-90 transition-all">
            <img src="/images/avatar.png" className="w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20" alt="Me" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#2b000d]"></div>
          </button>
          <div className="text-center">
            <h1 className="text-[#D4AF37] text-lg font-black tracking-widest drop-shadow-sm">AZWAJ PREMIUM</h1>
            <div className="flex items-center justify-center gap-1 opacity-60">
              <Sparkles size={10} className="text-[#D4AF37]" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">Luxury Matrimony</span>
            </div>
          </div>
          <button onClick={() => handleNavClick("HOME")} className="bg-white/5 p-2 rounded-full border border-white/10 active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-[#D4AF37] rotate-180" />
          </button>
        </div>
      </div>

      <div className="relative z-10">
        {/* FULL SIZE PREMIUM STICKER UNDER HEADER */}
        <div className="w-full flex justify-center py-4 bg-gradient-to-b from-[#2b000d]/50 to-transparent">
          <img 
            src="/images/premiam-stekr.png" 
            alt="Premium Sticker" 
            className="w-full max-w-[350px] object-contain animate-pulse duration-[3000ms]"
          />
        </div>

        {/* HERO CARD */}
        <div className="mx-4 mt-2 relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FDFBF7] to-[#f3e5d8] p-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A0E0E]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-[60%]">
              <span className="inline-block bg-[#4A0E0E] text-[#D4AF37] px-3 py-1 rounded-full text-[8px] font-black mb-3">LIMITED OFFER</span>
              <h2 className="text-[#4A0E0E] text-3xl font-black leading-tight italic">Be Premium,<br/>Find Love.</h2>
              <button onClick={() => handleNavClick("explore")} className="mt-5 flex items-center gap-2 bg-[#4A0E0E] text-[#D4AF37] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-xl hover:shadow-[#4A0E0E]/40 active:scale-95 transition-all">
                Start Exploring <Zap size={12} fill="currentColor" />
              </button>
            </div>
            <div className="w-[35%] drop-shadow-2xl">
              <img src="/images/gift.png" alt="Gift" className="w-full h-auto object-contain scale-125" />
            </div>
          </div>
        </div>

        {/* BENEFITS CHIPS */}
        <div className="mx-4 mt-8">
           <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
            {benefits.map((item, index) => (
              <div key={index} className="flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-[2rem] flex items-center gap-3 active:scale-95 transition-all">
                <div className="bg-[#D4AF37] p-2 rounded-full text-[#1a0007] shadow-lg shadow-[#D4AF37]/20">{item.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-white">{item.title}</p>
                  <p className="text-[8px] text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLANS SECTION */}
        <div className="px-4 mt-6">
          {!selectedPlan ? (
            <div className="grid grid-cols-1 gap-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative group bg-white/5 backdrop-blur-md border-2 p-5 rounded-[2.5rem] flex items-center justify-between transition-all active:scale-[0.98] ${plan.popular ? "border-[#D4AF37] bg-white/[0.08]" : "border-white/10"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg ${plan.shadow}`}>
                      <Crown size={28} className="text-[#1a0007]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight">{plan.name}</h4>
                      <p className="text-xs text-[#D4AF37] font-bold">{plan.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black">Rs {plan.pkr}</div>
                    <div className="text-[8px] opacity-50 font-bold uppercase">Manual Payment</div>
                  </div>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1a0007] text-[8px] px-4 py-1 rounded-full font-black shadow-lg">MOST CHOSEN</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FDFBF7] rounded-[2.5rem] p-8 text-[#4A0E0E] shadow-2xl border-t-8 border-[#D4AF37] animate-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-8">
                <button onClick={() => {setSelectedPlan(null); setPaymentMethod(null);}} className="text-red-500 text-[10px] font-black underline decoration-2">BACK TO PLANS</button>
                <div className="px-4 py-1 bg-[#4A0E0E] text-[#D4AF37] rounded-full text-[10px] font-black tracking-widest">{selectedPlan.name}</div>
              </div>

              {/* PAYMENT METHODS WITH IMAGES */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button onClick={() => setPaymentMethod("easypaisa")} className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-90 ${paymentMethod === 'easypaisa' ? "border-[#4A0E0E] bg-white shadow-xl" : "border-gray-100"}`}>
                  <img src="/images/easypaisa.png" alt="EasyPaisa" className="h-8 object-contain" />
                  <span className="text-[7px] font-black uppercase mt-1">easypaisa</span>
                </button>
                <button onClick={() => setPaymentMethod("jazzcash")} className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-90 ${paymentMethod === 'jazzcash' ? "border-[#4A0E0E] bg-white shadow-xl" : "border-gray-100"}`}>
                  <img src="/images/jazzcash.png" alt="JazzCash" className="h-8 object-contain" />
                  <span className="text-[7px] font-black uppercase mt-1">jazzcash</span>
                </button>
                <button onClick={() => setPaymentMethod("card")} className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-90 ${paymentMethod === 'card' ? "border-[#4A0E0E] bg-white shadow-xl" : "border-gray-100"}`}>
                  <img src="/images/card.png" alt="Card" className="h-8 object-contain" />
                  <span className="text-[7px] font-black uppercase mt-1">Debit Card</span>
                </button>
              </div>

              {paymentMethod && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="relative">
                    <input type="tel" placeholder="03xx xxxxxxx" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full p-5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-center text-xl font-black outline-none focus:border-[#4A0E0E] transition-all" required />
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-20"><Smartphone size={20}/></div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-2xl font-black text-sm uppercase shadow-2xl shadow-[#4A0E0E]/40 active:scale-95 transition-all">
                    {loading ? "Verifying..." : `Secure Pay Rs ${selectedPlan.pkr}`}
                  </button>
                </form>
              )}
              {paymentStatus && <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-2xl text-center text-green-700 font-black text-xs animate-bounce">✅ Payment Verified! Welcome King!</div>}
            </div>
          )}
        </div>

        {/* TRUST SIGNALS */}
        <div className="mx-4 mt-8 flex justify-center items-center gap-6 py-4 border-y border-white/5 opacity-40">
           <div className="flex items-center gap-1 text-[8px] font-bold"><ShieldCheck size={12}/> SSL ENCRYPTED</div>
           <div className="flex items-center gap-1 text-[8px] font-bold"><Landmark size={12}/> BANK SECURE</div>
           <div className="flex items-center gap-1 text-[8px] font-bold"><Heart size={12}/> 100% HALAL</div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mx-4 mt-8 space-y-3">
          <h3 className="text-center text-[#D4AF37] text-xs font-black mb-4">FAQS - اکثر پوچھے گئے سوالات</h3>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 flex justify-between items-center active:bg-white/5 transition-all">
                <span className="text-[10px] font-black text-right">{faq.q}</span>
                <ChevronDown size={14} className={`text-[#D4AF37] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-[9px] font-medium text-white/60 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-300">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


