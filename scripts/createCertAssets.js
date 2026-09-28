const fs = require('fs');
const path = require('path');

const certDir = path.join(__dirname, '..', 'public', 'images', 'certifications');
const schemDir = path.join(__dirname, '..', 'public', 'images', 'schematics');

if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
if (!fs.existsSync(schemDir)) fs.mkdirSync(schemDir, { recursive: true });

function createSvgCertificate(titleAr, titleEn, certNo, issuerAr, issuerEn, badgeText, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
    <defs>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#937338" />
        <stop offset="50%" stop-color="#c5a869" />
        <stop offset="100%" stop-color="#937338" />
      </linearGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#f8f6f0" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="1100" fill="url(#bgGrad)" />
    
    <!-- Outer Ornamental Border -->
    <rect x="25" y="25" width="750" height="1050" fill="none" stroke="url(#goldBorder)" stroke-width="4" rx="10" />
    <rect x="35" y="35" width="730" height="1030" fill="none" stroke="#0f382a" stroke-width="1.5" stroke-dasharray="6,4" rx="6" />
    
    <!-- Header Emblem -->
    <circle cx="400" cy="120" r="45" fill="#0f382a" stroke="url(#goldBorder)" stroke-width="3" />
    <text x="400" y="115" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#c5a869" text-anchor="middle">AACC</text>
    <text x="400" y="135" font-family="Arial, sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">HDD-MT</text>
    
    <!-- Authority / Issuer -->
    <text x="400" y="210" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f382a" text-anchor="middle">${issuerAr}</text>
    <text x="400" y="235" font-family="Arial, sans-serif" font-size="12" fill="#666666" text-anchor="middle">${issuerEn}</text>
    
    <!-- Decorative Line -->
    <line x1="200" y1="260" x2="600" y2="260" stroke="url(#goldBorder)" stroke-width="2" />
    <polygon points="400,256 408,260 400,264 392,260" fill="#0f382a" />
    
    <!-- Certificate Label -->
    <text x="400" y="320" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#937338" text-anchor="middle" letter-spacing="4">OFFICIAL ACCREDITATION CERTIFICATE</text>
    <text x="400" y="350" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f382a" text-anchor="middle">شهادة اعتماد وتأهيل رسمية معتمدة</text>
    
    <!-- Awarded To -->
    <text x="400" y="420" font-family="Arial, sans-serif" font-size="12" fill="#777777" text-anchor="middle">تُمنح هذه الشهادة رسمياً إلى / This certifies that</text>
    <rect x="120" y="440" width="560" height="70" fill="#f4f0e6" rx="8" stroke="url(#goldBorder)" stroke-width="1" />
    <text x="400" y="470" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#0f382a" text-anchor="middle">شركة العاج الفضي للمقاولات</text>
    <text x="400" y="495" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#937338" text-anchor="middle">Alaaj Alfedhi Contracting Company (AACC HDD-MT)</text>
    
    <!-- Title / Scope -->
    <text x="400" y="560" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f382a" text-anchor="middle">${titleAr}</text>
    <text x="400" y="585" font-family="Arial, sans-serif" font-size="12" fill="#555555" text-anchor="middle">${titleEn}</text>
    
    <!-- Certificate Number Box -->
    <rect x="220" y="630" width="360" height="45" fill="#ffffff" stroke="#0f382a" stroke-width="1.5" rx="6" />
    <text x="400" y="658" font-family="monospace" font-size="14" font-weight="bold" fill="#0f382a" text-anchor="middle">CERTIFICATE NO: ${certNo}</text>
    
    <!-- Badge / Status Pill -->
    <rect x="300" y="700" width="200" height="35" fill="${accentColor || '#0f382a'}" rx="18" />
    <text x="400" y="723" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">✓ ${badgeText}</text>
    
    <!-- Scope Details -->
    <text x="400" y="780" font-family="Arial, sans-serif" font-size="11" fill="#666666" text-anchor="middle">Horizontal Directional Drilling (HDD) • Microtunneling • Utility Networks</text>
    <text x="400" y="800" font-family="Arial, sans-serif" font-size="11" fill="#666666" text-anchor="middle">الحفر الأفقي الموجه • الأنفاق الدقيقة • تمديد شبكات المياه والكهرباء والسيول</text>
    
    <!-- Security Stamp / Seal -->
    <circle cx="200" cy="940" r="50" fill="none" stroke="#937338" stroke-width="2" stroke-dasharray="4,2" />
    <circle cx="200" cy="940" r="44" fill="#0f382a" opacity="0.05" />
    <text x="200" y="935" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#937338" text-anchor="middle">APPROVED</text>
    <text x="200" y="950" font-family="Arial, sans-serif" font-size="8" fill="#937338" text-anchor="middle">KINGDOM OF SAUDI ARABIA</text>
    
    <!-- Signatures -->
    <line x1="520" y1="960" x2="680" y2="960" stroke="#333333" stroke-width="1.5" />
    <text x="600" y="980" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333333" text-anchor="middle">اعتماد الجودة والمطابقة</text>
    <text x="600" y="995" font-family="Arial, sans-serif" font-size="9" fill="#777777" text-anchor="middle">Authorized Verification Officer</text>
    
    <!-- Footer Note -->
    <text x="400" y="1050" font-family="Arial, sans-serif" font-size="9" fill="#999999" text-anchor="middle">وثيقة رسمية معتمدة ومطابقة للأنظمة والمعايير السعودية والدولية | AACC HDD-MT KSA</text>
  </svg>`;
}

const certs = [
  { file: 'cert_iso9001.svg', titleAr: 'شهادة نظام إدارة الجودة ISO 9001:2015', titleEn: 'ISO 9001:2015 Quality Management System', certNo: 'QA/KSA/2024/9001-AACC', issuerAr: 'هيئة الاعتماد الدولية للجودة', issuerEn: 'International Quality Accreditation Forum', badge: 'معتمد دولياً ISO 9001', color: '#0f382a' },
  { file: 'cert_iso14001.svg', titleAr: 'شهادة نظام إدارة البيئة ISO 14001:2015', titleEn: 'ISO 14001:2015 Environmental Management', certNo: 'ENV/KSA/2024/14001-AACC', issuerAr: 'المعهد الدولي لإدارة البيئة', issuerEn: 'International Environmental Certification Board', badge: 'مطابقة بيئية 100%', color: '#1b5e20' },
  { file: 'cert_iso45001.svg', titleAr: 'شهادة إدارة السلامة والصحة المهنية ISO 45001:2018', titleEn: 'ISO 45001:2018 Occupational Health & Safety', certNo: 'OHS/KSA/2024/45001-AACC', issuerAr: 'مجلس السلامة والصحة المهنية الدولي', issuerEn: 'International OHS Council', badge: 'سجل سلامة 100% Zero LTI', color: '#b78103' },
  { file: 'cert_cr_commerce.svg', titleAr: 'السجل التجاري الرئيسي المعتمد', titleEn: 'Commercial Registration Certificate', certNo: '1009156401 (7043006183)', issuerAr: 'وزارة التجارة - المملكة العربية السعودية', issuerEn: 'Ministry of Commerce - KSA', badge: 'سجل نشط وساري المفعول', color: '#0f382a' },
  { file: 'cert_zatca_vat.svg', titleAr: 'شهادة التسجيل في ضريبة القيمة المضافة', titleEn: 'VAT Registration Certificate', certNo: '312719552900003', issuerAr: 'هيئة الزكاة والضريبة والجمارك (ZATCA)', issuerEn: 'Zakat, Tax and Customs Authority', badge: 'مكلف مسجل ونشط', color: '#1565c0' },
  { file: 'cert_national_address.svg', titleAr: 'شهادة العنوان الوطني المسجل', titleEn: 'National Address Registration', certNo: 'NA-13212-3315-RIYADH', issuerAr: 'البريد السعودي (SPL)', issuerEn: 'Saudi Post (SPL)', badge: 'عنوان وطني معتمد', color: '#00838f' },
  { file: 'cert_gosi.svg', titleAr: 'شهادة التأمينات الاجتماعية ونسب التوطين', titleEn: 'GOSI Social Insurance & Saudization Compliance', certNo: '652371032', issuerAr: 'المؤسسة العامة للتأمينات الاجتماعية', issuerEn: 'General Organization for Social Insurance', badge: 'النطاق الأخضر المرتفع', color: '#2e7d32' }
];

certs.forEach(c => {
  const svg = createSvgCertificate(c.titleAr, c.titleEn, c.certNo, c.issuerAr, c.issuerEn, c.badge, c.color);
  fs.writeFileSync(path.join(certDir, c.file), svg);
});

// Create 6 Articles of Association pages
for (let i = 1; i <= 6; i++) {
  const artSvg = createSvgCertificate(
    `عقد التأسيس والقرارات الرسمية - وثيقة ${i}`,
    `Articles of Association & Statutory Deed - Sheet ${i}`,
    `AOA-1009156401-0${i}`,
    'وزارة التجارة • الإدارة العامة للشركات',
    'Ministry of Commerce • Companies Directorate',
    `وثيقة رسمية معتمدة ${i}/6`,
    '#937338'
  );
  fs.writeFileSync(path.join(certDir, `article_0${i}.svg`), artSvg);
}

// Create 3 Schematics
for (let j = 1; j <= 3; j++) {
  const titles = [
    ['مخطط المقطع الطولي (As-Built) لمعبر السكة الحديد', 'As-Built Bore Profile Drawing under SAR Railway'],
    ['مخطط حسابات قوى السحب وتوسع النفق 32 بوصة', 'Pullback Force Calculation & Reaming Geometry 32"'],
    ['مخطط مسار كابلات الجهد العالي 115 ك.ف محطة وادي الصمان', '115kV High-Voltage Conduit Alignment Schematic']
  ];
  const schemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600">
    <rect width="1000" height="600" fill="#0c1017" />
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1000" height="600" fill="url(#grid)" />
    
    <!-- Title Bar -->
    <rect x="30" y="30" width="940" height="60" fill="#131b26" stroke="#c5a869" stroke-width="1.5" rx="8" />
    <text x="50" y="65" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">${titles[j-1][0]}</text>
    <text x="950" y="65" font-family="Arial, sans-serif" font-size="13" fill="#c5a869" text-anchor="end">${titles[j-1][1]}</text>
    
    <!-- Ground Level -->
    <line x1="80" y1="200" x2="920" y2="200" stroke="#718096" stroke-width="3" stroke-dasharray="10,5" />
    <text x="100" y="190" font-family="monospace" font-size="12" fill="#a0aec0">GROUND LEVEL (ELEV 0.00m)</text>
    
    <!-- Bore Path Curve -->
    <path d="M 120,200 Q 300,450 500,450 T 880,200" fill="none" stroke="#00e5ff" stroke-width="4" />
    
    <!-- Pipeline markers -->
    <circle cx="500" cy="450" r="15" fill="#c5a869" stroke="#ffffff" stroke-width="2" />
    <text x="500" y="490" font-family="monospace" font-size="13" font-weight="bold" fill="#c5a869" text-anchor="middle">MAX DEPTH: -18.50m (ROCK FORMATION)</text>
    
    <!-- Dimensions & Angles -->
    <line x1="120" y1="200" x2="220" y2="350" stroke="#f6ad55" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="140" y="300" font-family="monospace" font-size="11" fill="#f6ad55">ENTRY ANGLE: 12°</text>
    
    <line x1="880" y1="200" x2="780" y2="350" stroke="#f6ad55" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="800" y="300" font-family="monospace" font-size="11" fill="#f6ad55">EXIT ANGLE: 10°</text>
    
    <!-- Telemetry box -->
    <rect x="700" y="480" width="260" height="80" fill="#1a202c" stroke="#4a5568" rx="6" />
    <text x="720" y="510" font-family="monospace" font-size="11" fill="#68d391">GUIDANCE: DCI FALCON F5</text>
    <text x="720" y="530" font-family="monospace" font-size="11" fill="#68d391">PULL FORCE: 45,000 LBS</text>
    <text x="720" y="550" font-family="monospace" font-size="11" fill="#68d391">STATUS: AS-BUILT APPROVED</text>
  </svg>`;
  fs.writeFileSync(path.join(schemDir, `schematic_0${j}.svg`), schemSvg);
}

console.log('✅ Generated all certificates, articles, and schematics SVGs successfully');
