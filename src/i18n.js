import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  // 🇵🇰 اردو ترجمہ (RTL پروٹیکشن کے ساتھ)
  ur: {
    translation: {
      marriage: 'شادی سروس',
      search_placeholder: 'یہاں تلاش کریں...',
      age: 'عمر',
      prof: 'پیشہ',
      top_matches: 'معزز رشتے',
      explore_all: 'سب دیکھیں',
      view_profile: 'پروفائل دیکھیں',
      connect: 'رابطہ کریں',
      search_results: 'تلاش کے نتائج',
      
      // باٹم نیویگیشن بار کے ایکٹو کیز
      nav_home: 'ہوم',
      nav_matches: 'میچز',
      nav_chat: 'چیٹ',
      nav_activity: 'ایکٹیویٹی',
      nav_profile: 'پروفائل',

      // پروفیشنز (Job Keys)
      doctor: 'ڈاکٹر',
      designer: 'ڈیزائنر',
      engineer: 'انجینئر',
      teacher: 'ٹیچر',
      manager: 'مینیجر',
      banker: 'بینکر',
      artist: 'آرٹسٹ',
      writer: 'رائٹر',
      nurse: 'نرس',
      consultant: 'کنسلٹنٹ',

      // شہر (City Keys)
      lahore: 'لاہور',
      karachi: 'کراچی',
      islamabad: 'اسلام آباد',
      multan: 'ملتان',
      rawalpindi: 'راولپنڈی',
      faisalabad: 'فیصل آباد',
      peshawar: 'پشاور',
      quetta: 'کوئٹہ',
      sialkot: 'سیالکوٹ',
      gujranwala: 'گوجرانوالہ',
      pakistan: 'پاکستان',

      // ٹرسٹ بار لیبلز
      verified_label: '100% تصدیق شدہ',
      verified_sub: 'شناختی کارڈ ویریفائیڈ',
      privacy_label: 'محفوظ پرائیویسی',
      privacy_sub: 'ڈیٹا مکمل پوشیدہ',
      serious_label: 'سنجیدہ رشتے',
      serious_sub: 'صرف فیملی ممبرز',

      // لائیو اسٹیٹس بار
      status_premium: 'پریمیم ممبر',
      status_exclusive: 'خصوصی',
      status_inprogress: 'جاری ہے',
      status_viewed: 'دیکھے گئے'
    }
  },
  
  // 🇬🇧 انگلش ترجمہ (فال بیک پروٹیکشن)
  en: {
    translation: {
      marriage: 'MARRIAGE',
      search_placeholder: 'Search here...',
      age: 'Age',
      prof: 'Profession',
      top_matches: 'Top Matches',
      explore_all: 'Explore All',
      view_profile: 'View Profile',
      connect: 'Connect',
      search_results: 'Search Results',
      
      nav_home: 'Home',
      nav_matches: 'Matches',
      nav_chat: 'Chat',
      nav_activity: 'Activity',
      nav_profile: 'Profile',

      doctor: 'Doctor',
      designer: 'Designer',
      engineer: 'Engineer',
      teacher: 'Teacher',
      manager: 'Manager',
      banker: 'Banker',
      artist: 'Artist',
      writer: 'Writer',
      nurse: 'Nurse',
      consultant: 'Consultant',

      lahore: 'Lahore',
      karachi: 'Karachi',
      islamabad: 'Islamabad',
      multan: 'Multan',
      rawalpindi: 'Rawalpindi',
      faisalabad: 'Faisalabad',
      peshawar: 'Peshawar',
      quetta: 'Quetta',
      sialkot: 'Sialkot',
      gujranwala: 'Gujranwala',
      pakistan: 'Pakistan',

      verified_label: '100% Verified',
      verified_sub: 'Profiles Manually Verified',
      privacy_label: 'Privacy Focused',
      privacy_sub: 'Your privacy is top priority',
      serious_label: 'Serious Matches',
      serious_sub: 'Connect with serious partners',

      status_premium: 'PREMIUM MEMBER',
      status_exclusive: 'Exclusive',
      status_inprogress: 'In Progress',
      status_viewed: 'Viewed'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ur', // ایپ اوپن ہوتے ہی ڈیفالٹ زبان اردو (RTL) سیٹ رہے گی
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
