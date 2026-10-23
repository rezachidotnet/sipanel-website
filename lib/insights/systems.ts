import type {Locale} from '@/i18n/routing';

/**
 * The seven SIPANEL systems that engineering insights are written about.
 * Client-safe: no content imports, so the insights index client island can use it.
 *
 * Ids for the first three systems keep their original category names so the
 * `faqCategory` analytics dimension stays continuous for existing articles.
 */
export const insightCategoryIds = [
  'panel_systems',
  'roofing_waterproofing',
  'cladding_facades',
  'daylighting_roofing',
  'tensile_membranes',
  'retractable_roofs',
  'etfe_systems'
] as const;

export type InsightCategoryId = (typeof insightCategoryIds)[number];

type LocalizedText = Record<Locale, string>;

export type InsightSystem = {
  id: InsightCategoryId;
  href: string;
  label: LocalizedText;
  serviceTitle: LocalizedText;
  serviceDescription: LocalizedText;
};

export const insightSystems: Record<InsightCategoryId, InsightSystem> = {
  panel_systems: {
    id: 'panel_systems',
    href: '/systems/sandwich-panel-systems',
    label: {fa: 'ساندویچ پانل', en: 'Sandwich Panel Systems', ar: 'ألواح الساندويتش', ru: 'Сэндвич-панели'},
    serviceTitle: {fa: 'سیستم‌های ساندویچ پانل', en: 'Sandwich Panel Systems', ar: 'أنظمة ألواح الساندويتش', ru: 'Системы сэндвич-панелей'},
    serviceDescription: {
      fa: 'انتخاب پانل، هماهنگی تأمین و کنترل اجرای پوسته.',
      en: 'Panel selection, procurement coordination, and installation control.',
      ar: 'اختيار الألواح وتنسيق التوريد وضبط التركيب.',
      ru: 'Подбор панелей, координация поставки и контроль монтажа.'
    }
  },
  roofing_waterproofing: {
    id: 'roofing_waterproofing',
    href: '/systems/standing-seam-zip-tech-roofing',
    label: {fa: 'سقف استندینگ سیم و زیپ', en: 'Standing Seam and ZIP Roofing', ar: 'أسقف ستاندينغ سيم وZIP', ru: 'Фальцевая кровля и ZIP'},
    serviceTitle: {fa: 'سقف استندینگ سیم و ZIP Tech', en: 'Standing Seam and ZIP Tech Roofing', ar: 'أسقف ستاندينغ سيم وZIP Tech', ru: 'Фальцевая кровля и ZIP Tech'},
    serviceDescription: {
      fa: 'منطق آب‌بندی سقف، بازبینی زهکشی و کنترل اجرا.',
      en: 'Roofing waterproofing logic, drainage review, and execution control.',
      ar: 'منطق العزل المائي للسقف ومراجعة التصريف وضبط التنفيذ.',
      ru: 'Логика гидроизоляции кровли, проверка водоотвода и контроль выполнения.'
    }
  },
  cladding_facades: {
    id: 'cladding_facades',
    href: '/systems/aluminium-cladding-covering',
    label: {fa: 'نمای آلومینیومی', en: 'Aluminium Cladding', ar: 'الكسوة بالألمنيوم', ru: 'Алюминиевая облицовка'},
    serviceTitle: {fa: 'نمای آلومینیومی و پوشش', en: 'Aluminium Cladding and Covering', ar: 'الكسوة والتغطية بالألمنيوم', ru: 'Алюминиевая облицовка и покрытие'},
    serviceDescription: {
      fa: 'کنترل درز نما، منطق اتصال و برنامه‌ریزی متریال.',
      en: 'Facade joint control, fixing logic, and material planning.',
      ar: 'ضبط فواصل الواجهة ومنطق التثبيت وتخطيط المواد.',
      ru: 'Контроль фасадных стыков, логика крепления и планирование материалов.'
    }
  },
  daylighting_roofing: {
    id: 'daylighting_roofing',
    href: '/systems/daylighting-transparent-roofing',
    label: {fa: 'نورگیر و پوشش شفاف', en: 'Daylighting and Transparent Roofing', ar: 'الإنارة الطبيعية والأسقف الشفافة', ru: 'Светопрозрачные кровли'},
    serviceTitle: {fa: 'نورگیرها و پوشش‌های شفاف', en: 'Daylighting and Transparent Roofing', ar: 'أنظمة الإنارة الطبيعية والأسقف الشفافة', ru: 'Зенитные фонари и светопрозрачные кровли'},
    serviceDescription: {
      fa: 'طراحی نورگیر سقفی با کنترل آب‌بندی، حرارت و اتصال به سازه.',
      en: 'Rooflight design with waterproofing, thermal, and structural interface control.',
      ar: 'تصميم فتحات الإنارة السقفية مع ضبط العزل المائي والحراري ووصلات الهيكل.',
      ru: 'Проектирование зенитных фонарей с контролем гидроизоляции, теплотехники и примыканий.'
    }
  },
  tensile_membranes: {
    id: 'tensile_membranes',
    href: '/systems/tensile-fabric-membrane-structures',
    label: {fa: 'سازه پارچه‌ای کششی', en: 'Tensile Membrane Structures', ar: 'الهياكل الغشائية الشدية', ru: 'Тентовые мембранные конструкции'},
    serviceTitle: {fa: 'سازه پارچه‌ای کششی', en: 'Tensile Fabric Membrane Structures', ar: 'الهياكل القماشية الغشائية الشدية', ru: 'Тентовые мембранные конструкции'},
    serviceDescription: {
      fa: 'مهندسی فرم، پیش‌تنیدگی و جزئیات اتصال غشاء.',
      en: 'Form-finding, prestress, and membrane connection engineering.',
      ar: 'هندسة إيجاد الشكل والشد المسبق ووصلات الغشاء.',
      ru: 'Формообразование, преднапряжение и узлы крепления мембраны.'
    }
  },
  retractable_roofs: {
    id: 'retractable_roofs',
    href: '/systems/retractable-roof-covering-systems',
    label: {fa: 'سقف متحرک', en: 'Retractable Roofs', ar: 'الأسقف المتحركة', ru: 'Раздвижные кровли'},
    serviceTitle: {fa: 'سقف متحرک و پوشش بازشو', en: 'Retractable Roof Covering Systems', ar: 'أنظمة الأسقف المتحركة', ru: 'Системы раздвижных кровель'},
    serviceDescription: {
      fa: 'مهندسی حرکت، آب‌بندی در وضعیت بسته و ایمنی بهره‌برداری.',
      en: 'Motion engineering, closed-position waterproofing, and operating safety.',
      ar: 'هندسة الحركة والعزل المائي في وضع الإغلاق وسلامة التشغيل.',
      ru: 'Инженерия движения, герметичность в закрытом положении и безопасность эксплуатации.'
    }
  },
  etfe_systems: {
    id: 'etfe_systems',
    href: '/systems/etfe-roof-facade-systems',
    label: {fa: 'پوشش ETFE', en: 'ETFE Systems', ar: 'أنظمة ETFE', ru: 'Системы ETFE'},
    serviceTitle: {fa: 'پوشش ETFE برای سقف و نما', en: 'ETFE Roof and Facade Systems', ar: 'أنظمة ETFE للأسقف والواجهات', ru: 'Системы ETFE для кровли и фасада'},
    serviceDescription: {
      fa: 'مهندسی فویل، سیستم هوا و سازه پشتیبان.',
      en: 'Foil, air-supply, and support-structure engineering.',
      ar: 'هندسة الرقائق ونظام الهواء والهيكل الداعم.',
      ru: 'Инженерия плёнки, системы подачи воздуха и несущей конструкции.'
    }
  }
};

export function getInsightCategoryLabel(category: InsightCategoryId, locale: Locale = 'en') {
  return insightSystems[category].label[locale];
}
