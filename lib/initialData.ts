import { ProjectType, ServiceType, EquipmentType, CertificationType, SiteContentType } from '@/types';

export const INITIAL_SITE_CONTENT: SiteContentType = {
  hero: {
    badgeAr: 'شركة سعودية معتمدة • AACC HDD-MT',
    badgeEn: 'CERTIFIED SAUDI CONTRACTOR • AACC HDD-MT',
    titleAr: 'حلول الحفر الأفقي الموجه والأنفاق الدقيقة',
    titleEn: 'HORIZONTAL DIRECTIONAL DRILLING & MICROTUNNELING',
    highlightAr: 'للبنية التحتية وشبكات المرافق بالمملكة',
    highlightEn: 'STRATEGIC INFRASTRUCTURE IN SAUDI ARABIA',
    subtitleAr: 'شركة العاج الفضي للمقاولات (AACC) — المقاول المتخصص في تنفيذ معابر الحفر الأفقي الموجه (HDD) حسب طلب العميل، وحفر الأنفاق الدقيقة (Microtunneling)، وتمديد شبكات الطاقة والمياه والغاز الإستراتيجية بالمملكة وفق معايير أرامكو وISO.',
    subtitleEn: 'Alaaj Alfedhi Contracting Co. (AACC HDD-MT) provides specialized trenchless drilling (per client request), microtunneling, and regional utility lifelines across the Kingdom of Saudi Arabia under certified Aramco and ISO quality standards.',
    metrics: [
      { labelAr: 'أقصى قوة سحب', labelEn: 'Max Pullback', value: '100,000 lbs', highlight: true },
      { labelAr: 'أقصى قطر حفر', labelEn: 'Max Bore Dia', value: 'حسب طلب العميل', highlight: false },
      { labelAr: 'مسافة دفع أحادية', labelEn: 'Single Reach', value: '1,200+ m', highlight: false },
      { labelAr: 'سجل السلامة المهنية', labelEn: 'Safety Record', value: '100% Zero LTI', highlight: true },
    ]
  },
  about: {
    badgeAr: 'عن شركة العاج الفضي للمقاولات',
    badgeEn: 'About Alaaj Alfedhi Contracting Company',
    titleAr: 'هندسة تتجاوز التوقعات.',
    titleEn: 'ENGINEERING BEYOND EXPECTATIONS.',
    descriptionAr: 'تأسست شركة العاج الفضي للمقاولات (AACC HDD-MT) بقدرات تخصصية عالية في الحفر الأفقي الموجه والبنية التحتية المدنية، وتقود تنفيذ أكثر المعابر الأرضية تعقيداً، وتمديد خطوط المرافق الحيوية للمشاريع العملاقة في المملكة.',
    descriptionEn: 'Founded with specialized horizontal directional boring and civil infrastructure capabilities, Alaaj Alfedhi Contracting Company (AACC HDD-MT) leads complex subterranean crossings, utility installations, and mega infrastructure across the Kingdom.',
    leadership: [
      {
        nameAr: 'م. محمود عبيد الشيخ',
        nameEn: 'Mahmoud Obead Alsheakh',
        roleAr: 'المؤسس المشارك والرئيس التنفيذي',
        roleEn: 'Co-Founder & Chief Executive Officer',
        experienceAr: '18+ سنة خبرة في الحفر الموجه',
        experienceEn: '18+ Yrs HDD',
        subRoleAr: 'سابقاً نور للاتصالات والأنقري • مشرف أول عمليات HDD',
        subRoleEn: 'Former Noor Telecom & Al-Angari • Senior HDD Superintendent',
        quoteAr: '«من خلال 18 عاماً من الخبرة في الحفر الأفقي الموجه، اكتسبنا فهماً هندسياً عميقاً لهذه التقنية المتقدمة. ننفذ المعابر المعقدة — من الطرق السريعة وخطوط السكك الحديدية إلى المعابر تحت المائية — مبتكرين حلولاً هندسية لكل تحدٍ جيولوجي.»',
        quoteEn: '“With 18 years of experience in horizontal directional boring, I gained deep understanding of this advanced technology. We implement complex crossings—from multi-lane highways and rail corridors to underwater lines—developing innovative solutions to every geological challenge.”',
        image: '/images/leadership/mahmoud_alsheakh.jpg',
        badges: ['Aramco PTW Certified', 'Vermeer & DCI Specialist']
      },
      {
        nameAr: 'مؤيد حاج مسعود',
        nameEn: 'Mouayed Haj Masoud',
        roleAr: 'المؤسس المشارك والمدير الشريك',
        roleEn: 'Co-Founder & Managing Partner',
        experienceAr: '20+ سنة في قطاع الطاقة والبنية التحتية',
        experienceEn: '20+ Yrs Energy',
        subRoleAr: 'مؤسس شركة SICC • قيادي تنفيذي في مشاريع الجهد العالي والموارد الاستراتيجية',
        subRoleEn: 'Founder of SICC • Strategic Energy, High-Voltage & Resource Executive',
        quoteAr: '«مع أكثر من 20 عاماً من الخبرة في قطاعات الطاقة والصناعة، كان تركيزي دائماً على تطوير حلول مبتكرة وفعالة من حيث التكلفة لرفع الكفاءة التشغيلية مع الحفاظ الصارم على أعلى معايير السلامة المهنية.»',
        quoteEn: '“With over 20 years of experience in the energy and industrial sectors, my focus has always been developing innovative, cost-effective solutions to enhance operational efficiency while maintaining uncompromising safety discipline.”',
        image: '/images/leadership/mouayed_masoud.jpg',
        badges: ['Industrial Operations', 'Energy & Infrastructure']
      }
    ],
    vision: {
      titleAr: 'ريادة هندسية شاملة',
      titleEn: 'Comprehensive Engineering Leadership',
      textAr: '«نسعى لأن نكون الرواد في مجال الحفر الأفقي الموجه وحفر الأنفاق الدقيقة في المملكة والمنطقة، من خلال تقديم حلول هندسية مبتكرة تلبي متطلبات البنية التحتية المتنامية بأعلى معايير السلامة والجودة.»',
      textEn: '“We seek to be the leaders in horizontal drilling and tunneling across the Kingdom and region, providing innovative engineering solutions that meet growing infrastructure needs with the highest standards of safety and quality.”'
    },
    mission: {
      titleAr: 'تبني أحدث التقنيات وتجاوز التوقعات',
      titleEn: 'Technology Adoption & Exceeding Expectations',
      textAr: '«نتبنى أحدث التقنيات العالمية في الحفر الموجه وحفر الأنفاق لتقديم خدمات فائقة الدقة والسرعة، متجاوزين توقعات عملائنا، وفاتحين آفاقاً جديدة في تطوير البنية التحتية مع الالتزام التام بالمسؤولية المجتمعية والبيئية.»',
      textEn: '“We adopt the latest technologies in horizontal directional drilling and tunneling to provide fast, efficient services, exceed client expectations, and open new horizons in infrastructure development while committing to social and environmental responsibility.”'
    },
    values: [
      {
        number: '01',
        titleAr: 'الدقة الهندسية',
        titleEn: 'Engineering Precision',
        descriptionAr: 'توجيه telemetry تحت سطحي عالي الدقة بنظام DCI Falcon مع لحام وتماسك معتمد لأنابيب البولي إيثيلين والصلب.',
        descriptionEn: 'Sub-millimeter DCI Falcon guidance telemetry and certified butt-fusion joint integrity.'
      },
      {
        number: '02',
        titleAr: 'سلامة بلا حوادث (Zero-Harm)',
        titleEn: 'Zero-Harm Safety',
        descriptionAr: 'امتثال تام لتصاريح عمل أرامكو السعودية (PTW)، ومعايير Kent HSSE العالمية، وتدقيق يومي في الميدان.',
        descriptionEn: 'Aramco PTW compliance, Kent HSSE excellence benchmarks, and daily field audits.'
      },
      {
        number: '03',
        titleAr: 'الالتزام الصارم بالمواعيد',
        titleEn: 'On-Time Delivery',
        descriptionAr: 'سرعة استثنائية مثبتة، مثل إنجاز نفق صخري بقطر 42 بوصة وبطول 110 أمتار خلال 7 أيام عمل فقط.',
        descriptionEn: 'Demonstrated speed, such as completing a 110m 42-inch rock tunnel in exactly 7 days.'
      },
      {
        number: '04',
        titleAr: 'شراكة مستدامة',
        titleEn: 'Sustainable Partnership',
        descriptionAr: 'أدنى تأثير بيئي على السطح، وإعادة تدوير مغلقة لسوائل الحفر، وقيمة مضافة طويلة الأجل للمقاولين.',
        descriptionEn: 'Minimal surface disturbance, closed-loop fluid recycling, and long-term contractor value.'
      }
    ]
  },
  contact: {
    phone: '+966 509424820',
    email: 'mo.hdd@hotmail.com',
    addressAr: 'مبنى 3315، شارع حفصة بنت عمر، حي الأندلس، الرياض 13212، المملكة العربية السعودية',
    addressEn: 'Building 3315, Hafsa Bint Umar St., Al Andalus, Riyadh 13212, Kingdom of Saudi Arabia',
    cr: '1009156401',
    unifiedNo: '7043006183',
    vatNo: '312719552900003',
    gosiNo: '652371032'
  },
  seo: {
    titleAr: 'شركة العاج الفضي للمقاولات | AACC HDD-MT - المملكة العربية السعودية',
    titleEn: 'Alaaj Alfedhi Contracting Company | AACC HDD-MT - KSA',
    descriptionAr: 'شركة العاج الفضي للمقاولات متخصصة في أعمال الحفر الأفقي الموجه HDD، والأنفاق الدقيقة Microtunneling، وشبكات المياه والكهرباء والبنية التحتية الاستراتيجية في المملكة العربية السعودية.',
    descriptionEn: 'Alaaj Alfedhi Contracting Company (AACC HDD-MT) specializes in Horizontal Directional Drilling, Microtunneling, utility networks, and mega infrastructure projects across Saudi Arabia.',
    keywordsAr: ['حفر موجه', 'حفر أفقي', 'أنفاق دقيقة', 'بنية تحتية', 'أرامكو', 'الرياض', 'السعودية', 'AACC'],
    keywordsEn: ['HDD Drilling', 'Microtunneling', 'Infrastructure', 'Saudi Aramco', 'SEC', 'Riyadh', 'Saudi Arabia', 'AACC'],
    ogImage: '/images/services/service_01_hdd.jpg'
  }
};

