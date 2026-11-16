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
  'Now with bilingual AI Assistant · English & العربية':
    'الآن مع المساعد الذكي ثنائي اللغة · English & العربية',
  'Trending:': 'الرائج الآن:',
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
  'Featured Events': 'فعاليات مميزة',
  'Hand-picked highlights with high attendee satisfaction across Egypt':
    'أبرز الفعاليات المميزة مع أعلى تقييمات رضا الحضور في مصر',
  'Explore Categories': 'استكشف حسب التصنيف',
  'Popular Categories': 'التصنيفات الشائعة',
  'Explore what\'s happening across Egypt': 'اكتشف ما يحدث في أنحاء مصر',
  'Browse events tailored to your industry, passion and learning goals':
    'تصفح الفعاليات المصممة خصيصاً لمجال عملك واهتماماتك',
  'upcoming events': 'فعالية قادمة',
  'Recommended for you': 'مقترح لك',
  'Recommended For You': 'مقترح لك',
  'Ranked by your AI preference profile — refine it any time with the AI Assistant.':
    'مرتّبة وفق ملف تفضيلاتك بالذكاء الاصطناعي — حدّثها في أي وقت مع المساعد الذكي.',
  'Refine with AI': 'تحسين بالذكاء الاصطناعي',
  'Trending This Week': 'الأكثر رواجًا هذا الأسبوع',
  'Hot': 'رائج',
  'Browse all': 'تصفّح الكل',
  'View all': 'عرض الكل',
  'Conversational AI': 'ذكاء اصطناعي محادث',
  'Just tell us what you\'re into.': 'فقط أخبرنا بما يهمك.',
  '"عايز ورشة ذكاء اصطناعي في القاهرة تحت ٥٠٠ جنيه" — our assistant understands English & Arabic, extracts your preferences, and finds your perfect match.':
    '«عايز ورشة ذكاء اصطناعي في القاهرة تحت ٥٠٠ جنيه» — مساعدنا يفهم العربية والإنجليزية، يستخرج تفضيلاتك، ويجد ما يناسبك تماماً.',
  'Launch AI Assistant': 'شغّل المساعد الذكي',
  'Domain · AI & Technology': 'المجال · الذكاء الاصطناعي والتقنية',
  'City · Cairo': 'المدينة · القاهرة',
  'Budget · Max 500 EGP': 'الميزانية · حتى 500 ج.م',
  'Date · March 2026': 'التاريخ · مارس 2026',
  'Format · listening…': 'نوع الحضور · جارٍ الاستماع…',
  'Top Organizers': 'أفضل المنظمين',
  'Trusted by thousands of attendees': 'موثوق من آلاف الحضور',
  'events': 'فعالية',
  'Follow': 'متابعة',
  'Following': 'تتابعه',
  'Unfollowed': 'تم إلغاء المتابعة',
  'Trusted by Organizers & Attendees': 'موثوق من آلاف المنظمين والرواد',
  'Attendees': 'الحضور',
  'Verified Vendors': 'موردون معتمدون',
  'Average Rating': 'متوسط التقييم',
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
  'My Bookings & Tickets': 'حجوزاتي وتذاكري',
  'All your bookings, synced with mobile wallet': 'كل حجوزاتك، متزامنة مع محفظة الموبايل',
  'All': 'الكل',
  'Past': 'السابقة',
  'Upcoming': 'القادمة',
  'Payment Pending': 'الدفع معلق',
  'Complete payment to activate QR tickets.': 'أكمل الدفع لتفعيل تذاكر QR.',
  'Hide Tickets': 'إخفاء التذاكر',
  'Show Tickets': 'عرض التذاكر',
  'Pay Now': 'ادفع الآن',
  'Confirmed': 'مؤكد',
  'Pending': 'قيد الانتظار',
  'Reserved': 'محجوز',
  'Standard Ticket': 'تذكرة عادية',
  'Regular Ticket': 'تذكرة عادية',
  'VIP Ticket': 'تذكرة VIP',
  'Attendee Pass': 'تذكرة حضور',
  'View QR Code': 'عرض رمز QR',
  'Complete payment to activate QR pass': 'أكمل الدفع أولاً لتفعيل رمز الـ QR',
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
  'Single-scan anti-replay protection enforced by server transaction':
    'حماية ضد إعادة الاستخدام (Anti-Replay) مشفرة ومؤكدة عبر معاملة خادم مركزية',

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
