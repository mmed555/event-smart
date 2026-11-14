import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

export const DICTIONARY_AR: Record<string, string> = {
  // Navigation & Shell
  'Discover': 'استكشاف',
  'Explore': 'استكشاف',
  'Events': 'الفعاليات',
  'Tickets': 'التذاكر',
  'My Tickets': 'تذاكري',
  'AI Assistant': 'المساعد الذكي',
  'Favorites': 'المُفضّلة',
  'Saved events': 'الفعاليات المحفوظة',
  'Notifications': 'الإشعارات',
  'Sign In': 'تسجيل الدخول',
  'Sign out': 'تسجيل الخروج',
  'Create Account': 'إنشاء حساب',
  'Welcome back': 'مرحبًا بعودتك',
  'Sign in to continue to Eviq.': 'سجّل الدخول للمتابعة إلى إيفيك.',
  'Sign in as': 'تسجيل الدخول كـ',
  'Discover & book events': 'اكتشف الفعاليات واحجزها',
  'Create & manage events': 'أنشئ الفعاليات وأدرها',
  'Offer event services to businesses': 'قدّم خدمات الفعاليات للشركات',
  'Platform governance': 'حوكمة المنصة',
  'Email Address': 'البريد الإلكتروني',
  'Password': 'كلمة المرور',
  'Forgot password?': 'نسيت كلمة المرور؟',
  'Or continue with': 'أو تابع عبر',
  'Sign in with Google': 'تسجيل الدخول عبر Google',
  'Sign in with LinkedIn': 'تسجيل الدخول عبر LinkedIn',
  'Fill with demo credentials': 'املأ ببيانات تجريبية',
  'You will be redirected to:': 'ستنتقل إلى:',
  'One platform for attendees, organizers, and vendors.': 'منصة واحدة للحضور والمنظمين وموردي الفعاليات.',
  'Instant QR tickets with secure check-in': 'تذاكر QR فورية مع تسجيل دخول آمن',
  'Smart bilingual AI recommendations': 'توصيات ذكية بالعربية والإنجليزية',
  'Verified vendor marketplace with contracting': 'سوق موردين معتمدين بالتعاقد',
  'We sourced sound, lighting and catering for a 500-person summit in a single afternoon!': 'وفّرنا الصوت والإضاءة والضيافة لقمّة تضم 500 شخص في ظهيرة واحدة!',
  'Mona Adel · TechEvents Egypt': 'منى عادل · TechEvents Egypt',
  'Profile': 'الملف الشخصي',
  'Dashboard': 'لوحة التحكم',
  'Organizer': 'منظّم',
  'Attendee': 'حاضر',
  'Vendor': 'مورّد',
  'Super Admin': 'المشرف العام',
  'Design System': 'نظام التصميم',
  'Foundations & Components': 'الأسس والمكوّنات',
  'Mobile App': 'تطبيق الموبايل',
  'Interactive Companion App': 'التطبيق المرافق التفاعلي',

  // Landing Page
  'Discover, Plan & Experience': 'استكشف، خطط، وعِش تجربة',
  'Extraordinary Events': 'فعاليات استثنائية',
  'with AI': 'بالذكاء الاصطناعي',
  'Book conferences, workshops and festivals across Egypt — or plan your own with AI logistics and verified B2B vendors.':
    'احجز المؤتمرات وورش العمل والمهرجانات في جميع أنحاء مصر — أو خطط لفعاليتك الخاصة بدعم الذكاء الاصطناعي وموردي الخدمات المعتمدين.',
  'Search events, venues…': 'ابحث عن فعالية، مكان، أو متحدث…',
  'Any category': 'جميع الفئات',
  'Any city': 'جميع المدن',
  'Any date': 'أي تاريخ',
  'Explore Events': 'استكشف الفعاليات',
  'Featured Events': 'فعاليات مميزة مختارة',
  'Hand-picked highlights with high attendee satisfaction across Egypt':
    'أبرز الفعاليات المميزة مع أعلى تقييمات رضا الحضور في مصر',
  'Explore Categories': 'استكشف حسب التصنيف',
  'Browse events tailored to your industry, passion and learning goals':
    'تصفح الفعاليات المصممة خصيصاً لمجال عملك واهتماماتك',
  'Trusted by Organizers & Attendees': 'موثوق من آلاف المنظمين والرواد',
  'Tickets Reserved': 'تذكرة محجوزة',
  'Verified B2B Vendors': 'شركة خدمات معتمدة',
  'AI Recommendations / Day': 'توصية ذكية يومياً',
  'Gate Check-in Speed': 'سرعة التحقق بالبوابة',
  'What Community Leaders Say': 'ماذا يقول قادة المجتمع',
  'Ready to plan your next event?': 'هل أنت مستعد لتنظيم فعاليتك القادمة؟',
  'Launch your conference, automate ticket sales, and procure verified sound, lighting and venue equipment with AI assistance.':
    'أطلق مؤتمرك، ونظّم بيع التذاكر، واحصل على تجهيزات الصوت والإضاءة المعتمدة بلمسة ذكية.',
  'Create an Event': 'أنشئ فعالية الآن',
  'Become a Verified Vendor': 'انضم كمورد معتمد',

  // Filters & Discovery
  'Search & Filters': 'البحث والتصفية',
  'Filter Events': 'تصفية الفعاليات',
  'Reset filters': 'إعادة ضبط الفلاتر',
  'Category': 'التصنيف',
  'All categories': 'جميع التصنيفات',
  'Location': 'المدينة',
  'All cities': 'جميع المدن',
  'Date': 'التاريخ',
  'This weekend': 'عطلة نهاية الأسبوع',
  'Next week': 'الأسبوع القادم',
  'This month': 'هذا الشهر',
  'Price Range': 'نطاق السعر',
  'All prices': 'جميع الأسعار',
  'Free events': 'فعاليات مجانية',
  'Under 200 EGP': 'أقل من 200 جنيه',
  '200 - 500 EGP': '200 إلى 500 جنيه',
  '500+ EGP': 'أكثر من 500 جنيه',
  'No events match your criteria': 'لا توجد فعاليات مطابقة لشروط البحث',
  'Try adjusting your filters or search keywords.': 'جرّب تعديل خيارات التصفية أو كلمات البحث.',

  // Event Details & Booking
  'About this event': 'عن الفعالية',
  'Date & Time': 'التاريخ والوقت',
  'Venue & Location': 'المكان والعنوان',
  'Open in Maps': 'افتح في الخرائط',
  'Organized by': 'الجهة المنظمة',
  'Speakers': 'المتحدثون',
  'Event Schedule': 'جدول الفعالية',
  'Sponsors': 'الرعاة',
  'Ticket Tiers': 'فئات التذاكر',
  'Select Tickets': 'اختر التذاكر',
  'left': 'متبقي',
  'Sold Out': 'نفدت الكمية',
  'Book Tickets': 'احجز التذاكر الآن',
  'Checkout': 'إتمام الحجز والدفع',
  'Order Summary': 'ملخص الطلب',
  'Total': 'الإجمالي',
  'EGP': 'ج.م',
  'Free': 'مجاني',
  'Pay & Confirm': 'ادفع وأكد الحجز (Mock Sandbox)',
  'Processing Payment…': 'جاري محاكاة عملية الدفع…',
  'Booking Confirmed!': 'تم تأكيد حجزك بنجاح!',
  'Your digital QR tickets are ready in your wallet.': 'تذاكر الـ QR الرقمية المشفرة جاهزة الآن في محفظتك.',
  'View My Tickets': 'عرض تذاكري',

  // Tickets Wallet
  'Digital Ticket Wallet': 'محفظة التذاكر الرقمية',
  'Present this unforgeable QR code at the event gate': 'أبرز رمز الـ QR هذا لمسؤولي البوابة عند الدخول',
  'Gate': 'البوابة',
  'Seat': 'المقعد',
  'Valid': 'صالحة للدخول',
  'Used': 'تم استخدامها',
  'Cancelled': 'ملغاة',
  'Download PDF': 'تحميل PDF',
  'Add to Calendar': 'إضافة للتقويم',
  'No tickets yet': 'ليس لديك أي تذاكر محجوزة حتى الآن',
  'Browse events and reserve your first pass.': 'استكشف الفعاليات المتاحة واحجز تذكرتك الأولى الآن.',

  // AI Assistant
  'AI Event Assistant': 'المساعد الذكي للفعاليات',
  'Ask anything in natural English or Arabic': 'تحدث باللغة الطبيعية بالإنجليزية أو العربية',
  'Type your request, e.g. "Find tech workshops in Cairo under 500 EGP"':
    'اكتب طلبك، مثل: "عايز ورش عمل تك في القاهرة وميزانية أقل من 500 جنيه"',
  'Extracting criteria:': 'تحليل معايير البحث الذكية:',
  'Suggested Events': 'الفعاليات المقترحة:',

  // Common UI
  'Close': 'إغلاق',
  'Back': 'رجوع',
  'Cancel': 'إلغاء',
  'Confirm': 'تأكيد',
  'Save': 'حفظ',
  'Loading…': 'جاري التحميل…',
  'Match': 'توافق',
  'View Details': 'عرض التفاصيل',
  'Mark all read': 'تحديد الكل كمقروء',
};

interface I18nContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('eviq-lang') as Language) || 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eviq-lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
  }, [language, dir]);

  const t = (key: string, fallback?: string): string => {
    if (language === 'ar') {
      return DICTIONARY_AR[key] || fallback || key;
    }
    return fallback || key;
  };

  return (
    <I18nContext.Provider value={{ language, dir, toggleLanguage, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