export const INITIAL_SERVICES: ServiceType[] = [
  {
    number: '01',
    code: 'HDD-BORING',
    titleAr: 'الحفر الأفقي الموجه عالي السعة (HDD)',
    titleEn: 'Heavy Horizontal Directional Drilling (HDD)',
    subtitleAr: 'أقطار تصل إلى 1,500 ملم (60 بوصة) وقوة سحب 100,000 رطل',
    subtitleEn: 'Diameters up to 1,500 mm (60") & 100,000 lbs Pullback Capacity',
    descriptionAr: 'تنفيذ أعمال الحفر الأفقي الموجه فائق الدقة بدون حفر مكشوف لتمرير خطوط الغاز والنفط، كابلات الكهرباء ذات الجهد العالي والجهد الفائق (380 ك.ف / 115 ك.ف)، وخطوط المياه وأنابيب البولي إيثيلين والصلب أسفل الطرق السريعة، خطوط السكك الحديدية، والمجاري المائية.',
    descriptionEn: 'Precision trenchless HDD execution for high-pressure gas/oil pipelines, 380kV/115kV high-voltage power conduits, and large potable water mains beneath major highways, rail tracks, and water bodies with advanced DCI Falcon guidance.',
    image: '/images/services/service_01_hdd.jpg',
    tagsAr: ['أقطار 60 بوصة', 'توجيه DCI Falcon', 'لحام PE100 SDR11', 'أنظمة تدوير سوائل الحفر'],
    tagsEn: ['Up to 60" Diameter', 'DCI Falcon Telemetry', 'PE100 SDR11 Fusion', 'Closed-Loop Mud Recycling'],
    featuresAr: [
      'توجيه جيرسكوبي ورقمي تحت سطحي بدقة ملليمترية',
      'سحب حزم أنابيب متعددة (Bundled Multiduct) حتى 8 أنابيب في سحبة واحدة',
      'حفر في جميع أنواع التربة والتكوينات الصخرية القاسية والطبقات الرملية الحرة',
      'صفر إغلاق للطرق المرورية وحماية البنى القائمة'
    ],
    featuresEn: [
      'Millimeter-precision gyroscopic and magnetic guidance telemetry',
      'Multi-pipe bundled pulls (up to 8 conduits in a single operation)',
      'Unrestricted capability across hard basalt rock, limestone, and saturated sands',
      'Zero surface traffic disruption and structure protection'
    ],
    order: 1
  },
  {
    number: '02',
    code: 'MICROTUNNELING',
    titleAr: 'حفر الأنفاق الدقيقة والدفع الهيدروليكي (Microtunneling)',
    titleEn: 'Microtunneling & Slurry Pipe Jacking',
    subtitleAr: 'حفر الأنفاق العميقة بالتحكم عن بعد لأنابيب الخرسانة والصلب وGRP',
    subtitleEn: 'Remote-Controlled Deep Tunneling for Concrete, Steel & GRP Pipes',
    descriptionAr: 'حفر أنفاق المرافق العميقة غير المأهولة باستخدام أحدث ماكينات الدفع الهيدروليكي المغلقة الموجهة بالليزر لشبكات الصرف الصحي بالانحدار وخطوط تصريف مياه الأمطار وعبارات الخدمات المشتركة في المناطق الحضرية والتربة المشبعة بالمياه الجوفية.',
    descriptionEn: 'Automated remote-controlled slurry microtunneling and hydraulic pipe jacking with laser-guided precision for deep gravity sewer lines, stormwater collectors, and multi-utility tunnels under high groundwater pressure.',
    image: '/images/services/service_02_microtunneling.jpg',
    tagsAr: ['توجيه ليزري دقيق', 'أنفاق عميقة حتى 25م', 'دفع هيدروليكي', 'موازنة الضغط الطيني'],
    tagsEn: ['Laser Navigation', 'Depths up to 25m', 'Hydraulic Jacking', 'Slurry Pressure Balance'],
    featuresAr: [
      'حفر أنفاق للمواسير الخرسانية المسلحة وGRP والصلب بأقطار حتى 2,400 ملم',
      'تنفيذ آبار الدفع والاستقبال (Shafts) الدائرية والخرسانية المعزولة',
      'تحكم كامل في منسوب المياه الجوفية بدون هبوط للتربة المحيطة',
      'توافق كامل مع مواصفات شركة المياه الوطنية (NWC) ووزارة النقل'
    ],
    featuresEn: [
      'Jacking of reinforced concrete, GRP, and steel casings up to 2,400mm',
      'Secant pile & segmental circular launch/reception shafts',
      'Full slurry pressure balancing with zero surface settlement',
      'Full compliance with NWC, MOT, and Royal Commission specs'
    ],
    order: 2
  },
  {
    number: '03',
    code: 'WATER-NETWORKS',
    titleAr: 'شبكات نقل وتوزيع المياه الاستراتيجية',
    titleEn: 'Strategic Water Transmission & Distribution Networks',
    subtitleAr: 'خطوط النقل الكبرى، محطات الضخ، وخزانات التجميع الاستراتيجية',
    subtitleEn: 'Bulk Transmission Mains, Booster Stations & Strategic Reservoirs',
    descriptionAr: 'تنفيذ وتمديد خطوط نقل المياه الصالحة للشرب وخطوط التحلية ومياه الري المعالجة (TSE) بأنابيب الدكتايل، البولي إيثيلين (HDPE PE100 SDR11)، والكربون ستيل مع غرف الصمامات ومحطات الضخ وربط التغذية الرئيسية لمشاريع التنمية.',
    descriptionEn: 'Turnkey execution of potable water transmission mains, desalination feeds, and treated sewage effluent (TSE) networks utilizing Ductile Iron, HDPE PE100 SDR11, and welded carbon steel with valve chambers and booster stations.',
    image: '/images/services/service_03_water.jpg',
    tagsAr: ['أنابيب كربون ستيل ودكتايل', 'لحام كهربائي وحراري', 'غرف محابس وتحكم', 'فحوصات الضغط الهيدروستاتيكي'],
    tagsEn: ['Carbon Steel & Ductile Iron', 'Electrofusion & Butt-Weld', 'Air/Washout Chambers', 'Hydrostatic Testing'],
    featuresAr: [
      'تمديد خطوط ناقلة بضغوط تشغيلية حتى 25 بار واختبارات هيدروستاتيكية معتمدة',
      'تنفيذ غرف المحابس وغرف تصريف الهواء وغسيل الخطوط بمواصفات NWC وSWCC',
      'تطهير وتعقيم وغسيل الخطوط الناقلة وفق أعلى المعايير الصحية العالمية',
      'ربط شبكات التوزيع بالأحياء السكنية والمدن الصناعية الجديدة'
    ],
    featuresEn: [
      'High-pressure water mains tested up to 25 Bar with certified QA dossiers',
      'Constructing NWC & SWCC standard air-release and washout chambers',
      'Full sterilization, chlorination, and hydro-testing protocols',
      'Interconnecting trunk lines to urban developments and industrial hubs'
    ],
    order: 3
  },
  {
    number: '04',
    code: 'SEWAGE-STORMWATER',
    titleAr: 'شبكات الصرف الصحي وتصريف السيول ومياه الأمطار',
    titleEn: 'Sewerage, Stormwater Drainage & Flood Control',
    subtitleAr: 'خطوط الانحدار العميقة، العبارات الخرسانية الصندوقية ومحطات الرفع',
    subtitleEn: 'Deep Gravity Interceptors, Box Culverts & Pumping Lift Stations',
    descriptionAr: 'إنشاء شبكات الصرف الصحي المتطورة، وخطوط الطرد والرفع، وقنوات تصريف مياه السيول والأمطار المفتوحة والمغلقة، والعبارات الخرسانية الصندوقية (Box Culverts) لدرء أخطار السيول وتأمين البنى التحتية للمدن.',
    descriptionEn: 'Engineering deep gravity trunk sewers, wastewater lift pump stations, stormwater drainage culverts, and cast-in-place reinforced box culverts to protect urban corridors and industrial complexes from flood hazards.',
    image: '/images/services/service_04_sewage.jpg',
    tagsAr: ['خطوط انحدار بالليزر', 'عبارات خرسانية صندوقية', 'محطات رفع وغطاسات', 'تبطين مقاوم للأحماض'],
    tagsEn: ['Laser Invert Alignment', 'Precast Box Culverts', 'Lift Stations', 'HDPE/GRP Anti-Corrosion Lining'],
    featuresAr: [
      'تنفيذ خطوط الانحدار العميقة بأنابيب GRP وVCP والخرسانة المبطنة بالـ HDPE',
      'إنشاء المناهل العميقة وغرف التفتيش الدائرية والمستطيلة المعزولة إيبوكسياً',
      'بناء محطات الرفع والغرف الرطبة والجافة ومصائد الرمال والزيوت',
      'تصريف السيول السطحي والتحت سطحي لحماية المجمعات السكنية والصناعية'
    ],
    featuresEn: [
      'Deep gravity trunk installation with laser level gradient accuracy',
      'Epoxy-coated precast and in-situ drop manholes and junction chambers',
      'Submersible lift stations with integrated grit/grease separation systems',
      'Regional flood-control channels and culverts for high-volume storm runoff'
    ],
    order: 4
  },
  {
    number: '05',
    code: 'ROADS-HIGHWAYS',
    titleAr: 'معابر الطرق السريعة وسكك القطارات وإعادة السفلتة',
    titleEn: 'Highway, Railway Trenchless Crossings & Pavement Restoration',
    subtitleAr: 'معابر حفر غير مكشوف تحت الطرق الحيوية بدون إيقاف حركة السير',
    subtitleEn: 'Live Traffic Underpasses, Steel Sleeve Push & High-Spec Asphalt Reinstatement',
    descriptionAr: 'تنفيذ المعابر التحتية المعقدة لجميع خطوط المرافق أسفل الطرق السريعة الحيوية، مسارات السكك الحديدية (SAR)، وتقاطعات الطرق الرئيسية مع أعمال إعادة السفلتة والتنسيق وفق المعايير الصارمة لوزارة النقل والبلديات.',
    descriptionEn: 'Executing heavy utility undercrossings beneath multi-lane expressways and Saudi Arabia Railways (SAR) tracks without interrupting traffic, followed by premium asphalt milling, paving, and MOT-compliant road reinstatement.',
    image: '/images/services/service_05_roads.jpg',
    tagsAr: ['معابر سكك حديد SAR', 'طرق سريعة حيوية', 'أغلفة حماية صلبة', 'إعادة سفلتة معتمدة'],
    tagsEn: ['SAR Railway Crossings', 'Live Highway Undercrossing', 'Heavy Steel Sleeves', 'Certified MOT Paving'],
    featuresAr: [
      'تثبيت أكمام وأغلفة الحماية الفولاذية (Steel Casing) بأقطار تصل إلى 2,000 ملم',
      'مراقبة هبوط السطح بدقة ميكرومترية لمنع أي تأثير على سلاسة الطريق السريع',
      'استخراج تصاريح العمل الرسمية وإدارة التحويلات المرورية المؤقتة بالتنسيق مع المرور',
      'كشط وسفلتة واختبارات الدمك والمارشال المعتمدة لإعادة الطريق لحالته الأصلية'
    ],
    featuresEn: [
      'Heavy steel protective sleeve installation up to 2,000mm diameter',
      'Continuous surface settlement monitoring during live drilling operations',
      'Comprehensive MOT/MOMRA permit processing and certified traffic management',
      'Full milling, asphalt paving, and Marshall compaction density compliance'
    ],
    order: 5
  },
  {
    number: '06',
    code: 'INDUSTRIAL-SUBSTATIONS',
    titleAr: 'محطات التحويل الكهربائي وشبكات الجهد العالي والفائق',
    titleEn: 'Power Substations (380kV/115kV) & High-Voltage Grids',
    subtitleAr: 'أعمال البنية المدنية والأنفاق لكابلات الكهرباء 380/115/33/13.8 ك.ف',
    subtitleEn: 'Civil Foundations, Cable Vaults & Trenchless Power Infeeds for SEC/Aramco Grids',
    descriptionAr: 'تنفيذ الأعمال المدنية المتخصصة لمحطات التحويل الكهربائي 380/115 ك.ف، وحفر مسارات وأنفاق كابلات الجهد الفائق تحت الأرض، وتشييد غرف سحب الكابلات (Joint Bays & Vaults) وفق معايير الشركة السعودية للكهرباء (SEC) وأرامكو.',
    descriptionEn: 'Turnkey civil and trenchless subterranean infrastructure for 380/115kV electrical substations, underground high-voltage XLPE cable routes, precast joint bays, and transformer containment yards adhering to SEC and Saudi Aramco standards.',
    image: '/images/services/service_06_substations.jpg',
    tagsAr: ['محطات 380/115 ك.ف', 'كابلات جهد فائق XLPE', 'غرف ربط Joint Bays', 'معايير SEC وأرامكو'],
    tagsEn: ['380kV/115kV Substations', 'HV XLPE Transmission', 'Joint Bays & Vaults', 'SEC & Aramco Standards'],
    featuresAr: [
      'حفر وتمديد مسارات حزم كابلات الجهد الفائق بنظام الحفر الموجه بدون قطع الطرق',
      'صب وبناء غرف السحب والربط الخرسانية المعزولة بأعلى مواصفات العزل الحراري والمائي',
      'تنفيذ شبكات التأريض الوقائي والحماية الكاثودية ومنظومات تصريف الزيوت العازلة',
      'تجهيز البنى التحتية لأبراج النقل الكهربائي الهوائي (OHTL) وقواعد المحولات'
    ],
    featuresEn: [
      'Multi-circuit HDD boring for high-voltage power transmission without surface disruption',
      'Constructing waterproof, thermal-insulated concrete joint bays and pull pits',
      'Installation of copper grounding grids, cathodic protection, and oil containment pits',
      'Civil foundation works for OHTL towers and primary power transformers'
    ],
    order: 6
  },
  {
    number: '07',
    code: 'REALESTATE-UTILITIES',
    titleAr: 'البنية التحتية للمخططات الكبرى والمجمعات السكنية',
    titleEn: 'Master-Plan Utility Infrastructure & Megaprojects',
    subtitleAr: 'شبكات المرافق المتكاملة: مياه، كهرباء، اتصالات، إنارة وصرف',
    subtitleEn: 'Integrated Urban Utilities: Power, Fiber Telecom, Water, Lighting & Stormwater',
    descriptionAr: 'تطوير البنى التحتية الكاملة للمخططات السكنية والتجارية والمدن الاقتصادية والصناعية الجديدة، بما يشمل شبكات كابلات الألياف الضوئية، شبكات التغذية الكهربائية، شبكات المياه، إنارة الشوارع، وشبكات الري والتصريف.',
    descriptionEn: 'Comprehensive master-plan infrastructure engineering for mega residential master plans, industrial zones, and economic cities—installing fiber-optic telecommunication duct banks, power distribution networks, district cooling pipes, and urban lighting.',
    image: '/images/services/service_07_realestate.jpg',
    tagsAr: ['مخططات سكنية وصناعية', 'أنابيب اتصالات وألياف', 'شبكات إنارة وتوزيع', 'تنسيق مرافق مجمعة'],
    tagsEn: ['Master-Planned Zones', 'Multi-Way Telecom Ducts', 'Urban Power & Lighting', 'Multi-Utility Coordination'],
    featuresAr: [
      'تركيب حزم أنابيب الاتصالات المتعددة (Multi-way PVC/HDPE Ducts) وغرف التفتيش',
      'تمديد شبكات الجهد المتوسط والمنخفض وصناديق التوزيع وأعمدة الإنارة الديكورية',
      'شبكات الري الذكي ومحطات الضخ وربط المباني والمرافق بالمغذيات المركزية',
      'تطبيق نمذجة BIM ثلاثية الأبعاد لمنع تعارض شبكات المرافق التحت أرضية'
    ],
    featuresEn: [
      'Installation of multi-way telecom conduit banks and access handholes',
      'Medium/low voltage distribution networks, feeder pillars, and street lighting',
      'Smart irrigation mains, pump skids, and complete plot utility connections',
      '3D BIM utility clash detection to ensure zero underground infrastructure conflicts'
    ],
    order: 7
  },
  {
    number: '08',
    code: 'SOLAR-RENEWABLES',
    titleAr: 'مزارع الطاقة المتجددة ومحطات الطاقة الشمسية',
    titleEn: 'Solar PV Farms & Renewable Energy Grid Interconnects',
    subtitleAr: 'حفر وتمديد كابلات الجهد المتوسط ومسارات العواكس في الصحراء والتربة الوعرة',
    subtitleEn: 'Trenching, Medium Voltage Cable Routing & Inverter Tie-Ins in Desert Terrains',
    descriptionAr: 'تنفيذ شبكات الكابلات التحت أرضية لمزارع الطاقة الشمسية الكهروضوئية (Solar PV)، وربط العواكس الكهربائية (Inverters) بمحطات التجميع، والمعابر الهندسية تحت الطرق والسيول لتغذية الشبكة الوطنية بالطاقة النظيفة.',
    descriptionEn: 'Civil infrastructure and subterranean cable routing for utility-scale Solar PV power plants, including DC string cabling, MV feeder collection trenches, inverter skid foundations, and trenchless grid interconnection conduits.',
    image: '/images/services/service_08_solar.jpg',
    tagsAr: ['طاقة شمسية كهروضوئية', 'كابلات جهد متوسط MV', 'ربط شبكات التجميع', 'رؤية السعودية 2030'],
    tagsEn: ['Utility-Scale Solar PV', 'MV Collection Trenches', 'Grid Interconnection', 'Saudi Vision 2030'],
    featuresAr: [
      'حفر خنادق الكابلات الآلي في البيئات الصحروية والصخرية الممتدة لمئات الكيلومترات',
      'تمديد كابلات الجهد المتوسط (MV) والألياف الضوئية للتحكم SCADA ومراقبة المحطة',
      'معابر الحفر الموجه لحماية الكابلات من الوديان ومجاري السيول الطبيعية في المزارع الشمسية',
      'قواعد المحولات الميدانية والعواكس المركزية واختبارات العزل الكهربائي الميدانية'
    ],
    featuresEn: [
      'Automated high-speed trenching across demanding desert and hardpan terrains',
      'Direct burial of MV cables and fiber-optic telemetry for SCADA control systems',
      'HDD protective crossings across seasonal wadis and major transport corridors',
      'Civil pads for central inverters, MV switchgear skids, and pre-commissioning testing'
    ],
    order: 8
  }
];

