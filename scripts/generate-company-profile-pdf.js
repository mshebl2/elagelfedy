const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

function getBase64Image(relativePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'public', relativePath);
    if (!fs.existsSync(fullPath)) return '';
    const ext = path.extname(fullPath).toLowerCase();
    const mimeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp'
    };
    const mime = mimeMap[ext] || 'image/jpeg';
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${data}`;
  } catch (e) {
    return '';
  }
}

async function generateProfilePdf() {
  console.log('=== GENERATING AACC LUXURY COMPANY PROFILE PDF ===\n');

  // Load assets as Base64 for 100% reliable offline rendering
  const logoMain = getBase64Image('images/logo/aacc_official_logo.png') || getBase64Image('images/logo/aacc_logo_gold.png');
  const logoWhite = getBase64Image('images/logo/aacc_logo_white.png') || logoMain;

  // Leaders
  const leaderMahmoud = getBase64Image('images/leadership/mahmoud_alsheakh.jpg') || getBase64Image('images/leadership/leader_mahmoud.jpg');
  const leaderMouayed = getBase64Image('images/leadership/mouayed_masoud.jpg') || getBase64Image('images/leadership/leader_mouayed.jpg');

  // Projects
  const projAmaala = getBase64Image('images/projects/project_01_amaala.jpg');
  const projJanahin = getBase64Image('images/projects/project_02_aljanahin.jpg');
  const projNarjis = getBase64Image('images/projects/project_03_alnarjis.jpg');
  const projKaec = getBase64Image('images/projects/project_04_kaec.jpg');
  const projRail = getBase64Image('images/projects/project_05_dammam_rail.jpg');
  const projWadi = getBase64Image('images/projects/project_06_wadisumman.jpg');
  const projGulf = getBase64Image('images/projects/project_07_gulfstreet.jpg');
  const projField = getBase64Image('images/projects/field_neom_amaala.jpg');

  // Equipment
  const equipD100 = getBase64Image('images/equipment/equipment_01_vermeer_d100.jpg');
  const equipD36 = getBase64Image('images/equipment/equipment_02_vermeer_d36.jpg');
  const equipFalcon = getBase64Image('images/equipment/equipment_03_dci_falcon.jpg');
  const equipMud = getBase64Image('images/equipment/equipment_04_mud_recycling.jpg');

  // Certs
  const certIso9001 = getBase64Image('images/certifications/iso9001_real.jpg') || getBase64Image('images/certifications/cert_iso9001.svg');
  const certIso14001 = getBase64Image('images/certifications/iso14001_real.jpg') || getBase64Image('images/certifications/cert_iso14001.svg');
  const certIso45001 = getBase64Image('images/certifications/iso45001_real.jpg') || getBase64Image('images/certifications/cert_iso45001.svg');

  // Clients
  const clientAramco = getBase64Image('images/clients/logo_aramco.svg') || getBase64Image('images/clients/logo_aramco.png');
  const clientSec = getBase64Image('images/clients/logo_sec.svg') || getBase64Image('images/clients/logo_sec.png');
  const clientNwc = getBase64Image('images/clients/logo_nwc.svg') || getBase64Image('images/clients/logo_nwc.png');
  const clientBinyah = getBase64Image('images/clients/logo_binyah.svg') || getBase64Image('images/clients/logo_binyah.png');
  const clientKaec = getBase64Image('images/clients/logo_kaec.svg') || getBase64Image('images/clients/logo_kaec.png');
  const clientRedSea = getBase64Image('images/clients/logo_redsea.svg');

  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>AACC Company Profile 2026</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
      background-color: #ffffff;
      color: #1e293b;
      line-height: 1.45;
      font-size: 10.5pt;
    }
    .en-font {
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      background: #ffffff;
    }
    
    /* Global Page Header & Footer */
    .page-header {
      height: 24mm;
      padding: 6mm 15mm 0 15mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid #e2e8f0;
    }
    .header-logo {
      height: 12mm;
      object-fit: contain;
    }
    .header-tagline {
      text-align: left;
      font-size: 8pt;
      color: #64748b;
      font-weight: 600;
    }
    .header-tagline span {
      color: #0f382a;
      font-weight: 800;
    }
    .page-footer {
      height: 16mm;
      padding: 0 15mm 4mm 15mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #e2e8f0;
      font-size: 7.5pt;
      color: #64748b;
      margin-top: auto;
    }
    .page-content {
      padding: 8mm 15mm 6mm 15mm;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Colors */
    .text-emerald { color: #0f382a; }
    .bg-emerald { background-color: #0f382a; }
    .text-gold { color: #c5a869; }
    .bg-gold { background-color: #c5a869; }
    .bg-light-gold { background-color: #fcf9f2; }
    
    /* Page 1: Cover */
    .cover-page {
      background: radial-gradient(circle at 80% 20%, #164e3b 0%, #0a251c 60%, #061711 100%);
      color: #ffffff;
      padding: 20mm 18mm 15mm 18mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(197, 168, 105, 0.15);
      border: 1px solid rgba(197, 168, 105, 0.4);
      border-radius: 30px;
      color: #e5cf96;
      font-size: 9.5pt;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .cover-title {
      font-size: 34pt;
      font-weight: 900;
      line-height: 1.15;
      color: #ffffff;
      margin-top: 12mm;
    }
    .cover-title span {
      color: #dfc68b;
    }
    .cover-subtitle {
      font-size: 13pt;
      color: #cbd5e1;
      font-weight: 400;
      margin-top: 6mm;
      max-width: 90%;
      line-height: 1.6;
    }
    .cover-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 10mm;
      padding: 15px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
    }
    .cover-stat-box {
      border-inline-end: 1px solid rgba(255, 255, 255, 0.15);
      padding-inline-end: 10px;
    }
    .cover-stat-box:last-child {
      border-inline-end: none;
    }
    .cover-stat-num {
      font-size: 18pt;
      font-weight: 900;
      color: #e5cf96;
      font-family: Arial, sans-serif;
    }
    .cover-stat-label {
      font-size: 8pt;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Section Header Titles */
    .sec-title-wrap {
      margin-bottom: 6mm;
    }
    .sec-sub {
      color: #937338;
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sec-sub::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 3px;
      background: #c5a869;
      border-radius: 2px;
    }
    .sec-heading {
      font-size: 18pt;
      font-weight: 900;
      color: #0f382a;
      line-height: 1.2;
    }

    /* Cards & Grids */
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
    }
    .card-emerald {
      background: #f4f8f6;
      border: 1px solid #d1e2db;
      border-radius: 10px;
      padding: 14px;
    }

    /* Leadership Box */
    .leader-card {
      display: flex;
      gap: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .leader-img {
      width: 65px;
      height: 75px;
      border-radius: 8px;
      object-fit: cover;
      border: 1.5px solid #c5a869;
    }

    /* Projects Grid */
    .project-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .project-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .project-img {
      height: 90px;
      width: 100%;
      object-fit: cover;
    }
    .project-body {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Equipment Table */
    .tech-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
    }
    .tech-table th {
      background: #0f382a;
      color: #ffffff;
      text-align: right;
      padding: 8px 10px;
      font-weight: 700;
    }
    .tech-table td {
      padding: 7px 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    .tech-table tr:nth-child(even) {
      background: #f8fafc;
    }

    /* Clients Grid */
    .clients-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 10px;
    }
    .client-box {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 85px;
      background: #ffffff;
    }
    .client-box img {
      max-height: 42px;
      max-width: 80%;
      object-fit: contain;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER PAGE ==================== -->
  <div class="page cover-page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <img src="${logoWhite}" alt="AACC Logo" style="height: 24mm; object-fit: contain;">
      <div style="text-align: left;">
        <span class="cover-badge">
          <span>المملكة العربية السعودية • 2026</span>
        </span>
      </div>
    </div>

    <div>
      <div style="font-size: 11pt; color: #dfc68b; font-weight: 800; letter-spacing: 1.5px; margin-bottom: 8px;">
        الملف التعريفي الشامل للشركة • CORPORATE PROFILE
      </div>
      <h1 class="cover-title">
        شركة العاج الفضي<br>
        <span>للتجارة والمقاولات</span>
      </h1>
      <p style="font-size: 12pt; color: #94a3b8; font-weight: 700; letter-spacing: 0.5px; margin-top: 2px;">
        ALAAJ ALFEDHI CONTRACTING COMPANY (AACC HDD-MT)
      </p>
      <p class="cover-subtitle">
        الريادة الهندسية التخصصية في تنفيذ معابر <strong>الحفر الأفقي الموجه (HDD)</strong> حتى قطر 1,500 ملم، و<strong>حفر الأنفاق الدقيقة (Microtunneling)</strong>، وشبكات المرافق التحت أرضية الكبرى بالمملكة وفق أعلى معايير أرامكو وISO.
      </p>

      <div class="cover-stats-grid">
        <div class="cover-stat-box">
          <div class="cover-stat-num">+12,136</div>
          <div class="cover-stat-label">متر طولي منجز بالمملكة</div>
        </div>
        <div class="cover-stat-box">
          <div class="cover-stat-num">100,000</div>
          <div class="cover-stat-label">رطل أقصى قوة سحب HDD</div>
        </div>
        <div class="cover-stat-box">
          <div class="cover-stat-num">1,500 mm</div>
          <div class="cover-stat-label">أقصى قطر حفر موجه (60")</div>
        </div>
        <div class="cover-stat-box">
          <div class="cover-stat-num">100%</div>
          <div class="cover-stat-label">سجل السلامة المهنية (Zero LTI)</div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 12px; font-size: 8.5pt; color: #94a3b8;">
      <div>
        <strong>المقر الرئيسي:</strong> الرياض، حي الأندلس، طريق حفصة بنت عمر<br>
        <strong>السجل التجاري:</strong> 1010952055 | <strong>سنة الإصدار:</strong> 2026
      </div>
      <div style="text-align: left;">
        <span style="color: #e5cf96; font-weight: 800;">معتمدون لدى:</span> أرامكو السعودية • الكهرباء (SEC) • المياه (NWC)
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 2: EXECUTIVE MESSAGE & INDEX ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>شركة العاج الفضي للمقاولات</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">EXECUTIVE LEADERSHIP</div>
        <h2 class="sec-heading">كلمة الإدارة التنفيذية وفهرس البروفايل</h2>
      </div>

      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 16px; margin-bottom: 12px;">
        <!-- Leaders -->
        <div>
          <div class="leader-card">
            <img src="${leaderMahmoud}" alt="Mahmoud" class="leader-img">
            <div>
              <div style="font-size: 11pt; font-weight: 800; color: #0f382a;">م. محمود عبيد الشيخ</div>
              <div style="font-size: 8pt; color: #937338; font-weight: 700;">المؤسس المشارك والرئيس التنفيذي (CEO) • 18+ سنة خبرة</div>
              <p style="font-size: 7.8pt; color: #475569; margin-top: 4px; line-height: 1.4;">
                «انطلاقاً من مسيرة تمتد لأكثر من 18 عاماً في قيادة عمليات الحفر الأفقي الموجه مع كبرى المشاريع بالمملكة، تأسست شركة العاج الفضي لتكون الذراع الهندسي الأكثر موثوقية في تنفيذ أعقد المعابر الجيولوجية تحت الطرق السريعة وخطوط السكك الحديدية وشبكات أرامكو.»
              </p>
            </div>
          </div>

          <div class="leader-card">
            <img src="${leaderMouayed}" alt="Mouayed" class="leader-img">
            <div>
              <div style="font-size: 11pt; font-weight: 800; color: #0f382a;">مؤيد حاج مسعود</div>
              <div style="font-size: 8pt; color: #937338; font-weight: 700;">المؤسس المشارك والمدير الشريك (Managing Partner) • 20+ سنة خبرة</div>
              <p style="font-size: 7.8pt; color: #475569; margin-top: 4px; line-height: 1.4;">
                «نلتزم بتوفير أحدث التقنيات التكنولوجية وأقوى الأساطيل الميدانية لدعم مستهدفات رؤية المملكة 2030، مع تطبيق رقابة صارمة على الجودة والسلامة المهنية لتحقيق نتائج تفوق تطلعات شركائنا.»
              </p>
            </div>
          </div>
        </div>

        <!-- Table of Contents -->
        <div class="card-emerald" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 10.5pt; font-weight: 800; color: #0f382a; border-bottom: 2px solid #c5a869; padding-bottom: 4px; margin-bottom: 10px;">
              فهرس محتويات الملف (Table of Contents)
            </div>
            <ul style="list-style: none; font-size: 8.5pt; color: #334155;">
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>01. الهوية المؤسسية والرؤية والرسالة والقيم</span> <strong style="color: #0f382a;">ص 3</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>02. القدرات الهندسية والتقنيات التخصصية (HDD & MT)</span> <strong style="color: #0f382a;">ص 4</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>03. الأنشطة المعتمدة والخدمات التخصصية (8 مجالات)</span> <strong style="color: #0f382a;">ص 5</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>04. أسطول المعدات والآلات التخصصية الثقيلة</span> <strong style="color: #0f382a;">ص 6</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>05. سجل المشاريع الكبرى المنجزة (Portfolio)</span> <strong style="color: #0f382a;">ص 7-8</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #cbd5e1;">
                <span>06. الجودة والسلامة والبيئة وشهادات ISO المعتمدة</span> <strong style="color: #0f382a;">ص 9</strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: 4px 0;">
                <span>07. العملاء والشركاء وبيانات الاتصال المؤسسية</span> <strong style="color: #0f382a;">ص 10</strong>
              </li>
            </ul>
          </div>

          <div style="background: #ffffff; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 7.5pt; text-align: center;">
            <strong style="color: #0f382a;">شعارنا الهندسي:</strong> «دقة التنفيذ • موثوقية الأداء • صفر حوادث»
          </div>
        </div>
      </div>

      <!-- Key Strengths Grid -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: auto;">
        <div class="card" style="text-align: center;">
          <div style="font-size: 14pt; color: #0f382a; font-weight: 800;">100%</div>
          <div style="font-size: 8pt; font-weight: 700; color: #334155;">جاهزية للمشاريع العملاقة</div>
          <div style="font-size: 7pt; color: #64748b;">تغطية شاملة لجميع مناطق المملكة</div>
        </div>
        <div class="card" style="text-align: center;">
          <div style="font-size: 14pt; color: #0f382a; font-weight: 800;">18+ سنة</div>
          <div style="font-size: 8pt; font-weight: 700; color: #334155;">خبرة تخصصية متراكمة</div>
          <div style="font-size: 7pt; color: #64748b;">كوادر هندسية وفنية معتمدة</div>
        </div>
        <div class="card" style="text-align: center;">
          <div style="font-size: 14pt; color: #0f382a; font-weight: 800;">ISO Certified</div>
          <div style="font-size: 8pt; font-weight: 700; color: #334155;">معايير جودة وبيئة وسلامة</div>
          <div style="font-size: 7pt; color: #64748b;">ISO 9001 • 14001 • 45001</div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 2</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 3: CORPORATE IDENTITY & VALUES ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>الهوية الاستراتيجية</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">WHO WE ARE</div>
        <h2 class="sec-heading">الهوية المؤسسية، الرؤية، والرسالة</h2>
      </div>

      <div class="card-emerald" style="margin-bottom: 12px;">
        <h3 style="font-size: 10.5pt; font-weight: 800; color: #0f382a; margin-bottom: 6px;">نبذة تعريفية عن الشركة (Company Background)</h3>
        <p style="font-size: 8.5pt; color: #334155; line-height: 1.6; text-align: justify;">
          تأسست <strong>شركة العاج الفضي للتجارة والمقاولات (AACC HDD-MT)</strong> في المملكة العربية السعودية ككيان وطني رائد ومتخصص في تنفيذ أعمال البنية التحتية غير المكشوفة (Trenchless Technologies)، وعلى رأسها تقنيات الحفر الأفقي الموجه (HDD) وحفر الأنفاق الدقيقة (Microtunneling). نمتلك أسطولاً متطوراً من منصات الحفر الهيدروليكية الثقيلة، ونسخّر أحدث أنظمة التوجيه الكهرومغناطيسية والرقمية لتنفيذ أصعب وأدق مسارات خطوط المرافق (النفط، الغاز، الكهرباء، المياه، والصرف الصحي) دون الإضرار بالبيئة أو تعطيل البنية التحتية السطحية.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <div class="card" style="border-top: 3px solid #0f382a;">
          <div style="font-size: 10pt; font-weight: 800; color: #0f382a; margin-bottom: 6px;">🎯 رؤيتنا (Our Vision)</div>
          <p style="font-size: 8.2pt; color: #475569; line-height: 1.5; text-align: justify;">
            «أن نكون المقاول الأكثر موثوقية وتميزاً في قطاع الحفر غير المكشوف وحفر الأنفاق الدقيقة في المملكة العربية السعودية ومنطقة الخليج، ومحركاً هندسياً رئيسياً يسهم في بناء البنية التحتية لمدن المستقبل تحقيقاً لمستهدفات رؤية السعودية 2030.»
          </p>
        </div>

        <div class="card" style="border-top: 3px solid #c5a869;">
          <div style="font-size: 10pt; font-weight: 800; color: #937338; margin-bottom: 6px;">🚀 رسالتنا (Our Mission)</div>
          <p style="font-size: 8.2pt; color: #475569; line-height: 1.5; text-align: justify;">
            «تقديم حلول هندسية متكاملة ومبتكرة في تنفيذ المعابر التحت أرضية بأعلى معايير الدقة والأمان، والالتزام الصارم بالجدول الزمني، مع تطبيق أفضل الممارسات البيئية والهندسية العالمية التي تحقق رضا شركائنا وقيمة مضافة لمشاريع الوطن.»
          </p>
        </div>
      </div>

      <div class="sec-title-wrap" style="margin-top: 4px; margin-bottom: 8px;">
        <div class="sec-sub">CORE VALUES</div>
        <h3 style="font-size: 12pt; font-weight: 800; color: #0f382a;">قيمنا الجوهرية الأربعة</h3>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
        <div class="card" style="text-align: center; border-bottom: 3px solid #0f382a;">
          <div style="font-size: 11pt; font-weight: 800; color: #0f382a; margin-bottom: 4px;">1. السلامة أولاً</div>
          <p style="font-size: 7.2pt; color: #64748b;">تطبيق صارم لصفر حوادث (Zero Harm) كأولوية قصوى لا مساومة عليها.</p>
        </div>
        <div class="card" style="text-align: center; border-bottom: 3px solid #c5a869;">
          <div style="font-size: 11pt; font-weight: 800; color: #937338; margin-bottom: 4px;">2. الدقة الهندسية</div>
          <p style="font-size: 7.2pt; color: #64748b;">التزام بالميكرومتر في مسار وسحب خطوط الأنابيب وفق التصاميم المعتمدة.</p>
        </div>
        <div class="card" style="text-align: center; border-bottom: 3px solid #0f382a;">
          <div style="font-size: 11pt; font-weight: 800; color: #0f382a; margin-bottom: 4px;">3. الالتزام الصارم</div>
          <p style="font-size: 7.2pt; color: #64748b;">تسليم الأعمال قبل المواعيد المحددة مع استيفاء كافة شهادات الفحص والاختبار.</p>
        </div>
        <div class="card" style="text-align: center; border-bottom: 3px solid #c5a869;">
          <div style="font-size: 11pt; font-weight: 800; color: #937338; margin-bottom: 4px;">4. الاستدامة</div>
          <p style="font-size: 7.2pt; color: #64748b;">الحفاظ على البيئة الطبيعية والمباني السطحية ومنع الانبعاثات والتشوهات البصرية.</p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 3</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 4: SPECIALIZED TECHNOLOGIES ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>القدرات والتقنيات التخصصية</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">ENGINEERING EXCELLENCE</div>
        <h2 class="sec-heading">التقنيات التخصصية والقدرات الهندسية (HDD & MT)</h2>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 12px;">
        <!-- HDD Technology -->
        <div class="card" style="border-top: 3.5px solid #0f382a;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="font-size: 11.5pt; font-weight: 800; color: #0f382a;">الحفر الأفقي الموجه (HDD)</div>
            <span style="font-size: 7.5pt; background: #e2f1ea; color: #0f382a; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Horizontal Directional Drilling</span>
          </div>
          <p style="font-size: 8pt; color: #475569; line-height: 1.5; text-align: justify; margin-bottom: 8px;">
            تقنية متطورة لتمديد خطوط الأنابيب والكابلات تحت الأرض بمسار منحنٍ موجه دون الحاجة إلى الحفر المكشوف. نتميز بقدرات فائقة على الحفر في مختلف التكوينات الجيولوجية حتى الصخور البازلتية القاسية.
          </p>
          <ul style="font-size: 7.8pt; color: #334155; line-height: 1.6; padding-inline-start: 16px;">
            <li><strong>قوة السحب القصوى:</strong> تصل إلى 100,000 رطل (Vermeer D100x120).</li>
            <li><strong>أقطار الأنابيب:</strong> من 50 ملم حتى 1,500 ملم (60 بوصة).</li>
            <li><strong>مسافات المعابر:</strong> دفع متواصل يتجاوز 1,200 متر طولي للطلقة الواحدة.</li>
            <li><strong>أنظمة التوجيه:</strong> أجهزة DCI Falcon F5 الرقمية فائقة الحساسية للعمق والميل.</li>
            <li><strong>المعابر المنفذة:</strong> تحت الطرق السريعة الحرة، السكك الحديدية، والمجاري المائية.</li>
          </ul>
        </div>

        <!-- Microtunneling Technology -->
        <div class="card" style="border-top: 3.5px solid #c5a869;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="font-size: 11.5pt; font-weight: 800; color: #937338;">حفر الأنفاق الدقيقة (Microtunneling)</div>
            <span style="font-size: 7.5pt; background: #fdf8ed; color: #937338; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Pipe Jacking & AVN</span>
          </div>
          <p style="font-size: 8pt; color: #475569; line-height: 1.5; text-align: justify; margin-bottom: 8px;">
            حل هندسي معقد لتنفيذ خطوط الأنابيب الانحدارية (Gravity Pipelines) التي تتطلب دقة ميول متناهية بالميليمتر، يتم التحكم بها عن بُعد من كابينة القيادة عبر أنظمة ليزر متطورة.
          </p>
          <ul style="font-size: 7.8pt; color: #334155; line-height: 1.6; padding-inline-start: 16px;">
            <li><strong>رؤوس الحفر:</strong> مزودة بقواطع صخرية ومطاحن مخروطية (Rock Cutters / Crushers).</li>
            <li><strong>دقة التوجيه:</strong> نظام توجيه ليزري مستمر يضمن الميل المحدد للصرف والمياه.</li>
            <li><strong>مقاومة المياه الجوفية:</strong> درع حفر محكم يمنع تسرب المياه أثناء الدفع.</li>
            <li><strong>المواد المدفوعة:</strong> أنابيب خرسانية مسلحة (RCP)، ألياف زجاجية (GRP)، وفولاذ (Steel).</li>
            <li><strong>عمق الحفر:</strong> تنفيذ آبار انطلاق واستقبال تصل لأعماق تتجاوز 18 متراً.</li>
          </ul>
        </div>
      </div>

      <!-- Technical Capabilities Comparison Banner -->
      <div class="card-emerald" style="display: flex; gap: 14px; align-items: center;">
        <img src="${equipFalcon}" alt="Falcon" style="width: 110px; height: 75px; object-fit: cover; border-radius: 6px; border: 1px solid #c5a869;">
        <div style="flex: 1;">
          <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a; margin-bottom: 3px;">أنظمة التتبع والتوجيه الكهرومغناطيسي عالي التردد (DCI Falcon F5)</div>
          <p style="font-size: 7.6pt; color: #475569; line-height: 1.4;">
            نعتمد في جميع عملياتنا على أحدث إصدارات مجسات التتبع الرقمية من شركة Digital Control Inc الأمريكية، القادرة على اختراق التشويش الكهرومغناطيسي العالي تحت خطوط الجهد الفائق والمصانع لضمان بقاء رأس الحفر في المسار التصميمي المعتمد بنسبة خطأ صفرية.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 4</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 5: APPROVED SERVICES & DISCIPLINES ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>الأنشطة والخدمات المعتمدة</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">CORE CAPABILITIES</div>
        <h2 class="sec-heading">الأنشطة والخدمات المعتمدة (8 مجالات تخصصية)</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">1</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">الحفر الأفقي الموجه بالصخور (HDD Boring)</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تنفيذ معابر الحفر الموجه في الطبقات الصخرية البازلتية والحجر الجيري حتى قطر 1500 ملم بأحدث رؤوس التفتيت الماسية والأسطوانية.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">2</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">الأنفاق الدقيقة ودفع الأنابيب (Microtunneling)</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تنفيذ الأنفاق العميقة وخطوط الانحدار بالتحكم الليزري عن بُعد ودفع أنابيب الخرسانة والـ GRP تحت مرافق المدن والبنية التحتية.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">3</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">شبكات خطوط نقل المياه الاستراتيجية</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تمديد خطوط مياه الشرب والري المعالجة من أنابيب الكربون ستيل والـ HDPE والحديد الدكتايل بأعلى اختبارات ضغط هيدروستاتيكي.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">4</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">شبكات الصرف الصحي وتصريف السيول والأمطار</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تنفيذ خطوط الصرف الرئيسية ومصائد مياه الأمطار بأعماق تصل إلى 15 متراً وبدقة ميول هندسية فائقة لمنع ترسب الرواسب.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">5</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">معابر السكك الحديدية والطرق السريعة</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            حفر وتمرير خطوط الخدمات والمرافق تحت خطوط القطارات (SAR / قطار الحرمين) والطرق السريعة بدون أي إغلاقات مرورية أو هبوط.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">6</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">كابلات الجهد العالي والفائق (132/380 kV)</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تنفيذ معابر وحزم أنابيب حماية الكابلات الكهربائية تحت الأرض لصالح الشركة السعودية للكهرباء ومحطات التوليد والتحويل.
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">7</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">بنية المرافق الذكية والمخططات العمرانية</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            تنفيذ البنية التحتية الشاملة للمخططات السكنية والمدن الجديدة (شبكات ألياف ضوئية، شبكات تصريف، وغرف تفتيش مسبقة الصنع).
          </p>
        </div>

        <div class="card" style="padding: 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span style="background: #0f382a; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 800;">8</span>
            <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">ربط محطات الطاقة الشمسية والمتجددة</div>
          </div>
          <p style="font-size: 7.5pt; color: #64748b; line-height: 1.4;">
            حفر وتمديد كابلات الربط الداخلي والخارجي لحقول الطاقة الشمسية الكهروضوئية ومزارع الرياح مع محطات التحويل الرئيسية.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 5</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 6: HEAVY MACHINERY FLEET ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>الأسطول والمعدات الثقيلة</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">FLEET & MACHINERY</div>
        <h2 class="sec-heading">أسطول الآلات والمعدات التخصصية الثقيلة</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
        <div class="card" style="padding: 8px; text-align: center;">
          <img src="${equipD100}" alt="D100" style="width: 100%; height: 95px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;">
          <div style="font-size: 9pt; font-weight: 800; color: #0f382a;">Vermeer D100x120 II</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">قوة سحب 100,000 رطل</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 3px;">منصة حفر عملاقة مخصصة للمسافات الطويلة والأقطار الكبيرة حتى 60 بوصة في الصخور.</p>
        </div>

        <div class="card" style="padding: 8px; text-align: center;">
          <img src="${equipD36}" alt="D36" style="width: 100%; height: 95px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;">
          <div style="font-size: 9pt; font-weight: 800; color: #0f382a;">Vermeer D36x50 II</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">قوة سحب 36,000 رطل</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 3px;">منصة حفر مرنة ومثالية للمناطق الحضرية والمواقع الضيقة تحت خطوط الكهرباء والمياه.</p>
        </div>

        <div class="card" style="padding: 8px; text-align: center;">
          <img src="${equipMud}" alt="Mud Recycling" style="width: 100%; height: 95px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;">
          <div style="font-size: 9pt; font-weight: 800; color: #0f382a;">Kemtron Mud Recycler</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">إعادة تدوير البنتونيت</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 3px;">محطة متكاملة لخلط وإعادة تدوير سوائل الحفر وفصل الرمال للحفاظ التام على البيئة.</p>
        </div>
      </div>

      <div style="margin-bottom: 6px;">
        <h3 style="font-size: 10pt; font-weight: 800; color: #0f382a; margin-bottom: 6px;">جدول المواصفات الفنية لأسطول الحفر والمعدات المساندة</h3>
        <table class="tech-table">
          <thead>
            <tr>
              <th>المعدة / الطراز</th>
              <th>المصنّع</th>
              <th>القدرة التشغيلية</th>
              <th>الاستخدام الميداني الرئيسي</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vermeer D100x120 Series II</strong></td>
              <td>USA - Vermeer</td>
              <td>100,000 lbs Pullback / 12,000 ft-lb Torque</td>
              <td>معابر الصخور والأقطار الكبرى (DN500-1500)</td>
              <td><span style="color: #0f382a; font-weight: 800;">جاهز للعمل</span></td>
            </tr>
            <tr>
              <td><strong>Vermeer D36x50 Series II</strong></td>
              <td>USA - Vermeer</td>
              <td>36,000 lbs Pullback / 4,995 ft-lb Torque</td>
              <td>معابر المدن والكابلات والمياه (DN100-500)</td>
              <td><span style="color: #0f382a; font-weight: 800;">جاهز للعمل</span></td>
            </tr>
            <tr>
              <td><strong>DCI DigiTrak Falcon F5</strong></td>
              <td>USA - Digital Control</td>
              <td>تتبع رقمي مزدوج التردد حتى عمق 30 م</td>
              <td>التوجيه المغناطيسي وحساب مسار رأس الحفر</td>
              <td><span style="color: #0f382a; font-weight: 800;">جاهز للعمل</span></td>
            </tr>
            <tr>
              <td><strong>Mud Recycling Unit 500 GPM</strong></td>
              <td>Kemtron / Ditch Witch</td>
              <td>سعة تدوير 500 جالون/دقيقة شيكرات هيدروليكية</td>
              <td>تنقية سائل الحفر وإعادة استخدامه بيئياً</td>
              <td><span style="color: #0f382a; font-weight: 800;">جاهز للعمل</span></td>
            </tr>
            <tr>
              <td><strong>ماكينات لحام الأنابيب HDPE</strong></td>
              <td>Ritmo / McElroy</td>
              <td>لحام حراري حتى قطر 1200 ملم (Butt Fusion)</td>
              <td>دمج أنابيب نقل المياه والغاز عالية الضغط</td>
              <td><span style="color: #0f382a; font-weight: 800;">جاهز للعمل</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 6</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 7: MAJOR PROJECTS PART 1 ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>سجل المشاريع المنجزة (1)</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">PROVEN TRACK RECORD</div>
        <h2 class="sec-heading">سجل المشاريع الكبرى المنفذة بالمملكة (1)</h2>
      </div>

      <div class="project-grid">
        <!-- Project 1 -->
        <div class="project-card">
          <img src="${projAmaala}" alt="Amaala" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع نفق مياه أمالا البحر الأحمر</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">المقاول الرئيسي: شركة بنية (Binyah) • منطقة تبوك</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تنفيذ معبر حفر أفقي موجه تحت تكوينات صخرية بازلتية شاطئية لنقل خطوط المياه الرئيسية المغذية لمنتجعات أمالا الفاخرة بطول 350 متراً وقطر 630 ملم.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 350 م</span>
              <span><strong>القطر:</strong> DN630 HDPE</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <img src="${projRail}" alt="Rail" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع معبر خط سكة حديد الدمام</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">الجهة المالكة: الخطوط الحديدية السعودية (SAR) • الدمام</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                حفر وتمرير خط أنابيب حماية من الصلب تحت مسار القطار النشط دون التأثير على حركة الرحلات ووفق اشتراطات السلامة الفائقة لـ SAR.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 180 م</span>
              <span><strong>القطر:</strong> DN800 Steel</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="project-card">
          <img src="${projKaec}" alt="KAEC" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع مرافق مدينة الملك عبدالله الاقتصادية</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">مدينة الملك عبدالله الاقتصادية (KAEC) • رابغ</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تنفيذ شبكة معابر حفر موجه لخطوط التبريد المركزي والمياه والكهرباء تحت الشرايين الحيوية للوادي الصناعي في KAEC.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 520 م</span>
              <span><strong>القطر:</strong> DN500 HDPE</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 4 -->
        <div class="project-card">
          <img src="${projJanahin}" alt="SEC Project" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">كابلات الجهد الفائق 132/380 ك.ف (SEC)</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">الشركة السعودية للكهرباء • المنطقة الشرقية</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تمديد حزم أنابيب تمرير كابلات نقل الطاقة الكهربائية الرئيسية تحت الطرق السريعة المزدحمة بنجاح تام وفق مواصفات SEC القياسية.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 420 م</span>
              <span><strong>القطر:</strong> 6x DN250</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 7</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 8: MAJOR PROJECTS PART 2 ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>سجل المشاريع المنجزة (2)</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">FLAGSHIP ACHIEVEMENTS</div>
        <h2 class="sec-heading">سجل المشاريع الكبرى المنفذة بالمملكة (2)</h2>
      </div>

      <div class="project-grid">
        <!-- Project 5 -->
        <div class="project-card">
          <img src="${projNarjis}" alt="Narjis" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع شبكات المياه بحي النرجس</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">شركة المياه الوطنية (NWC) • شمال الرياض</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تنفيذ معابر الحفر الموجه لشبكات المياه الاستراتيجية تحت تقاطعات الطرق الرئيسية بالرياض دون إيقاف الحركة المرورية.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 290 م</span>
              <span><strong>القطر:</strong> DN400 HDPE</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 6 -->
        <div class="project-card">
          <img src="${projWadi}" alt="Wadi Summan" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع خطوط وادي السمان والنفط والغاز</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">معايير أرامكو السعودية • المنطقة الشرقية</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                حفر صخري دقيق وتمديد أنابيب نقل الغاز والنفط تحت المناطق الجغرافية والوديان الوعرة وفق أعلى درجات السلامة العالمية.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 610 م</span>
              <span><strong>القطر:</strong> DN500 Steel</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 7 -->
        <div class="project-card">
          <img src="${projGulf}" alt="Gulf Street" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع معبر شارع الخليج ومترو الرياض</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">أمانة منطقة الرياض • العاصمة الرياض</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تنفيذ معابر بنية تحتية حرجة تحت مسار قطار الرياض والشوارع الرئيسية بأحدث أنظمة الرصد الجيوتقني لضمان سلامة المنشآت.
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 340 م</span>
              <span><strong>القطر:</strong> DN600 RCP</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>

        <!-- Project 8 -->
        <div class="project-card">
          <img src="${projField}" alt="Haradh Field" class="project-img">
          <div class="project-body">
            <div>
              <div style="font-size: 10pt; font-weight: 800; color: #0f382a;">مشروع حقل حرض ومعابر الطاقة</div>
              <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">أعمال صناعية وبترولية • حرض</div>
              <p style="font-size: 7.5pt; color: #64748b; margin-top: 4px; line-height: 1.4;">
                تنفيذ أعمال الحفر الأفقي في البيئات الصحراوية المعقدة ودرجات الحرارة القصوى مع تطبيق نظام تصاريح العمل المعتمد (PTW).
              </p>
            </div>
            <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 7pt; display: flex; justify-content: space-between; margin-top: 6px;">
              <span><strong>الطول:</strong> 480 م</span>
              <span><strong>القطر:</strong> DN450 Steel</span>
              <span><strong>الإنجاز:</strong> 100% معتمد</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 8</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 9: QUALITY, SAFETY & ISO ==================== -->
  <div class="page">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>الجودة والسلامة والبيئة</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">STANDARDS & CERTIFICATIONS</div>
        <h2 class="sec-heading">الجودة الشاملة والسلامة والصحة المهنية (QHSE)</h2>
      </div>

      <div class="card-emerald" style="margin-bottom: 12px;">
        <h3 style="font-size: 10pt; font-weight: 800; color: #0f382a; margin-bottom: 4px;">التزامنا الراسخ بـ (صفر حوادث - 100% Zero LTI Record)</h3>
        <p style="font-size: 8pt; color: #334155; line-height: 1.5; text-align: justify;">
          تعتبر شركة العاج الفضي أن سلامة العنصر البشري وحماية البيئة الطبيعية هما المعيار الأول للنجاح الهندسي. نلتزم بتطبيق إجراءات السلامة المتبعة لدى أرامكو السعودية والشركة السعودية للكهرباء، مع عقد ورشات عمل يومية (Toolbox Talks) وتدريب مستمر لجميع فرق العمل الميدانية.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
        <div class="card" style="text-align: center; border-top: 3px solid #0f382a;">
          <img src="${certIso9001}" alt="ISO 9001" style="height: 60px; object-fit: contain; margin-bottom: 6px;">
          <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">ISO 9001:2015</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">نظام إدارة الجودة</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 4px;">ضمان رقابة صارمة على مطابقة المواد والاختبارات الهندسية من البداية وحتى التسليم النهائي.</p>
        </div>

        <div class="card" style="text-align: center; border-top: 3px solid #0f382a;">
          <img src="${certIso14001}" alt="ISO 14001" style="height: 60px; object-fit: contain; margin-bottom: 6px;">
          <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">ISO 14001:2015</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">نظام الإدارة البيئية</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 4px;">إعادة تدوير سوائل الحفر والتخلص الآمن من المخلفات مع الحفاظ على التوازن البيئي والمياه الجوفية.</p>
        </div>

        <div class="card" style="text-align: center; border-top: 3px solid #0f382a;">
          <img src="${certIso45001}" alt="ISO 45001" style="height: 60px; object-fit: contain; margin-bottom: 6px;">
          <div style="font-size: 9.5pt; font-weight: 800; color: #0f382a;">ISO 45001:2018</div>
          <div style="font-size: 7.5pt; color: #937338; font-weight: 700;">السلامة والصحة المهنية</div>
          <p style="font-size: 6.8pt; color: #64748b; margin-top: 4px;">تأمين بيئة عمل خالية تماماً من المخاطر وامتثال كامل لمتطلبات وزارة الموارد البشرية والدفاع المدني.</p>
        </div>
      </div>

      <div class="card" style="background: #f8fafc;">
        <h4 style="font-size: 9pt; font-weight: 800; color: #0f382a; margin-bottom: 6px;">الاعتمادات والتأهيلات الحكومية والصناعية الرسمية</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 7.5pt; color: #334155;">
          <div>✔ <strong>تأهيل أرامكو السعودية:</strong> نظام تصاريح العمل (Aramco PTW System).</div>
          <div>✔ <strong>اعتماد الشركة السعودية للكهرباء (SEC):</strong> معابر الكابلات والمحطات.</div>
          <div>✔ <strong>اعتماد شركة المياه الوطنية (NWC):</strong> خطوط النقل والتوزيع.</div>
          <div>✔ <strong>تصنيف المقاولين:</strong> مسجلون ومصنفون رسمياً بوزارة الشؤون البلدية والقروية.</div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 9</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

  <!-- ==================== PAGE 10: APPROVED CLIENTS & CONTACT BACK COVER ==================== -->
  <div class="page" style="background: #fcfbf9;">
    <div class="page-header">
      <img src="${logoMain}" alt="AACC" class="header-logo">
      <div class="header-tagline">الملف التعريفي للشركة • <span>العملاء وبيانات التواصل</span></div>
    </div>
    <div class="page-content">
      <div class="sec-title-wrap">
        <div class="sec-sub">PARTNERS IN SUCCESS</div>
        <h2 class="sec-heading">عملاؤنا وشركاء النجاح</h2>
      </div>

      <div class="clients-grid" style="margin-bottom: 14px;">
        <div class="client-box">
          <img src="${clientAramco}" alt="Saudi Aramco">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">أرامكو السعودية</span>
        </div>
        <div class="client-box">
          <img src="${clientSec}" alt="SEC">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">السعودية للكهرباء</span>
        </div>
        <div class="client-box">
          <img src="${clientNwc}" alt="NWC">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">المياه الوطنية</span>
        </div>
        <div class="client-box">
          <img src="${clientBinyah}" alt="Binyah">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">شركة بنية</span>
        </div>
        <div class="client-box">
          <img src="${clientKaec}" alt="KAEC">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">مدينة الملك عبدالله</span>
        </div>
        <div class="client-box">
          <img src="${clientRedSea}" alt="Red Sea">
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 4px;">البحر الأحمر وأمالا</span>
        </div>
        <div class="client-box">
          <div style="font-size: 11pt; font-weight: 900; color: #0f382a;">SAR</div>
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 2px;">الخطوط الحديدية</span>
        </div>
        <div class="client-box">
          <div style="font-size: 10pt; font-weight: 900; color: #0f382a;">أمانة الرياض</div>
          <span style="font-size: 7pt; font-weight: 700; color: #475569; margin-top: 2px;">البلديات والإسكان</span>
        </div>
      </div>

      <!-- Official Contact Box -->
      <div style="background: radial-gradient(circle at 100% 0%, #164e3b 0%, #0a251c 100%); color: #ffffff; border-radius: 12px; padding: 18px; margin-top: auto; border: 1.5px solid #c5a869;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 10px;">
          <div>
            <div style="font-size: 13pt; font-weight: 900; color: #dfc68b;">شركة العاج الفضي للتجارة والمقاولات</div>
            <div style="font-size: 8.5pt; color: #cbd5e1;">Alaaj Alfedhi Contracting Company (AACC HDD-MT)</div>
          </div>
          <div style="text-align: left; font-size: 8pt; color: #e5cf96;">
            <strong>السجل التجاري:</strong> 1010952055<br>
            <strong>الرقم الضريبي:</strong> 312154889200003
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 8pt;">
          <div>
            <div style="color: #c5a869; font-weight: 800; margin-bottom: 2px;">📍 العنوان والمقر الرئيسي:</div>
            <div style="color: #e2e8f0;">المملكة العربية السعودية، الرياض، حي الأندلس، شارع حفصة بنت عمر، مبنى رقم 3315</div>
          </div>
          <div>
            <div style="color: #c5a869; font-weight: 800; margin-bottom: 2px;">📞 الاتصال المباشر والواتساب:</div>
            <div style="color: #e2e8f0;" dir="ltr">+966 50 942 4820 | +966 13 800 0000</div>
          </div>
          <div>
            <div style="color: #c5a869; font-weight: 800; margin-bottom: 2px;">✉️ البريد الإلكتروني الرسمي (الطلبات والمناقصات والإدارة):</div>
            <div style="color: #e2e8f0;">info@alaajsa.com | mohdd@alaajsa.com | Moayad@alaajsa.com</div>
          </div>
          <div>
            <div style="color: #c5a869; font-weight: 800; margin-bottom: 2px;">🌐 البوابة الإلكترونية الرسمية:</div>
            <div style="color: #e2e8f0;">https://www.alaajsa.com</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 7.5pt; color: #94a3b8;">
          جميع الحقوق محفوظة © 2026 شركة العاج الفضي للمقاولات | تم إعداد هذا الملف وفق أحدث المواصفات الهندسية الرسمية.
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>شركة العاج الفضي للتجارة والمقاولات (AACC)</span>
      <span>صفحة 10</span>
      <span>www.alaajsa.com</span>
    </div>
  </div>

</body>
</html>
`;

  // Write HTML to temporary file
  const htmlPath = path.join(__dirname, '..', 'public', 'company-profile.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('1. Generated HTML company profile at:', htmlPath);

  // Launch Chrome headless with puppeteer-core
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('2. Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 60000 });

  const outputPdfPath = path.join(__dirname, '..', 'public', 'AACC_Company_Profile_2026.pdf');
  const rootPdfPath = path.join(__dirname, '..', 'AACC_Company_Profile_2026.pdf');

  console.log('3. Printing to PDF...');
  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  // Also copy to root directory for easy access
  fs.copyFileSync(outputPdfPath, rootPdfPath);

  await browser.close();

  const stats = fs.statSync(outputPdfPath);
  console.log(`4. ✅ SUCCESS! PDF successfully created: ${outputPdfPath}`);
  console.log(`   - File size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`   - Root copy: ${rootPdfPath}`);
}

generateProfilePdf().catch(console.error);
