const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// 1. Copy user uploaded image if available
const uploadedImg = path.join(
  process.env.USERPROFILE || 'C:\\Users\\mohma',
  '.gemini\\antigravity-ide\\brain\\f13208bf-67da-453a-ba9c-0c586c302f24\\.user_uploaded\\media_1790668531094.png'
);

const destImgPath = path.join(__dirname, '..', 'public', 'images', 'equipment', 'digitrak_falcon_f5.png');

if (fs.existsSync(uploadedImg)) {
  fs.copyFileSync(uploadedImg, destImgPath);
  console.log('Successfully copied uploaded image to public/images/equipment/digitrak_falcon_f5.png');
} else {
  console.log('Uploaded image not found at', uploadedImg);
}

// 2. Updated Equipment Item #3 Data
const falconEquipment = {
  nameAr: 'نظام التوجيه اللاسلكي DigiTrak Falcon F5 & Aurora Display',
  nameEn: 'DigiTrak Falcon F5 Guidance System & Aurora Touchscreen',
  categoryAr: 'أنظمة الملاحة والتوجيه تحت السطحي',
  categoryEn: 'Subterranean Navigation & LWD Guidance Systems',
  tagAr: 'تتبع حتى عمق 100+ م ومدى لاسلكي 900+ م',
  tagEn: '100+ m Depth & 900+ m Telemetry Range',
  descriptionAr: 'النظام الأمريكي الرائد عالمياً من شركة Digital Control Inc. (DCI) لتتبع رأس الحفر، يتميز بتقنية الترددات المرنة (Falcon Technology) للتغلب على التداخل الكهرومغناطيسي، مع شاشة Aurora اللمسية بكبينة السائق وتسجيل مسار النفق آلياً (Log-While-Drilling) للمشاريع الكبرى.',
  descriptionEn: 'The world-standard HDD drill-head tracking system by Digital Control Inc. (DCI - USA). Features Falcon wideband frequency scanning to defeat active/passive interference, paired with the Aurora anti-glare color touchscreen display for real-time LWD bore plotting.',
  specsAr: [
    { label: 'اسم النظام والشركة المصنعة', value: 'DigiTrak Falcon F5 — Digital Control Inc. (DCI USA)' },
    { label: 'شاشة العرض عن بُعد', value: 'Aurora Touchscreen Display (شاشة لمس ملونة مضادة للانعكاس)' },
    { label: 'تقنية الترددات (Falcon)', value: 'مسح إلكتروني وتحديد أفضل ترددات تشغيل تلقائياً لتفادي التشويش' },
    { label: 'أقصى عمق للتتبع وقراءة البيانات', value: 'أكثر من 100 متر (328 قدماً) بمسبار Sub-k Rebar Transmitter' },
    { label: 'نطاق بث البيانات اللاسلكية (Telemetry)', value: 'أكثر من 900 متر (3,000 قدم) إلى شاشة Aurora بكبينة السائق' },
    { label: 'دقة رصد الميول (Pitch Resolution)', value: '0.1% Pitch Resolution لتوجيه دقيق وتجنب الانحراف عن المسار' },
    { label: 'تسجيل البيانات (Data Logging)', value: 'نظام LWD الآلي لتسجيل ورسم مخطط النفق للاعتماد والتسليم النهائي' }
  ],
  specsEn: [
    { label: 'System & Manufacturer', value: 'DigiTrak Falcon F5 — Digital Control Inc. (DCI USA)' },
    { label: 'Remote Driller Interface', value: 'Aurora Anti-Glare Color Touchscreen Display' },
    { label: 'Frequency Spectrum (Falcon)', value: 'Wideband auto-scan selecting optimal frequencies against active/passive EMI' },
    { label: 'Max Tracking Depth', value: '100+ meters (328+ ft) via Sub-k Rebar Transmitter' },
    { label: 'Telemetry Wireless Range', value: '900+ meters (3,000+ ft) to rig operator cabin' },
    { label: 'Pitch Precision', value: '0.1% Pitch Resolution for sub-millimeter trajectory control' },
    { label: 'Data Logging (LWD)', value: 'Automated Log-While-Drilling bore profile plotting & Aramco/SEC signoff' }
  ],
  footerNoteAr: 'معتمد لتقديم خرائط النفق النهائية (Log-While-Drilling) لأرامكو السعودية والجهات الحكومية',
  footerNoteEn: 'Approved for official LWD bore logging signoffs with Saudi Aramco & SEC',
  image: '/images/equipment/equipment_03_dci_falcon.jpg',
  plateImage: fs.existsSync(destImgPath) ? '/images/equipment/digitrak_falcon_f5.png' : '/images/equipment/zlconn_metal_plate.jpg',
  featured: true,
  order: 3
};

// 3. Update data/site_store.json
const storePath = path.join(__dirname, '..', 'data', 'site_store.json');
let storeData = {};
if (fs.existsSync(storePath)) {
  storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
}

if (!storeData.equipment) {
  storeData.equipment = [];
}

// Check if item 3 exists or find by order 3 or name match
let updatedInStore = false;
for (let i = 0; i < storeData.equipment.length; i++) {
  if (storeData.equipment[i].order === 3 || storeData.equipment[i].nameAr.includes('DCI') || storeData.equipment[i].nameAr.includes('Falcon')) {
    storeData.equipment[i] = { ...storeData.equipment[i], ...falconEquipment };
    updatedInStore = true;
    console.log('Updated equipment item #3 in site_store.json at index', i);
    break;
  }
}

if (!updatedInStore) {
  storeData.equipment.push(falconEquipment);
  console.log('Pushed equipment item #3 into site_store.json');
}

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('Saved site_store.json successfully.');

// 4. Update MongoDB Atlas
async function updateMongo() {
  const envPath = path.join(__dirname, '..', '.env.local');
  let mongoUri = process.env.MONGODB_URI;
  if (!mongoUri && fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match) mongoUri = match[1].trim();
  }

  if (!mongoUri) {
    console.log('No MONGODB_URI found, skipping MongoDB sync.');
    return;
  }

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('equipment');

    const result = await collection.updateOne(
      { $or: [{ order: 3 }, { nameAr: { $regex: 'Falcon|DCI' } }] },
      { $set: falconEquipment },
      { upsert: true }
    );

    console.log('MongoDB equipment collection updated:', result);
  } catch (err) {
    console.error('MongoDB sync error:', err.message);
  } finally {
    await client.close();
  }
}

updateMongo().then(() => {
  console.log('Script execution complete.');
});