export const INITIAL_PROJECTS: ProjectType[] = [
  {
    slug: 'amaala-red-sea-binyah',
    titleAr: 'نفق موجه قطر 20 بوصة لحامل 18 بوصة (44.0م) - أمالا البحر الأحمر',
    titleEn: '20" HDD Bore / 18" Carrier Pipe (44.0m) - Amaala Red Sea',
    descriptionAr: 'تنفيذ أعمال حفر أفقي موجه عالي الدقة لنفق قطر 20 بوصة وتمرير أنبوب حامل 18 بوصة في التكوينات الساحلية الصخرية بمشروع أمالا - البحر الأحمر لصالح شركة بنية.',
    descriptionEn: 'High-precision HDD boring for a 20-inch tunnel and 18-inch carrier pipe pull in coastal rocky formations at the prestigious Amaala Red Sea development for Binyah Co.',
    client: 'بنية (Binyah Co.) / أمالا البحر الأحمر',
    mainContractor: 'شركة بنية (Binyah)',
    location: 'أمالا - منطقة تبوك / البحر الأحمر',
    year: '2025',
    lengthLm: '44.0 m',
    diameter: '20" Tunnel / 18" Carrier Pipe',
    category: 'HDD Drilling',
    mainImage: '/images/projects/project_01_amaala.jpg',
    gallery: [
      '/images/projects/project_01_amaala.jpg'
    ],
    certificateImage: '/images/projects/cert_01_amaala.jpg',
    featured: true,
    order: 1,
    seoTitle: 'مشروع حفر موجه أمالا البحر الأحمر | شركة العاج الفضي',
    seoDescription: 'شهادة إنجاز معتمدة لمشروع حفر نفق موجه بقطر 20 بوصة في مدينة أمالا على البحر الأحمر لصالح شركة بنية.'
  },
  {
    slug: 'al-janahin-riyadh-al-aridh',
    titleAr: 'نفق 32 بوصة لحزمة 5 أنابيب ضغط 16 بار (160.0م) - الرياض حي العارض',
    titleEn: '32" Tunnel / 5x 16-Bar Pipes (160.0m) - Riyadh Al-Aridh',
    descriptionAr: 'حفر وتوسيع نفق ثقيل بقطر 32 بوصة وسحب حزمة مركبة من 5 أنابيب ضغط 16 بار أسفل الحركة المرورية الشريانية النشطة في حي العارض بالرياض لصالح شركة الجناحين.',
    descriptionEn: 'Heavy 32-inch reamed bore pulling bundled 5-pipe configuration under live arterial traffic in Al-Aridh district, Riyadh for Al-Janahin Co.',
    client: 'شركة الجناحين (Al-Janahin Co.)',
    mainContractor: 'الجناحين للتجارة والمقاولات',
    location: 'الرياض - حي العارض',
    year: '2025',
    lengthLm: '160.0 m',
    diameter: '32" Reamed Bore (5x Bundled Pipes)',
    category: 'HDD Drilling',
    mainImage: '/images/projects/project_02_aljanahin.jpg',
    gallery: [
      '/images/projects/project_02_aljanahin.jpg'
    ],
    certificateImage: '/images/projects/cert_02_aljanahin.jpg',
    featured: true,
    order: 2,
    seoTitle: 'مشروع حفر نفق 32 بوصة حي العارض بالرياض | AACC HDD-MT',
    seoDescription: 'سجل إنجاز معتمد لحفر نفق 32 بوصة وسحب حزمة أنابيب بطول 160 متراً في الرياض.'
  },
  {
    slug: 'al-sharhan-riyadh-al-narjis',
    titleAr: 'معبر أنبوب مفرد قطر 200 ملم (117.0م) - الرياض حي النرجس',
    titleEn: '200mm Single Pipe Crossing (117.0m) - Riyadh Al-Narjis',
    descriptionAr: 'ملاحة وتوجيه مسار حفر فائق الدقة عبر طبقات صخرية شديدة القساوة عند تقاطع طريق أبي بكر الصديق بحي النرجس بالرياض لصالح شركة الشرهان.',
    descriptionEn: 'Precision bore path navigation in dense rocky strata at Abu Bakr Al Siddiq Road intersection in Al-Narjis, Riyadh for Al-Sharhan Co.',
    client: 'شركة الشرهان (Al-Sharhan Co.)',
    mainContractor: 'الشرهان للمقاولات',
    location: 'الرياض - حي النرجس (طريق أبي بكر الصديق)',
    year: '2025',
    lengthLm: '117.0 m',
    diameter: '200 mm HDPE',
    category: 'HDD Drilling',
    mainImage: '/images/projects/project_03_alnarjis.jpg',
    gallery: [
      '/images/projects/project_03_alnarjis.jpg'
    ],
    certificateImage: '/images/projects/cert_03_alnarjis.jpg',
    featured: true,
    order: 3,
    seoTitle: 'مشروع حفر موجه حي النرجس بالرياض | شركة العاج الفضي',
    seoDescription: 'حفر معبر أنبوب 200 ملم بطول 117 متراً في حي النرجس بالرياض لصالح شركة الشرهان.'
  },
  {
    slug: 'kaec-12-crossings-al-hareth',
    titleAr: 'مشروع 12 معبراً بأنابيب 160 ملم PE100 (1,200.0م) - مدينة الملك عبدالله الاقتصادية',
    titleEn: '12x Crossings 160mm PE100 (1,200.0m) - King Abdullah Economic City',
    descriptionAr: 'تنفيذ ولحام وتركيب 12 معبراً استراتيجياً لأنابيب البولي إيثيلين 160 ملم PE100 SDR11 بطول إجمالي 1,200 متر في مدينة الملك عبدالله الاقتصادية (KAEC) لصالح شركة سالم صالح الحارث.',
    descriptionEn: 'Turnkey welding and installation of 12 strategic 160mm HDPE PE100 SDR11 crossings totaling 1,200 LM at King Abdullah Economic City for Salem Saleh Al-Hareth Co.',
    client: 'مدينة الملك عبدالله الاقتصادية (KAEC)',
    mainContractor: 'شركة سالم صالح الحارث (Salem Saleh Al-Hareth)',
    location: 'رابغ - مدينة الملك عبدالله الاقتصادية (KAEC)',
    year: '2024',
    lengthLm: '1,200.0 m',
    diameter: '160 mm PE100 SDR11 (12 Crossings)',
    category: 'Water & Power Networks',
    mainImage: '/images/projects/project_04_kaec.jpg',
    gallery: [
      '/images/projects/project_04_kaec.jpg'
    ],
    certificateImage: '/images/certifications/cert_iso9001.svg',
    featured: true,
    order: 4,
    seoTitle: 'مشروع معابر مدينة الملك عبدالله الاقتصادية 1,200 متر | AACC HDD-MT',
    seoDescription: 'سجل إنجاز رسمي لتنفيذ 12 معبراً بطول 1,200 متر طولي في مدينة الملك عبدالله الاقتصادية.'
  },
  {
    slug: 'sec-dammam-jubail-railway-crossing',
    titleAr: 'حزم أنابيب 200 ملم تحت طريق الدمام - الجبيل والسكة الحديد (507.0م) - الشرقية',
    titleEn: 'Bundled 200mm Under Dammam-Jubail Hwy & Rail (507.0m) - Eastern Province',
    descriptionAr: 'توريد ولحام وحفر وتمرير حزم أنابيب 200 ملم (4 و 6 و 8 أنابيب) أسفل طريق الدمام - الجبيل السريع وخط السكة الحديد لصالح الشركة السعودية للكهرباء (SEC) ومقاولها شركة المشارق.',
    descriptionEn: 'Supply, butt-fusion welding, and heavy trenchless pull of 4, 6, and 8-pipe bundles of 200mm HDPE beneath Dammam-Jubail Highway and Railway for SEC / Al-Mashariq.',
    client: 'الشركة السعودية للكهرباء (SEC)',
    mainContractor: 'شركة المشارق (Al-Mashariq Co.)',
    location: 'المنطقة الشرقية - طريق الدمام / الجبيل',
    year: '2024',
    lengthLm: '507.0 m',
    diameter: '4, 6 & 8 Bundled 200mm HDPE',
    category: 'Highway & Rail Crossings',
    mainImage: '/images/projects/project_05_dammam_rail.jpg',
    gallery: [
      '/images/projects/project_05_dammam_rail.jpg'
    ],
    certificateImage: '/images/certifications/cert_iso9001.svg',
    featured: true,
    order: 5,
    seoTitle: 'معبر كابلات الجهد العالي طريق الدمام الجبيل والسكة الحديد | شركة العاج الفضي',
    seoDescription: 'تنفيذ معبر حفر موجه بطول 507 أمتار أسفل خط السكك الحديدية وطريق الدمام الجبيل لصالح السعودية للكهرباء.'
  },
  {
    slug: 'sec-wadi-al-summan-substation-ohtl',
    titleAr: 'خط نقل 115 ك.ف من محطة وادي الصمان 380/115 ك.ف إلى الرفيعة-2 (355.0م) - الرياض',
    titleEn: '115kV OHTL Line from Wadi Al-Summan 380/115kV Substation (355.0m) - Riyadh',
    descriptionAr: 'تنفيذ أعمال حفر أفقي موجه وتمديد كابلات الجهد العالي 115 ك.ف من محطة تحويل وادي الصمان الكبرى 380/115 ك.ف لصالح شركة المقاولات الوطنية والشركة السعودية للكهرباء.',
    descriptionEn: 'Executing heavy 115kV high-voltage transmission cable HDD crossings from the major Wadi Al-Summan 380/115kV substation for National Contracting Co. & SEC.',
    client: 'الشركة السعودية للكهرباء (SEC)',
    mainContractor: 'شركة المقاولات الوطنية (National Contracting Co.)',
    location: 'الرياض - وادي الصمان / الرفيعة',
    year: '2024',
    lengthLm: '355.0 m',
    diameter: '225 mm & 200 mm High-Voltage Ducts',
    category: 'Industrial & Substations',
    mainImage: '/images/projects/project_06_wadisumman.jpg',
    gallery: [
      '/images/projects/project_06_wadisumman.jpg'
    ],
    certificateImage: '/images/certifications/cert_iso9001.svg',
    featured: true,
    order: 6,
    seoTitle: 'مشروع محطة وادي الصمان 380/115 ك.ف | شركة العاج الفضي',
    seoDescription: 'أعمال حفر موجه لخطوط نقل الطاقة 115 ك.ف لمحطة وادي الصمان بالرياض.'
  },
  {
    slug: 'sec-dammam-gulf-street-crossing',
    titleAr: 'أنبوب 225 ملم أسفل شارع الخليج بمدينة الدمام (300.0م) - الدمام',
    titleEn: '225mm HDPE Pipe Under Gulf Street in Dammam (300.0m) - Dammam',
    descriptionAr: 'حفر موجه دقيق أسفل شارع الخليج الحيوي بكورنيش الدمام لتمديد أنبوب 225 ملم HDPE لكابلات التغذية الكهربائية لصالح مؤسسة المنار العربية والشركة السعودية للكهرباء.',
    descriptionEn: 'Precision HDD crossing beneath the critical Gulf Street corridor along Dammam Corniche installing 225mm HDPE power conduits for Almanar Arabian Corp. / SEC.',
    client: 'الشركة السعودية للكهرباء (SEC)',
    mainContractor: 'مؤسسة المنار العربية (Almanar Arabian Corp.)',
    location: 'الدمام - شارع الخليج (الكورنيش)',
    year: '2024',
    lengthLm: '300.0 m',
    diameter: '225 mm HDPE SDR11',
    category: 'Highway & Rail Crossings',
    mainImage: '/images/projects/project_07_gulfstreet.jpg',
    gallery: [
      '/images/projects/project_07_gulfstreet.jpg'
    ],
    certificateImage: '/images/certifications/cert_iso9001.svg',
    featured: true,
    order: 7,
    seoTitle: 'معبر شارع الخليج بالدمام | شركة العاج الفضي للمقاولات',
    seoDescription: 'حفر موجه وتمديد أنبوب 225 ملم بطول 300 متراً في شارع الخليج بالدمام.'
  },
  {
    slug: 'aramco-haradh-gas-field-20-inch-steel',
    titleAr: 'أنبوب غلاف صلب 20 بوصة في حقل غاز حرض (100.0م) - أرامكو السعودية',
    titleEn: '20" Steel Casing Pipe in Haradh Gas Field Area (100.0m) - Saudi Aramco',
    descriptionAr: 'تنفيذ معبر حفر موجه ودفع أنبوب غلاف صلب ثقيل 20 بوصة وفق أعلى معايير السلامة والتصاريح المعقدة (Aramco PTW) في حقل غاز حرض لصالح شركة أنابيب وأرامكو السعودية.',
    descriptionEn: 'Installation of a 20" heavy steel casing pipe under rigorous Saudi Aramco PTW safety standards in the Haradh Gas Field for ANABEEB / Saudi Aramco.',
    client: 'أرامكو السعودية (Saudi Aramco)',
    mainContractor: 'شركة أنابيب (ANABEEB)',
    location: 'حرض - حقل غاز حرض (منطقة أرامكو)',
    year: '2023',
    lengthLm: '100.0 m',
    diameter: '20" Heavy Steel Casing',
    category: 'Industrial & Substations',
    mainImage: '/images/projects/project_08_haradh.jpg',
    gallery: [
      '/images/projects/project_08_haradh.jpg'
    ],
    certificateImage: '/images/certifications/cert_iso9001.svg',
    featured: true,
    order: 8,
    seoTitle: 'مشروع حقل غاز حرض أرامكو السعودية | AACC HDD-MT',
    seoDescription: 'سجل إنجاز رسمي لحفر معبر ودفع أنبوب صلب 20 بوصة في حقل غاز حرض لصالح أرامكو السعودية.'
  }
];

