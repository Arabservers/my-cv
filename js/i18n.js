// Internationalization System
const translations = {
    ar: {
        // Navigation
        'nav.features': 'المميزات',
        'nav.templates': 'القوالب',
        'nav.pricing': 'الأسعار',
        'nav.start': 'ابدأ الآن',
        'nav.home': 'الرئيسية',

        // Hero
        'hero.badge': 'الأكثر استخداماً عربياً',
        'hero.title': 'أنشئ سيرتك الذاتية',
        'hero.titleHighlight': 'الاحترافية',
        'hero.subtitle': '12+ قالب احترافي، تصدير PDF، تصميم عصري. ابدأ مجاناً!',
        'hero.startFree': 'ابدأ مجاناً',
        'hero.viewTemplates': 'شاهد القوالب',
        'hero.users': 'مستخدم',
        'hero.cvs': 'سيرة ذاتية',
        'hero.templates': 'قالب',

        // Features
        'features.badge': 'لماذا My CV؟',
        'features.title': 'كل ما تحتاجه لسيرة ذاتية',
        'features.titleHighlight': 'مثالية',
        'features.templates': '12+ قالب',
        'features.templatesDesc': 'قوالب متنوعة لجميع المجالات',
        'features.fast': 'سريع وسهل',
        'features.fastDesc': 'أنشئ CV في 5 دقائق',
        'features.pdf': 'تصدير PDF',
        'features.pdfDesc': 'جودة عالية للطباعة',
        'features.unlimited': 'غير محدود',
        'features.unlimitedDesc': 'سير ذاتية لا نهائية مجاناً',
        'features.bilingual': 'عربي وإنجليزي',
        'features.bilingualDesc': 'دعم كامل للغتين',
        'features.responsive': 'متوافق',
        'features.responsiveDesc': 'يعمل على كل الأجهزة',

        // Templates
        'templates.badge': 'القوالب',
        'templates.title': 'قوالب',
        'templates.titleHighlight': 'احترافية',

        // How It Works
        'howItWorks.title': 'ثلاث خطوات',
        'howItWorks.titleHighlight': 'بسيطة',
        'howItWorks.step1': 'اختر قالب',
        'howItWorks.step1Desc': 'من 12+ قالب',
        'howItWorks.step2': 'أدخل بياناتك',
        'howItWorks.step2Desc': 'املأ النموذج',
        'howItWorks.step3': 'حمّل PDF',
        'howItWorks.step3Desc': 'جاهز للإرسال',

        // Pricing
        'pricing.badge': 'الأسعار',
        'pricing.title': 'خطط',
        'pricing.titleHighlight': 'مناسبة',
        'pricing.currency': 'ريال',
        'pricing.currencyMonth': 'ريال/شهر',
        'pricing.free': 'مجاني',
        'pricing.freeFeature1': 'سير ذاتية غير محدودة',
        'pricing.freeFeature2': 'كل القوالب',
        'pricing.freeFeature3': 'تصدير PDF',
        'pricing.freeFeature4': 'علامة مائية',
        'pricing.startFree': 'ابدأ مجاناً',
        'pricing.single': 'تحميل واحد',
        'pricing.singleFeature1': 'CV واحد',
        'pricing.singleFeature2': 'بدون علامة مائية',
        'pricing.singleFeature3': 'جودة عالية',
        'pricing.choosePlan': 'اختر الخطة',
        'pricing.monthly': 'شهري',
        'pricing.monthlyFeature1': 'تحميلات غير محدودة',
        'pricing.monthlyFeature2': 'بدون علامة مائية',
        'pricing.monthlyFeature3': 'قوالب حصرية',
        'pricing.monthlyFeature4': 'دعم أولوية',
        'pricing.subscribe': 'اشترك الآن',
        'pricing.popular': 'الأكثر طلباً',

        // CTA
        'cta.title': 'جاهز لبناء سيرتك الذاتية؟',
        'cta.subtitle': 'انضم لآلاف المستخدمين',
        'cta.button': 'ابدأ الآن',

        // Footer
        'footer.desc': 'صانع السيرة الذاتية الاحترافي',
        'footer.createCV': 'إنشاء CV',

        // Builder
        'builder.title': 'بيانات السيرة الذاتية',
        'builder.personal': 'المعلومات الشخصية',
        'builder.photo': 'الصورة الشخصية',
        'builder.photoUrl': 'أو أدخل رابط الصورة',
        'builder.firstName': 'الاسم الأول',
        'builder.lastName': 'اسم العائلة',
        'builder.jobTitle': 'المسمى الوظيفي',
        'builder.email': 'البريد الإلكتروني',
        'builder.phone': 'رقم الجوال',
        'builder.location': 'الموقع',
        'builder.linkedin': 'LinkedIn',
        'builder.website': 'الموقع الشخصي',
        'builder.github': 'GitHub',
        'builder.twitter': 'Twitter',
        'builder.summary': 'نبذة شخصية',
        'builder.experience': 'الخبرات العملية',
        'builder.addExperience': 'إضافة خبرة',
        'builder.education': 'التعليم',
        'builder.addEducation': 'إضافة تعليم',
        'builder.skills': 'المهارات',
        'builder.addSkill': 'إضافة مهارة',
        'builder.languages': 'اللغات',
        'builder.addLanguage': 'إضافة لغة',
        'builder.projects': 'المشاريع',
        'builder.addProject': 'إضافة مشروع',
        'builder.certifications': 'الشهادات',
        'builder.addCertification': 'إضافة شهادة',
        'builder.awards': 'الجوائز والإنجازات',
        'builder.addAward': 'إضافة جائزة',
        'builder.interests': 'الاهتمامات',
        'builder.references': 'المراجع',
        'builder.addReference': 'إضافة مرجع',
        'builder.template': 'القالب',
        'builder.preview': 'معاينة',
        'builder.download': 'تحميل PDF',
        'builder.from': 'من',
        'builder.to': 'إلى',
        'builder.present': 'حتى الآن',
        'builder.company': 'الشركة',
        'builder.position': 'المنصب',
        'builder.description': 'الوصف',
        'builder.degree': 'الدرجة العلمية',
        'builder.institution': 'الجامعة/المؤسسة',
        'builder.gpa': 'المعدل',
        'builder.projectName': 'اسم المشروع',
        'builder.projectLink': 'رابط المشروع',
        'builder.certName': 'اسم الشهادة',
        'builder.certIssuer': 'الجهة المانحة',
        'builder.certDate': 'تاريخ الحصول',
        'builder.awardName': 'اسم الجائزة',
        'builder.awardIssuer': 'الجهة المانحة',
        'builder.refName': 'الاسم',
        'builder.refPosition': 'المنصب',
        'builder.refCompany': 'الشركة',
        'builder.refEmail': 'البريد',
        'builder.refPhone': 'الهاتف',

        // Download Modal
        'download.title': 'تحميل السيرة الذاتية',
        'download.freeTitle': 'مجاني',
        'download.freeDesc': 'مع علامة مائية',
        'download.singleTitle': 'تحميل واحد',
        'download.singleDesc': 'بدون علامة مائية',
        'download.monthlyTitle': 'اشتراك شهري',
        'download.monthlyDesc': 'تحميلات غير محدودة',
        'download.bestValue': 'الأفضل قيمة',

        // Payment
        'payment.title': 'إتمام الدفع',
        'payment.loginPrompt': 'سجل دخول بحسابك لإتمام الدفع',
        'payment.googleLogin': 'تسجيل الدخول بـ Google',
        'payment.securePayment': 'إتمام الدفع الآمن',
        'payment.singleInfo': 'تحميل سيرة ذاتية واحدة بدون علامة مائية',
        'payment.monthlyInfo': 'اشتراك شهري - تحميلات غير محدودة بدون علامة مائية',

        // Success
        'success.title': 'تم بنجاح!',
        'success.ok': 'حسناً',
        'success.loginSuccess': 'تم تسجيل الدخول بنجاح!',
        'success.paymentSuccess': 'تم الدفع بنجاح! جاري تحميل السيرة الذاتية...',
        'success.downloadSuccess': 'تم تحميل السيرة الذاتية بنجاح!',

        // Templates List
        'template.modern': 'احترافي حديث',
        'template.modernDesc': 'تصميم عصري أنيق',
        'template.classic': 'كلاسيكي أنيق',
        'template.classicDesc': 'تصميم تقليدي راقي',
        'template.creative': 'إبداعي جريء',
        'template.creativeDesc': 'للمصممين والمبدعين',
        'template.minimal': 'بسيط نظيف',
        'template.minimalDesc': 'للجدية والوضوح',
        'template.executive': 'تنفيذي فاخر',
        'template.executiveDesc': 'للمدراء والقادة',
        'template.tech': 'مطور تقني',
        'template.techDesc': 'للمبرمجين والتقنيين',
        'template.designer': 'مصمم إبداعي',
        'template.designerDesc': 'للفنانين والمصممين',
        'template.graduate': 'خريج جديد',
        'template.graduateDesc': 'للطلاب وحديثي التخرج',
        'template.corporate': 'شركات',
        'template.corporateDesc': 'للشركات الكبرى',
        'template.elegant': 'راقي أنيق',
        'template.elegantDesc': 'تصميم فاخر',
        'template.bold': 'عصري جريء',
        'template.boldDesc': 'ألوان قوية وجذابة',
        'template.academic': 'أكاديمي',
        'template.academicDesc': 'للباحثين والأكاديميين',
        // New Templates
        'template.timeline': 'خط زمني',
        'template.timelineDesc': 'تصميم تفاعلي مع خط زمني',
        'template.split': 'مقسم احترافي',
        'template.splitDesc': 'تصميم مقسم انيق',
        'template.neon': 'نيون مضيء',
        'template.neonDesc': 'ألوان نيون جذابة',
        'template.luxury': 'فاخر ذهبي',
        'template.luxuryDesc': 'تصميم فاخر وراقي',
        'template.infographic': 'إنفوجرافيك',
        'template.infographicDesc': 'مع رسوم بيانية للمهارات',
        'template.dark': 'داكن احترافي',
        'template.darkDesc': 'تصميم داكن عصري',
        'template.mostPopular': 'الأكثر شعبية',
        'template.new': 'جديد',
        'template.premium': 'مميز',

        // Skill Levels
        'skill.expert': 'خبير',
        'skill.advanced': 'متقدم',
        'skill.intermediate': 'متوسط',
        'skill.beginner': 'مبتدئ',

        // Language Levels
        'lang.native': 'لغة أم',
        'lang.fluent': 'طلاقة',
        'lang.advanced': 'متقدم',
        'lang.intermediate': 'متوسط',
        'lang.basic': 'أساسي'
    },
    en: {
        // Navigation
        'nav.features': 'Features',
        'nav.templates': 'Templates',
        'nav.pricing': 'Pricing',
        'nav.start': 'Start Now',
        'nav.home': 'Home',

        // Hero
        'hero.badge': 'Most Used in Arab World',
        'hero.title': 'Create Your',
        'hero.titleHighlight': 'Professional',
        'hero.subtitle': '12+ Professional Templates, PDF Export, Modern Design. Start Free!',
        'hero.startFree': 'Start Free',
        'hero.viewTemplates': 'View Templates',
        'hero.users': 'Users',
        'hero.cvs': 'CVs Created',
        'hero.templates': 'Templates',

        // Features
        'features.badge': 'Why My CV?',
        'features.title': 'Everything You Need for a',
        'features.titleHighlight': 'Perfect CV',
        'features.templates': '12+ Templates',
        'features.templatesDesc': 'Diverse templates for all fields',
        'features.fast': 'Fast & Easy',
        'features.fastDesc': 'Create CV in 5 minutes',
        'features.pdf': 'PDF Export',
        'features.pdfDesc': 'High quality for printing',
        'features.unlimited': 'Unlimited',
        'features.unlimitedDesc': 'Unlimited free CVs',
        'features.bilingual': 'Arabic & English',
        'features.bilingualDesc': 'Full bilingual support',
        'features.responsive': 'Responsive',
        'features.responsiveDesc': 'Works on all devices',

        // Templates
        'templates.badge': 'Templates',
        'templates.title': 'Professional',
        'templates.titleHighlight': 'Templates',

        // How It Works
        'howItWorks.title': 'Three',
        'howItWorks.titleHighlight': 'Simple Steps',
        'howItWorks.step1': 'Choose Template',
        'howItWorks.step1Desc': 'From 12+ templates',
        'howItWorks.step2': 'Enter Your Data',
        'howItWorks.step2Desc': 'Fill the form',
        'howItWorks.step3': 'Download PDF',
        'howItWorks.step3Desc': 'Ready to send',

        // Pricing
        'pricing.badge': 'Pricing',
        'pricing.title': 'Affordable',
        'pricing.titleHighlight': 'Plans',
        'pricing.currency': 'USD',
        'pricing.currencyMonth': 'USD/month',
        'pricing.free': 'Free',
        'pricing.freeFeature1': 'Unlimited CVs',
        'pricing.freeFeature2': 'All Templates',
        'pricing.freeFeature3': 'PDF Export',
        'pricing.freeFeature4': 'Watermark',
        'pricing.startFree': 'Start Free',
        'pricing.single': 'Single Download',
        'pricing.singleFeature1': 'One CV',
        'pricing.singleFeature2': 'No Watermark',
        'pricing.singleFeature3': 'High Quality',
        'pricing.choosePlan': 'Choose Plan',
        'pricing.monthly': 'Monthly',
        'pricing.monthlyFeature1': 'Unlimited Downloads',
        'pricing.monthlyFeature2': 'No Watermark',
        'pricing.monthlyFeature3': 'Exclusive Templates',
        'pricing.monthlyFeature4': 'Priority Support',
        'pricing.subscribe': 'Subscribe Now',
        'pricing.popular': 'Most Popular',

        // CTA
        'cta.title': 'Ready to Build Your CV?',
        'cta.subtitle': 'Join thousands of users',
        'cta.button': 'Start Now',

        // Footer
        'footer.desc': 'Professional CV Builder',
        'footer.createCV': 'Create CV',

        // Builder
        'builder.title': 'CV Information',
        'builder.personal': 'Personal Information',
        'builder.photo': 'Profile Photo',
        'builder.photoUrl': 'Or enter image URL',
        'builder.firstName': 'First Name',
        'builder.lastName': 'Last Name',
        'builder.jobTitle': 'Job Title',
        'builder.email': 'Email',
        'builder.phone': 'Phone Number',
        'builder.location': 'Location',
        'builder.linkedin': 'LinkedIn',
        'builder.website': 'Personal Website',
        'builder.github': 'GitHub',
        'builder.twitter': 'Twitter',
        'builder.summary': 'Professional Summary',
        'builder.experience': 'Work Experience',
        'builder.addExperience': 'Add Experience',
        'builder.education': 'Education',
        'builder.addEducation': 'Add Education',
        'builder.skills': 'Skills',
        'builder.addSkill': 'Add Skill',
        'builder.languages': 'Languages',
        'builder.addLanguage': 'Add Language',
        'builder.projects': 'Projects',
        'builder.addProject': 'Add Project',
        'builder.certifications': 'Certifications',
        'builder.addCertification': 'Add Certification',
        'builder.awards': 'Awards & Achievements',
        'builder.addAward': 'Add Award',
        'builder.interests': 'Interests',
        'builder.references': 'References',
        'builder.addReference': 'Add Reference',
        'builder.template': 'Template',
        'builder.preview': 'Preview',
        'builder.download': 'Download PDF',
        'builder.from': 'From',
        'builder.to': 'To',
        'builder.present': 'Present',
        'builder.company': 'Company',
        'builder.position': 'Position',
        'builder.description': 'Description',
        'builder.degree': 'Degree',
        'builder.institution': 'University/Institution',
        'builder.gpa': 'GPA',
        'builder.projectName': 'Project Name',
        'builder.projectLink': 'Project Link',
        'builder.certName': 'Certificate Name',
        'builder.certIssuer': 'Issuing Organization',
        'builder.certDate': 'Date Obtained',
        'builder.awardName': 'Award Name',
        'builder.awardIssuer': 'Issuing Organization',
        'builder.refName': 'Name',
        'builder.refPosition': 'Position',
        'builder.refCompany': 'Company',
        'builder.refEmail': 'Email',
        'builder.refPhone': 'Phone',

        // Download Modal
        'download.title': 'Download CV',
        'download.freeTitle': 'Free',
        'download.freeDesc': 'With watermark',
        'download.singleTitle': 'Single Download',
        'download.singleDesc': 'No watermark',
        'download.monthlyTitle': 'Monthly Subscription',
        'download.monthlyDesc': 'Unlimited downloads',
        'download.bestValue': 'Best Value',

        // Payment
        'payment.title': 'Complete Payment',
        'payment.loginPrompt': 'Sign in with your account to complete payment',
        'payment.googleLogin': 'Sign in with Google',
        'payment.securePayment': 'Complete Secure Payment',
        'payment.singleInfo': 'Download one CV without watermark',
        'payment.monthlyInfo': 'Monthly subscription - unlimited downloads without watermark',

        // Success
        'success.title': 'Success!',
        'success.ok': 'OK',
        'success.loginSuccess': 'Successfully logged in!',
        'success.paymentSuccess': 'Payment successful! Downloading your CV...',
        'success.downloadSuccess': 'CV downloaded successfully!',

        // Templates List
        'template.modern': 'Modern Professional',
        'template.modernDesc': 'Sleek modern design',
        'template.classic': 'Classic Elegant',
        'template.classicDesc': 'Traditional refined style',
        'template.creative': 'Creative Bold',
        'template.creativeDesc': 'For designers and creatives',
        'template.minimal': 'Minimalist Clean',
        'template.minimalDesc': 'Clear and professional',
        'template.executive': 'Executive Premium',
        'template.executiveDesc': 'For managers and leaders',
        'template.tech': 'Tech Developer',
        'template.techDesc': 'For programmers and tech',
        'template.designer': 'Creative Designer',
        'template.designerDesc': 'For artists and designers',
        'template.graduate': 'Fresh Graduate',
        'template.graduateDesc': 'For students and new grads',
        'template.corporate': 'Corporate',
        'template.corporateDesc': 'For large companies',
        'template.elegant': 'Elegant Premium',
        'template.elegantDesc': 'Luxurious design',
        'template.bold': 'Modern Bold',
        'template.boldDesc': 'Strong attractive colors',
        'template.academic': 'Academic',
        'template.academicDesc': 'For researchers and academics',
        // New Templates
        'template.timeline': 'Timeline',
        'template.timelineDesc': 'Interactive timeline design',
        'template.split': 'Split Professional',
        'template.splitDesc': 'Elegant split layout',
        'template.neon': 'Neon Glow',
        'template.neonDesc': 'Vibrant neon colors',
        'template.luxury': 'Luxury Gold',
        'template.luxuryDesc': 'Premium luxurious design',
        'template.infographic': 'Infographic',
        'template.infographicDesc': 'With skill progress bars',
        'template.dark': 'Dark Professional',
        'template.darkDesc': 'Modern dark theme',
        'template.mostPopular': 'Most Popular',
        'template.new': 'New',
        'template.premium': 'Premium',

        // Skill Levels
        'skill.expert': 'Expert',
        'skill.advanced': 'Advanced',
        'skill.intermediate': 'Intermediate',
        'skill.beginner': 'Beginner',

        // Language Levels
        'lang.native': 'Native',
        'lang.fluent': 'Fluent',
        'lang.advanced': 'Advanced',
        'lang.intermediate': 'Intermediate',
        'lang.basic': 'Basic'
    }
};

// Price conversion rates
const priceRates = {
    ar: { rate: 1, symbol: 'ريال', prices: { single: 5, monthly: 29 } },
    en: { rate: 0.27, symbol: 'USD', prices: { single: 1.5, monthly: 8 } }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update HTML direction and lang
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update font
    document.body.style.fontFamily = lang === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif";

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Update prices
    updatePrices();

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Trigger custom event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function updatePrices() {
    const priceData = priceRates[currentLang];

    document.querySelectorAll('[data-price]').forEach(el => {
        const basePrice = parseInt(el.getAttribute('data-price'));
        if (basePrice === 0) {
            el.textContent = '0';
        } else if (basePrice === 15) {
            el.textContent = priceData.prices.single;
        } else if (basePrice === 100) {
            el.textContent = priceData.prices.monthly;
        }
    });
}

function initI18n() {
    // Add click handlers for language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Apply saved language
    setLanguage(currentLang);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initI18n);

// Export for use in other scripts
window.i18n = { t, setLanguage, currentLang: () => currentLang, priceRates };