export const INITIAL_EQUIPMENT: EquipmentType[] = [
  {
    nameAr: 'حفارة موجهة فيرمير D100x120 Series II Navigator',
    nameEn: 'Vermeer D100x120 Series II Navigator HDD Rig',
    categoryAr: 'حفارات هيدروليكية ثقيلة',
    categoryEn: 'Heavy Hydraulic HDD Rigs',
    tagAr: '100,000 رطل قوة دفع وسحب',
    tagEn: '100,000 lbs Thrust & Pullback',
    descriptionAr: 'منظومة الحفر العملاقة بقدرة 100,000 رطل (444.8 كيلو نيوتن) وعزم دوران 16,270 نيوتن.متر، مخصصة للمشاريع الكبرى وحفر التكوينات الصخرية القاسية والمسافات الطويلة حتى 1,200 متر وأقطار حتى 1,500 ملم.',
    descriptionEn: 'The enterprise standard 100,000 lbs (444.8 kN) thrust/pullback rig delivering 16,270 Nm rotational torque. Engineered for challenging hard rock formations, mega-crossings up to 1,200m reach, and reamed diameters up to 1,500mm.',
    specsAr: [
      { label: 'قوة السحب والدفع', value: '100,000 lbs (444.8 kN)' },
      { label: 'أقصى عزم دوران', value: '16,270 Nm (12,000 ft-lb)' },
      { label: 'أقصى قطر توسيع', value: '1,500 mm (60")' },
      { label: 'المحرك والقوة', value: 'Cummins QSC8.3 Turbo Diesel (225 HP)' },
      { label: 'أقصى مسافة حفر أحادية', value: '1,200+ m' },
      { label: 'نظام التوجيه المتوافق', value: 'DCI Falcon F5 / Aurora Display' }
    ],
    specsEn: [
      { label: 'Thrust / Pullback', value: '100,000 lbs (444.8 kN)' },
      { label: 'Max Spindle Torque', value: '16,270 Nm (12,000 ft-lb)' },
      { label: 'Max Reaming Diameter', value: '1,500 mm (60")' },
      { label: 'Engine & Output', value: 'Cummins QSC8.3 Turbo Diesel (225 HP)' },
      { label: 'Max Single Bore Reach', value: '1,200+ m' },
      { label: 'Compatible Guidance', value: 'DCI Falcon F5 / Aurora Display' }
    ],
    footerNoteAr: 'جاهزة للتشغيل الفوري في المشاريع الكبرى بالمملكة',
    footerNoteEn: 'Mobilization ready across all KSA megaproject zones',
    image: '/images/equipment/ditch_witch_jt100.jpg',
    plateImage: '/images/equipment/zlconn_metal_plate.jpg',
    featured: true,
    order: 1
  },
  {
    nameAr: 'حفارة موجهة فيرمير D36x50 Series II Navigator',
    nameEn: 'Vermeer D36x50 Series II Navigator HDD Rig',
    categoryAr: 'حفارات متوسطة للمناطق الحضرية',
    categoryEn: 'Mid-Range Urban & Highway Rigs',
    tagAr: '36,000 رطل قوة سحب',
    tagEn: '36,000 lbs Pullback',
    descriptionAr: 'حفارة متطورة متعددة الاستخدامات مخصصة للمناطق الحضرية وتقاطعات الطرق السريعة المزدحمة، بقوة سحب 36,000 رطل وعزم دوران 6,772 نيوتن.متر لتمرير خطوط الخدمات بدقة متناهية وسرعة فائقة.',
    descriptionEn: 'High-agility mid-sized drill rig optimized for tight urban rights-of-way and arterial highway underpasses. Delivers 36,000 lbs pullback and 6,772 Nm torque for rapid, highly precise utility conduit installations.',
    specsAr: [
      { label: 'قوة السحب والدفع', value: '36,000 lbs (160.1 kN)' },
      { label: 'أقصى عزم دوران', value: '6,772 Nm (4,995 ft-lb)' },
      { label: 'أقطار الحفر النموذجية', value: '110 mm - 630 mm' },
      { label: 'المحرك', value: 'John Deere PowerTech Diesel (140 HP)' },
      { label: 'السرعة الإنتاجية', value: 'حتى 180 م / يوم عمل' }
    ],
    specsEn: [
      { label: 'Thrust / Pullback', value: '36,000 lbs (160.1 kN)' },
      { label: 'Max Spindle Torque', value: '6,772 Nm (4,995 ft-lb)' },
      { label: 'Bore Range', value: '110 mm - 630 mm' },
      { label: 'Engine', value: 'John Deere PowerTech Diesel (140 HP)' },
      { label: 'Daily Production Rate', value: 'Up to 180 m / shift' }
    ],
    footerNoteAr: 'مثالية لمشاريع المدن الذكية والأحياء السكنية',
    footerNoteEn: 'Ideal for smart-city utilities & residential corridors',
    image: '/images/equipment/drillto_zt75.jpg',
    plateImage: '/images/equipment/zlconn_metal_plate.jpg',
    featured: true,
    order: 2
  },
  {
    nameAr: 'نظام التوجيه اللاسلكي الرقمي DCI Falcon F5 Telemetry',
    nameEn: 'Digital Control Inc. Falcon F5 Telemetry Guidance System',
    categoryAr: 'أنظمة الملاحة والتوجيه تحت السطحي',
    categoryEn: 'Subterranean Navigation & Guidance Systems',
    tagAr: 'دقة توجيه ملليمترية في الترددات الصعبة',
    tagEn: 'Sub-Millimeter Real-Time Guidance',
    descriptionAr: 'النظام الرائد عالمياً في التوجيه تحت السطحي والتغلب على التداخل الكهرومغناطيسي النشط أسفل الطرق السريعة وخطوط السكك الحديدية وشبكات الجهد الفائق، مع قراءة فورية للعمق والميلان وزاوية التوجيه.',
    descriptionEn: 'The global benchmark for underground drill-head tracking, featuring wideband multi-frequency signal technology that defeats active passive interference under highways, railways, and 380kV high-voltage lines.',
    specsAr: [
      { label: 'نطاق الترددات', value: 'Multi-Power Wideband (0.33 kHz - 45.0 kHz)' },
      { label: 'أقصى عمق تتبع', value: '38+ meters (125+ ft)' },
      { label: 'دقة قراءة الميلان', value: '0.1% Pitch Resolution' },
      { label: 'شاشة العرض الميدانية', value: 'DCI Aurora Touchscreen Color Display' }
    ],
    specsEn: [
      { label: 'Frequency Spectrum', value: 'Multi-Power Wideband (0.33 kHz - 45.0 kHz)' },
      { label: 'Depth Tracking Range', value: '38+ meters (125+ ft)' },
      { label: 'Pitch Precision', value: '0.1% Pitch Resolution' },
      { label: 'Driller Interface', value: 'DCI Aurora Touchscreen Color Display' }
    ],
    footerNoteAr: 'معتمد من أرامكو السعودية والشركة السعودية للكهرباء',
    footerNoteEn: 'Certified for Aramco & SEC high-interference easements',
    image: '/images/equipment/zlconn_zl900a.jpg',
    plateImage: '/images/equipment/zlconn_metal_plate.jpg',
    featured: true,
    order: 3
  },
  {
    nameAr: 'محطة خلط وإعادة تدوير سوائل الحفر Vermeer Mud Recycling Unit',
    nameEn: 'Vermeer Closed-Loop Mud Mixing & Reclaimer System',
    categoryAr: 'أنظمة السوائل والبيئة',
    categoryEn: 'Fluid Management & Environmental Systems',
    tagAr: 'تدوير مغلق 500 جالون/دقيقة',
    tagEn: '500 GPM Closed-Loop Recycling',
    descriptionAr: 'منظومة تنقية وإعادة تدوير البنتونايت وسوائل الحفر الصديقة للبيئة، مجهزة بغرابيل اهتزازية متعددة الطبقات وهيدروسايكلون لفصل الحبيبات الدقيقة، مما يقلل استهلاك المياه بنسبة تصل إلى 80%.',
    descriptionEn: 'High-volume closed-loop drilling fluid recovery and recycling plant with high-frequency shale shakers and desilter cones, minimizing freshwater intake by up to 80% while keeping environmental footprint near zero.',
    specsAr: [
      { label: 'سعة المعالجة والتدوير', value: '500 GPM (1,892 L/min)' },
      { label: 'سعة خزان الخلط', value: '15,000 Liters' },
      { label: 'غربال فصل الصخور', value: 'Dual Linear Shaker Screens' },
      { label: 'التوافق البيئي', value: 'Zero Surface Discharge (ISO 14001)' }
    ],
    specsEn: [
      { label: 'Processing Capacity', value: '500 GPM (1,892 L/min)' },
      { label: 'Mixing Tank Volume', value: '15,000 Liters' },
      { label: 'Separation Screens', value: 'Dual Linear Shaker Screens' },
      { label: 'Eco Compliance', value: 'Zero Surface Discharge (ISO 14001)' }
    ],
    footerNoteAr: 'مطابقة لمعايير الاستدامة البيئية لمشاريع البحر الأحمر ونيوم',
    footerNoteEn: 'Compliant with Red Sea & NEOM strict eco standards',
    image: '/images/equipment/rock_reamers.jpg',
    plateImage: '/images/equipment/hdpe_butt_fusion.jpg',
    featured: true,
    order: 4
  },
  {
    nameAr: 'ماكينة لحام أنابيب البولي إيثيلين هيدروليكياً',
    nameEn: 'Hydraulic HDPE Pipe Butt Fusion Welding Machine',
    categoryAr: 'معدات وآلات التلحيم والتجهيز الميداني',
    categoryEn: 'Butt Fusion & Field Pipe Tooling',
    tagAr: 'لحام هيدروليكي لأنابيب 315 مم',
    tagEn: '315 mm HDPE Hydraulic Butt Fusion',
    descriptionAr: 'تُستخدم للحام التناكبي (الدوران الحراري) لدمج أنابيب البلاستيك والبولي إيثيلين السميكة ببعضها لتصبح خطاً واحداً متصلاً بدون تسريب، مع ضغط هيدروليكي رباعي الفكوك ولوح تسخين كهربائي مخصص.',
    descriptionEn: 'High-precision hydraulic butt fusion welding unit equipped with 4-jaw clamp alignment chassis and thermostatically controlled heating plate for leak-proof PE100 / HDPE pipeline joints up to 315 mm.',
    specsAr: [
      { label: 'قطر الأنبوب الموضح', value: '315 مم (Welding 315 mm plastic pipes)' },
      { label: 'نطاق الأقطار التشغيلية', value: '90 مم - 315 مم (حتى 500 مم)' },
      { label: 'آلية الضغط', value: 'نظام هيدروليكي رباعي الفكوك' },
      { label: 'نظام التسخين', value: 'لوح تسخين حراري كهربائي مخصص' },
      { label: 'الاعتماد الميداني', value: 'وصلات متصلة 100% بدون تسريب' }
    ],
    specsEn: [
      { label: 'Welding Pipe Dia', value: '315 mm (Plastic Pipes)' },
      { label: 'Operational Range', value: '90 mm - 315 mm (Up to 500 mm)' },
      { label: 'Clamping Mechanism', value: '4-Jaw Hydraulic Pressure Unit' },
      { label: 'Heating Element', value: 'Thermostatic Electric Heating Plate' },
      { label: 'Joint Integrity', value: '100% Leak-Proof Monolithic Line' }
    ],
    footerNoteAr: 'معتمدة للحام وصلات PE100 SDR11 وفق اشتراطات أرامكو والشركة السعودية للكهرباء',
    footerNoteEn: 'Approved for PE100 SDR11 pipeline fusion under Aramco & SEC specs',
    image: '/images/projects/field_315mm_welding.jpg',
    plateImage: '/images/equipment/hdpe_butt_fusion.jpg',
    featured: true,
    order: 5
  }
];

export const INITIAL_CERTIFICATIONS: CertificationType[] = [
  {
    titleAr: 'شهادة الآيزو لنظام إدارة الجودة ISO 9001:2015',
    titleEn: 'ISO 9001:2015 Quality Management System Certification',
    certNumber: '305025112242Q',
    issuerAr: 'هيئة الاعتماد الدولية للجودة (AQC)',
    issuerEn: 'International Quality Accreditation Forum',
    descriptionAr: 'اعتماد رسمي لنظام إدارة الجودة في جميع عمليات الحفر الأفقي الموجه، وحفر الأنفاق، وإدارة المشاريع الإنشائية التحتية.',
    descriptionEn: 'Certified quality management system across HDD operations, microtunneling, and major underground utility infrastructure engineering.',
    type: 'iso',
    image: '/images/certifications/iso9001_real.jpg',
    badgeAr: 'معتمد دولياً',
    badgeEn: 'Internationally Accredited',
    detailsAr: [
      { label: 'مجال الاعتماد', value: 'الحفر الأفقي الموجه وهندسة الأنفاق وشبكات المرافق' },
      { label: 'رقم الاعتماد', value: '305025112242Q' }
    ],
    detailsEn: [
      { label: 'Scope', value: 'HDD, Microtunneling & Underground Utility Networks' },
      { label: 'Cert No', value: '305025112242Q' }
    ],
    order: 1
  },
  {
    titleAr: 'شهادة نظام إدارة البيئة ISO 14001:2015',
    titleEn: 'ISO 14001:2015 Environmental Management System',
    certNumber: '305025112243E',
    issuerAr: 'المعهد الدولي لإدارة البيئة',
    issuerEn: 'International Environmental Certification Board',
    descriptionAr: 'التزام كامل بتقليل الأثر البيئي وإعادة تدوير سوائل الحفر وضمان عدم تلويث المياه الجوفية والطبقات السطحية.',
    descriptionEn: 'Full environmental compliance, zero surface contamination, closed-loop drilling fluid reclamation, and groundwater protection.',
    type: 'iso',
    image: '/images/certifications/iso14001_real.jpg',
    badgeAr: 'التزام بيئي مستدام',
    badgeEn: 'Eco Sustainability Compliant',
    detailsAr: [
      { label: 'المطابقة البيئية', value: 'إعادة تدوير سوائل الحفر 100%' },
      { label: 'رقم الاعتماد', value: '305025112243E' }
    ],
    detailsEn: [
      { label: 'Compliance', value: '100% Closed-Loop Mud Management' },
      { label: 'Cert No', value: '305025112243E' }
    ],
    order: 2
  },
  {
    titleAr: 'شهادة نظام إدارة الصحة والسلامة المهنية ISO 45001:2018',
    titleEn: 'ISO 45001:2018 Occupational Health & Safety Management',
    certNumber: '305025112244HS',
    issuerAr: 'مجلس السلامة والصحة المهنية الدولي',
    issuerEn: 'International Occupational Health & Safety Council',
    descriptionAr: 'معيار السلامة الصارم المطبق في كافة مواقع العمل، والذي حقق سجل سلامة خالي من الإصابات (100% Zero LTI).',
    descriptionEn: 'Rigorous occupational health and safety protocols across active drilling sites, sustaining a flawless 100% Zero LTI record.',
    type: 'iso',
    image: '/images/certifications/iso45001_real.jpg',
    badgeAr: 'سجل سلامة 100%',
    badgeEn: 'Zero LTI Certified',
    detailsAr: [
      { label: 'سجل الحوادث', value: '0 حوادث مهنية معطلة للعمل' },
      { label: 'تصاريح العمل', value: 'مطابقة تامة لـ Aramco PTW' }
    ],
    detailsEn: [
      { label: 'Safety Record', value: 'Zero Lost Time Incidents (LTI)' },
      { label: 'Work Permits', value: 'Full Aramco PTW Alignment' }
    ],
    order: 3
  },
  {
    titleAr: 'السجل التجاري الرئيسي (وزارة التجارة)',
    titleEn: 'Commercial Registration (Ministry of Commerce)',
    certNumber: '1009156401',
    issuerAr: 'وزارة التجارة - المملكة العربية السعودية',
    issuerEn: 'Ministry of Commerce - KSA',
    descriptionAr: 'سجل تجاري ساري المفعول لشركة العاج الفضي للمقاولات برقم موحد 7043006183.',
    descriptionEn: 'Active Commercial Registration with Unified National Number 7043006183.',
    type: 'credential',
    image: '/images/certifications/cr_document.jpg',
    detailsAr: [
      { label: 'رقم السجل', value: '1009156401' },
      { label: 'الرقم الموحد', value: '7043006183' },
      { label: 'الحالة', value: 'نشط وساري' }
    ],
    detailsEn: [
      { label: 'CR Number', value: '1009156401' },
      { label: 'Unified No', value: '7043006183' },
      { label: 'Status', value: 'Active' }
    ],
    order: 4
  },
  {
    titleAr: 'شهادة التسجيل في ضريبة القيمة المضافة (ZATCA)',
    titleEn: 'VAT Registration Certificate (ZATCA)',
    certNumber: '312719552900003',
    issuerAr: 'هيئة الزكاة والضريبة والجمارك',
    issuerEn: 'Zakat, Tax and Customs Authority',
    descriptionAr: 'شهادة تسجيل سارية ومعتمدة في ضريبة القيمة المضافة.',
    descriptionEn: 'Official active VAT registration certification.',
    type: 'credential',
    image: '/images/certifications/vat_certificate.jpg',
    detailsAr: [
      { label: 'الرقم الضريبي', value: '312719552900003' },
      { label: 'الحالة', value: 'مسجل ونشط' }
    ],
    detailsEn: [
      { label: 'VAT Number', value: '312719552900003' },
      { label: 'Status', value: 'Active' }
    ],
    order: 5
  },
  {
    titleAr: 'شهادة العنوان الوطني المعتمد (SPL)',
    titleEn: 'National Address Registration (SPL)',
    certNumber: 'NA-13212-3315',
    issuerAr: 'البريد السعودي (SPL)',
    issuerEn: 'Saudi Post (SPL)',
    descriptionAr: 'إثبات العنوان الوطني المسجل في حي الأندلس بالرياض.',
    descriptionEn: 'Official proof of registered national business address in Riyadh.',
    type: 'credential',
    image: '/images/certifications/national_address.jpg',
    detailsAr: [
      { label: 'الرمز البريدي', value: '13212 - الرياض' },
      { label: 'رقم المبنى', value: '3315' }
    ],
    detailsEn: [
      { label: 'Postal Code', value: '13212 - Riyadh' },
      { label: 'Building No', value: '3315' }
    ],
    order: 6
  },
  {
    titleAr: 'شهادة التأمينات الاجتماعية (GOSI)',
    titleEn: 'Social Insurance Certificate (GOSI)',
    certNumber: '652371032',
    issuerAr: 'المؤسسة العامة للتأمينات الاجتماعية',
    issuerEn: 'General Organization for Social Insurance',
    descriptionAr: 'شهادة التزام بالأنظمة والتأمينات الاجتماعية بنسبة توطين مرتفعة (النطاق الأخضر).',
    descriptionEn: 'Full social insurance compliance with Platinum/High Green Saudization ranking.',
    type: 'credential',
    image: '/images/certifications/gosi_certificate.jpg',
    detailsAr: [
      { label: 'رقم المنشأة', value: '652371032' },
      { label: 'النطاق', value: 'الأخضر المرتفع' }
    ],
    detailsEn: [
      { label: 'Est. Number', value: '652371032' },
      { label: 'Saudization', value: 'High Green' }
    ],
    order: 7
  }
];

export const INITIAL_ARTICLES = [
  {
    titleAr: 'عقد التأسيس - الغلاف الرسمي',
    titleEn: 'Articles of Association - Cover',
    image: '/images/certifications/articles_cover.jpg'
  },
  {
    titleAr: 'عقد التأسيس - رأس المال 150 ألف',
    titleEn: 'Articles - Capital SAR 150,000',
    image: '/images/certifications/articles_capital.jpg'
  },
  {
    titleAr: 'عقد التأسيس - صلاحيات الإدارة التنفيذية',
    titleEn: 'Articles - Executive Powers',
    image: '/images/certifications/articles_powers.jpg'
  },
  {
    titleAr: 'عقد التأسيس - مسؤوليات الشركاء والمدير الشريك',
    titleEn: 'Articles - Managing Partner Responsibilities',
    image: '/images/certifications/articles_partner.jpg'
  },
  {
    titleAr: 'عقد التأسيس - الأنشطة التجارية المسجلة',
    titleEn: 'Articles - Registered Commercial Activities',
    image: '/images/certifications/articles_activities.jpg'
  },
  {
    titleAr: 'شهادة فيرمير التخصصية Vermeer Specialist',
    titleEn: 'Vermeer Specialist Certification',
    image: '/images/certifications/vermeer_cert.jpg'
  }
];

export const CLIENTS_LIST = [
  {
    name: 'Saudi Aramco',
    nameAr: 'أرامكو السعودية',
    categoryAr: 'قطاع الطاقة والنفط والغاز',
    categoryEn: 'Energy & Oil/Gas Sector',
    logo: '/images/clients/logo_aramco.svg'
  },
  {
    name: 'Saudi Electricity Company (SEC)',
    nameAr: 'الشركة السعودية للكهرباء',
    categoryAr: 'شبكات الجهد الفائق ومحطات التحويل',
    categoryEn: 'High-Voltage Power & Substations',
    logo: '/images/clients/logo_sec.svg'
  },
  {
    name: 'National Water Company (NWC)',
    nameAr: 'شركة المياه الوطنية',
    categoryAr: 'خطوط نقل المياه الاستراتيجية',
    categoryEn: 'Bulk Water Transmission & Utilities',
    logo: '/images/clients/logo_nwc.svg'
  },
  {
    name: 'BINYAH (Infrastructure)',
    nameAr: 'شركة بنية للمقاولات',
    categoryAr: 'تطوير البنية التحتية للمدن الكبرى',
    categoryEn: 'Mega Infrastructure Development',
    logo: '/images/clients/logo_binyah.svg'
  },
  {
    name: 'NEOM / Amaala',
    nameAr: 'نيوم / أمالا البحر الأحمر',
    categoryAr: 'مشاريع الرؤية السعودية 2030',
    categoryEn: 'Saudi Vision 2030 Giga Projects',
    logo: '/images/clients/logo_neom.svg'
  },
  {
    name: 'Red Sea Global',
    nameAr: 'البحر الأحمر الدولية',
    categoryAr: 'الوجهات العالمية المستدامة',
    categoryEn: 'Regenerative Global Tourism',
    logo: '/images/clients/logo_redsea.svg'
  },
  {
    name: 'Saudconsult',
    nameAr: 'سعود كونسلت للاستشارات',
    categoryAr: 'الاستشارات الهندسية والإشراف الفني',
    categoryEn: 'Engineering Consultancy & Supervision',
    logo: '/images/clients/logo_saudconsult.svg'
  },
  {
    name: 'King Abdullah Economic City (KAEC)',
    nameAr: 'مدينة الملك عبدالله الاقتصادية',
    categoryAr: 'المناطق الاقتصادية والمدن الصناعية',
    categoryEn: 'Economic Zones & Industrial Cities',
    logo: '/images/clients/logo_kaec.svg'
  },
  {
    name: 'Al-Mashariq Contracting',
    nameAr: 'شركة المشارق للإنشاءات',
    categoryAr: 'شبكات الطاقة والسكك الحديدية',
    categoryEn: 'Tier-1 EPC Power & Rail Infrastructure',
    logo: '/images/clients/logo_mashariq.svg'
  },
  {
    name: 'National Contracting Co. (NCC)',
    nameAr: 'شركة المقاولات الوطنية',
    categoryAr: 'محطات التحويل والخطوط الهوائية',
    categoryEn: '380kV Substations & Transmission Lines',
    logo: '/images/clients/logo_ncc.svg'
  },
  {
    name: 'Al-Sharhan Contracting',
    nameAr: 'شركة الشرهان للمقاولات',
    categoryAr: 'مشاريع الحفر الموجه في الرياض',
    categoryEn: 'Urban Trenchless Crossings - Riyadh',
    logo: '/images/clients/logo_sharhan.svg'
  },
  {
    name: 'Al-Janahin Contracting',
    nameAr: 'شركة الجناحين للتجارة والمقاولات',
    categoryAr: 'تمديد حزم الأنابيب المعقدة',
    categoryEn: 'Bundled Heavy Pipe Installations',
    logo: '/images/clients/logo_janahin.svg'
  },
  {
    name: 'ANABEEB Contracting',
    nameAr: 'شركة أنابيب للمقاولات',
    categoryAr: 'خطوط الأنابيب الفولاذية والغاز',
    categoryEn: 'Heavy Steel Pipelines & Gas Fields',
    logo: '/images/clients/logo_anabeeb.svg'
  }
];

export const CERTIFIED_PROJECTS_LOG = [
  {
    num: '#116',
    nameEn: 'Welding & Installation 160mm HDPE PE100 SDR11 in 12 Crossings @ KAEC',
    nameAr: 'لحام وتركيب أنابيب 160 ملم PE100 SDR11 في 12 معبراً بمدينة الملك عبدالله الاقتصادية',
    contractor: 'Salem Saleh Al-Hareth Co.',
    contractorAr: 'شركة سالم صالح الحارث',
    client: 'KAEC',
    clientAr: 'مدينة الملك عبدالله الاقتصادية (KAEC)',
    length: '1,200 m',
    diameter: '160 mm PE100 (12 Crossings)',
    location: 'King Abdullah Economic City (Rabigh)',
    locationAr: 'مدينة الملك عبدالله الاقتصادية - رابغ',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#053',
    nameEn: 'Supply, Welding & Install (4, 6 & 8 bundle) 200mm HDPE under Dammam-Jubail Hwy & Railway',
    nameAr: 'توريد ولحام وتركيب حزم (4 و 6 و 8 أنابيب) 200 ملم تحت طريق الدمام - الجبيل والسكة الحديد',
    contractor: 'Al-Mashariq Co.',
    contractorAr: 'شركة المشارق للمقاولات',
    client: 'Saudi Electricity Co (SEC)',
    clientAr: 'الشركة السعودية للكهرباء (SEC)',
    length: '507 m',
    diameter: '4, 6 & 8 Bundled 200mm HDPE',
    location: 'Dammam - Jubail Highway & SAR Line',
    locationAr: 'المنطقة الشرقية - طريق الدمام الجبيل والسكة الحديد',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#147',
    nameEn: '115KV OHTL from Wadi Al-Summan 380/115KV Substation to Rafeah-2 in Riyadh',
    nameAr: 'خط نقل 115 ك.ف من محطة وادي الصمان 380/115 ك.ف إلى الرفيعة-2 بالرياض',
    contractor: 'National Contracting Co.',
    contractorAr: 'شركة المقاولات الوطنية',
    client: 'Saudi Electricity Co (SEC)',
    clientAr: 'الشركة السعودية للكهرباء (SEC)',
    length: '355 m',
    diameter: '225 mm & 200 mm HV Ducts',
    location: 'Riyadh - Wadi Al-Summan',
    locationAr: 'الرياض - وادي الصمان',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#135',
    nameEn: '225mm HDPE Pipe underneath Gulf Street in Dammam',
    nameAr: 'أنبوب 225 ملم HDPE أسفل شارع الخليج بكورنيش الدمام',
    contractor: 'Almanar Arabian Corp.',
    contractorAr: 'مؤسسة المنار العربية',
    client: 'Saudi Electricity Co (SEC)',
    clientAr: 'الشركة السعودية للكهرباء (SEC)',
    length: '300 m',
    diameter: '225 mm HDPE SDR11',
    location: 'Dammam - Gulf Street Corniche',
    locationAr: 'الدمام - شارع الخليج',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#054',
    nameEn: 'Drill & Install HDPE Pipes 6 × 200mm underneath Railroad & King Fahad Road Dammam',
    nameAr: 'حفر وتركيب 6 أنابيب × 200 ملم HDPE أسفل السكة الحديد وطريق الملك فهد بالدمام',
    contractor: 'Almanar Arabian Corp.',
    contractorAr: 'مؤسسة المنار العربية',
    client: 'Saudi Electricity Co (SEC)',
    clientAr: 'الشركة السعودية للكهرباء (SEC)',
    length: '299 m',
    diameter: '6x 200 mm HDPE Bundle',
    location: 'Dammam - King Fahad Rd & SAR Track',
    locationAr: 'الدمام - طريق الملك فهد وسكة القطار',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#092',
    nameEn: 'HDD 32" Reamed Bore for 5-Pipe 16-Bar Bundle in Al-Aridh District, Riyadh',
    nameAr: 'نفق حفر موجه 32 بوصة لحزمة 5 أنابيب ضغط 16 بار بحي العارض بالرياض',
    contractor: 'Al-Janahin Co.',
    contractorAr: 'شركة الجناحين للتجارة والمقاولات',
    client: 'Al-Janahin Co.',
    clientAr: 'شركة الجناحين',
    length: '160 m',
    diameter: '32" Reamed Bore (5x Pipes)',
    location: 'Riyadh - Al-Aridh District',
    locationAr: 'الرياض - حي العارض',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#088',
    nameEn: '200mm HDPE High-Precision Bore at Abu Bakr Al-Siddiq Intersection, Al-Narjis',
    nameAr: 'حفر موجه أنبوب 200 ملم HDPE عند تقاطع طريق أبي بكر الصديق بحي النرجس',
    contractor: 'Al-Sharhan Co.',
    contractorAr: 'شركة الشرهان للمقاولات',
    client: 'Al-Sharhan Co.',
    clientAr: 'شركة الشرهان',
    length: '117 m',
    diameter: '200 mm HDPE Single',
    location: 'Riyadh - Al-Narjis District',
    locationAr: 'الرياض - حي النرجس (طريق أبي بكر)',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#165',
    nameEn: '20" Heavy Steel Casing Pipe Crossing in Haradh Gas Field Area',
    nameAr: 'أنبوب غلاف صلب 20 بوصة في منطقة حقل غاز حرض',
    contractor: 'ANABEEB Co.',
    contractorAr: 'شركة أنابيب',
    client: 'Saudi Aramco',
    clientAr: 'أرامكو السعودية',
    length: '100 m',
    diameter: '20" Heavy Steel Casing',
    location: 'Haradh - Saudi Aramco Gas Field',
    locationAr: 'حرض - حقل غاز حرض (أرامكو)',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  },
  {
    num: '#182',
    nameEn: '20" Directional Bore for 18" Water Carrier Pipe in Amaala Red Sea Megaproject',
    nameAr: 'نفق موجه 20 بوصة لتمرير خط مياه 18 بوصة بمشروع أمالا البحر الأحمر',
    contractor: 'Binyah Co.',
    contractorAr: 'شركة بنية (Binyah)',
    client: 'Amaala / Red Sea Global',
    clientAr: 'أمالا / البحر الأحمر الدولية',
    length: '44 m',
    diameter: '20" Bore / 18" Carrier Pipe',
    location: 'Tabuk - Amaala Red Sea',
    locationAr: 'منطقة تبوك - أمالا البحر الأحمر',
    statusEn: 'Certified & Delivered',
    statusAr: 'مكتمل ومسلّم بشهادة رسمية'
  }
];

export const SCHEMATICS_AND_PHOTOS = {
  schematics: [
    {
      titleAr: 'مخطط المقطع الطولي (As-Built) لنفق الحفر الموجه أسفل مسار السكة الحديد',
      titleEn: 'As-Built Bore Profile & Geometry Drawing under SAR Railroad Corridor',
      tagAr: 'معبر سكة حديد',
      tagEn: 'Rail Crossing',
      image: '/images/schematics/saudconsult_sketch.jpg',
    },
    {
      titleAr: 'مخطط حسابات قوى السحب وتوسع النفق لخط أنابيب 32 بوصة بالرياض',
      titleEn: 'Pullback Hydro-Calculation & Reaming Path for 32" Bore - Riyadh',
      tagAr: 'دراسة جيوتقنية',
      tagEn: 'Geotechnical Bore',
      image: '/images/schematics/section_aa.jpg',
    },
    {
      titleAr: 'مخطط مسار كابلات الجهد العالي 115 ك.ف بمحطة وادي الصمان',
      titleEn: '115kV High-Voltage Underground Conduit Alignment - Wadi Al-Summan',
      tagAr: 'كابلات 115 ك.ف',
      tagEn: '115kV HV Grid',
      image: '/images/schematics/depth_telemetry.jpg',
    }
  ],
  fieldPhotos: [
    {
      titleAr: 'عمليات توسيع وحفر النفق الصخري قطر 42 بوصة',
      titleEn: '42-inch Rock Reaming & 110m Tunnel Operations',
      image: '/images/projects/field_42inch_reamer.jpg'
    },
    {
      titleAr: 'لحام أنابيب البولي إيثيلين 315 ملم والتجهيزات الميدانية',
      titleEn: '315mm Butt Fusion Welding & Tooling Setup',
      image: '/images/projects/field_315mm_welding.jpg'
    },
    {
      titleAr: 'تنفيذ خطوط كابلات الطاقة والجهد العالي بمشروع أمالا / نيوم',
      titleEn: 'NEOM / Amaala High-Voltage Power Lines Field Works',
      image: '/images/projects/field_neom_amaala.jpg'
    },
    {
      titleAr: 'فحص واستلام أعمال الحفر الموجه مع فريق العميل والاستشاري',
      titleEn: 'On-Site Quality Inspection & Client Engineering Handover',
      image: '/images/projects/field_client_inspection.jpg'
    }
  ]
};

export const INITIAL_HERO_SLIDES = [
  {
    id: 'hero-1',
    image: '/images/hero/hero_slide_1.jpg',
    titleAr: 'حفارات الحفر الأفقي الموجه العملاقة (HDD)',
    titleEn: 'Heavy Directional Drilling (HDD) Rig Fleet',
    subtitleAr: 'سعة سحب 100,000 رطل • Ditch Witch & Vermeer مع كادر هندسي معتمد',
    subtitleEn: '100,000 lbs Pullback • All Terrain Systems & Aramco PTW Certified Crew',
    badgeAr: 'أسطول الحفر التخصصي',
    badgeEn: 'Specialized Fleet',
    active: true,
    order: 1,
  },
  {
    id: 'hero-2',
    image: '/images/hero/hero_slide_2.jpg',
    titleAr: 'أنفاق البنية التحتية الدقيقة (Microtunneling)',
    titleEn: 'Microtunneling & Subterranean Shafts',
    subtitleAr: 'حفر الأنفاق الدقيقة بأقطار حتى 1,500 ملم لشبكات المياه والصرف والسيول',
    subtitleEn: 'Subterranean Microtunneling up to 1,500 mm for strategic water & storm grids',
    badgeAr: 'أنفاق عميقة بدون حفر مفتوح',
    badgeEn: 'Trenchless Microtunneling',
    active: true,
    order: 2,
  },
  {
    id: 'hero-3',
    image: '/images/hero/hero_slide_3.jpg',
    titleAr: 'معابر الطرق السريعة وسكك الحديد الكبرى',
    titleEn: 'Highways, Rails & Strategic Crossings',
    subtitleAr: 'تنفيذ تقاطعات صخرية وترابية معقدة دون إيقاف الحركة المرورية الحيوية',
    subtitleEn: 'Executing complex rock crossings under active railways & highways with 0 disruption',
    badgeAr: 'معابر استراتيجية آمنة',
    badgeEn: 'Non-Disruptive Crossings',
    active: true,
    order: 3,
  },
  {
    id: 'hero-4',
    image: '/images/hero/hero_slide_4.jpg',
    titleAr: 'تمديد كابلات الجهد العالي وشبكات الطاقة',
    titleEn: 'High-Voltage Power & Utility Lifelines',
    subtitleAr: 'حلول متكاملة لربط محطات التحويل 380 ك.ف وشبكات الألياف الضوئية الذكية',
    subtitleEn: 'Interconnecting 380kV substations, energy grids, and smart telecom conduits',
    badgeAr: 'طاقة وبنية تحتية مستدامة',
    badgeEn: 'High-Voltage Energy Grid',
    active: true,
    order: 4,
  },
];

export const INITIAL_CLIENTS = CLIENTS_LIST.map((c, i) => ({
  id: `client-${i + 1}`,
  name: c.name,
  nameAr: c.nameAr,
  categoryAr: c.categoryAr,
  categoryEn: c.categoryEn,
  logo: c.logo,
  order: i + 1,
  active: true,
  website: '',
}));

export const INITIAL_BRANDING_SETTINGS = {
  logoUrl: '/images/logo/aacc_official_logo.png',
  logoHeight: 52,
  brandNameAr: 'شركة العاج الفضي للمقاولات',
  brandNameEn: 'Alaaj Alfedhi Contracting Company',
  taglineAr: 'حلول الحفر الأفقي الموجه والأنفاق الدقيقة (HDD & Microtunneling)',
  taglineEn: 'Directional Drilling & Microtunneling Specialists',
  primaryColor: '#0f382a', // Royal Emerald
  accentGold: '#c5a869', // Saudi Metallic Gold
  darkBg: '#0c0e10', // Deep Obsidian
  faviconUrl: '/favicon.ico',
};

export const INITIAL_CONTACT_SETTINGS = {
  phone: '+966 55 522 7109',
  secondaryPhone: '+966 50 123 4567',
  whatsapp: '+966555227109',
  email: 'info@aacc-ksa.com',
  tendersEmail: 'tenders@aacc-ksa.com',
  addressAr: 'المملكة العربية السعودية - الرياض - حي الملقا - طريق أنس بن مالك',
  addressEn: 'Anas Bin Malik Road, Al-Malqa District, Riyadh, Kingdom of Saudi Arabia',
  cr: '1010892415',
  unifiedNo: '7028913401',
  vatNo: '311289451200003',
  gosiNo: '629810452',
  chamberNo: '101000892415',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115934.33128918235!2d46.6014498877083!3d24.814321743128543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee304c554900f%3A0xb35515ca49b6b7a2!2sAl%20Malqa%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
  social: {
    twitter: 'https://x.com/aacc_ksa',
    linkedin: 'https://linkedin.com/company/aacc-ksa',
    instagram: 'https://instagram.com/aacc_ksa',
    youtube: 'https://youtube.com/@aacc_ksa',
    facebook: 'https://facebook.com/aacc.ksa',
  },
};
