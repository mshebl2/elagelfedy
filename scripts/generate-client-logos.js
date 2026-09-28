const fs = require('fs');
const path = require('path');

const clientsDir = path.join(process.cwd(), 'public/images/clients');
if (!fs.existsSync(clientsDir)) {
  fs.mkdirSync(clientsDir, { recursive: true });
}

const logos = [
  {
    filename: 'logo_aramco.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Aramco Energy Sunburst Icon -->
    <circle cx="28" cy="28" r="24" fill="#0033A0" opacity="0.08"/>
    <g transform="translate(28,28)">
      <circle cx="0" cy="0" r="7" fill="#00A3E0"/>
      <!-- Blue petals -->
      <path d="M0 -22 L4 -10 L-4 -10 Z" fill="#0033A0"/>
      <path d="M15.5 -15.5 L10 -4 L4 -10 Z" fill="#0033A0"/>
      <path d="M22 0 L10 4 L10 -4 Z" fill="#0033A0"/>
      <path d="M15.5 15.5 L4 10 L10 4 Z" fill="#0033A0"/>
      <!-- Green energy petals -->
      <path d="M0 22 L-4 10 L4 10 Z" fill="#78BE20"/>
      <path d="M-15.5 15.5 L-10 4 L-4 10 Z" fill="#78BE20"/>
      <path d="M-22 0 L-10 -4 L-10 4 Z" fill="#78BE20"/>
      <path d="M-15.5 -15.5 L-4 -10 L-10 -4 Z" fill="#78BE20"/>
    </g>
    <!-- Brand Typography -->
    <text x="68" y="24" font-family="'Space Grotesk', 'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" fill="#0033A0" letter-spacing="0.5">saudi aramco</text>
    <text x="68" y="44" font-family="'Plus Jakarta Sans', 'Segoe UI', Tahoma, sans-serif" font-size="13" font-weight="700" fill="#78BE20">أرامكو السعودية</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_sec.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- SEC Electric Waves / Power Ribbon -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#004B87" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M-14 -12 C-6 -18 6 -18 14 -12 C18 -8 18 -2 12 2 L-10 16 C-16 20 -20 14 -14 8 Z" fill="#004B87"/>
      <path d="M14 12 C6 18 -6 18 -14 12 C-18 8 -18 2 -12 -2 L10 -16 C16 -20 20 -14 14 -8 Z" fill="#EAAA00"/>
      <polygon points="2,-6 -4,4 4,4 -2,14" fill="#FFFFFF" stroke="#004B87" stroke-width="1.5"/>
    </g>
    <text x="62" y="22" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="800" fill="#004B87" letter-spacing="1">SEC • كهرباء</text>
    <text x="62" y="42" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#64748B">الشركة السعودية للكهرباء</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_nwc.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- NWC Water Drop / Waves -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#0077C8" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M0 -18 C-8 -6 -14 4 -14 10 C-14 18 -6 22 0 22 C6 22 14 18 14 10 C14 4 8 -6 0 -18 Z" fill="#0077C8"/>
      <path d="M-2 -8 C-6 0 -10 6 -10 11 C-10 16 -4 19 0 19 C4 19 10 16 10 11 C10 6 6 0 2 -8 Z" fill="#00A3E0"/>
      <circle cx="-3" cy="6" r="3" fill="#FFFFFF" opacity="0.8"/>
    </g>
    <text x="62" y="22" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="800" fill="#0077C8" letter-spacing="1">NWC WATER</text>
    <text x="62" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#0284C7">شركة المياه الوطنية</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_binyah.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Binyah Hexagonal Civil Infrastructure Monogram -->
    <polygon points="26,6 48,18 48,42 26,54 4,42 4,18" fill="#1E293B" opacity="0.08"/>
    <g transform="translate(26, 30)">
      <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" stroke="#0F382A" stroke-width="3" fill="none"/>
      <path d="M0 -16 L0 16 M-14 -8 L14 8 M-14 8 L14 -8" stroke="#937338" stroke-width="2"/>
    </g>
    <text x="60" y="23" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="800" fill="#0F382A" letter-spacing="1.5">BINYAH</text>
    <text x="60" y="43" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#937338">شركة بنية للمقاولات</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_neom.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- NEOM Emblem & Minimalist Typography -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#937338" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <circle cx="0" cy="0" r="14" stroke="#937338" stroke-width="2.5" fill="none"/>
      <circle cx="0" cy="0" r="7" fill="#0F382A"/>
      <path d="M0 -18 L0 -14 M0 14 L0 18 M-18 0 L-14 0 M14 0 L18 0" stroke="#937338" stroke-width="2.5"/>
    </g>
    <text x="60" y="24" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="900" fill="#0F172A" letter-spacing="3">N E O M</text>
    <text x="60" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#937338">نيوم • أمالا البحر الأحمر</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_redsea.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Red Sea Global / Amaala Coral Emblem -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#C25953" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <circle cx="0" cy="0" r="14" stroke="#C25953" stroke-width="2.5" fill="none" stroke-dasharray="4 2"/>
      <circle cx="0" cy="0" r="8" fill="#C25953"/>
      <path d="M-6 -6 Q0 0 6 6 M-6 6 Q0 0 6 -6" stroke="#FFFFFF" stroke-width="2"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#C25953" letter-spacing="1">RED SEA GLOBAL</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#1E293B">البحر الأحمر الدولية • AMAALA</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_saudconsult.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Saudconsult Arch / Engineering Compass -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#003B71" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M-14 14 C-14 -4 14 -4 14 14" stroke="#003B71" stroke-width="3.5" fill="none"/>
      <path d="M-8 14 C-8 4 8 4 8 14" stroke="#D99B26" stroke-width="2.5" fill="none"/>
      <circle cx="0" cy="-6" r="3" fill="#003B71"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="800" fill="#003B71" letter-spacing="0.5">SAUDCONSULT</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#D99B26">سعود كونسلت للاستشارات</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_kaec.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- KAEC Gateway Crown & Waves -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#0A3B5C" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M-14 6 L-8 -12 L0 -4 L8 -12 L14 6 Z" fill="#0A3B5C"/>
      <path d="M-14 10 C-6 6 6 6 14 10" stroke="#C5A869" stroke-width="2.5" fill="none"/>
      <path d="M-14 14 C-6 10 6 10 14 14" stroke="#0A3B5C" stroke-width="2" fill="none"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="900" fill="#0A3B5C" letter-spacing="1">KAEC</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#C5A869">مدينة الملك عبدالله الاقتصادية</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_mashariq.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Al-Mashariq Sunrise Rays & High Voltage Towers -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#155724" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M-14 10 L0 -14 L14 10 Z" stroke="#155724" stroke-width="2.5" fill="none"/>
      <line x1="-8" y1="2" x2="8" y2="2" stroke="#C5A869" stroke-width="2"/>
      <circle cx="0" cy="-2" r="3" fill="#C5A869"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#155724" letter-spacing="0.8">AL-MASHARIQ</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#C5A869">شركة المشارق للمقاولات</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_ncc.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- National Contracting Company (NCC) -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#C84B00" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <polygon points="0,-16 14,-6 14,10 0,16 -14,10 -14,-6" fill="#002D62"/>
      <text x="0" y="5" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">NCC</text>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="800" fill="#002D62" letter-spacing="1">NCC POWER</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#C84B00">شركة المقاولات الوطنية</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_sharhan.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Al-Sharhan Contracting Monogram -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#0D5C3A" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <circle cx="0" cy="0" r="14" stroke="#0D5C3A" stroke-width="2.5" fill="none"/>
      <path d="M-8 8 L0 -8 L8 8 Z" fill="#B38E36"/>
      <circle cx="0" cy="2" r="2.5" fill="#FFFFFF"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#0D5C3A" letter-spacing="0.5">AL-SHARHAN</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#B38E36">شركة الشرهان للمقاولات</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_janahin.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- Al-Janahin Winged Structure -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#1E3A8A" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <path d="M-14 -4 C-6 -14 0 -4 0 10 C0 -4 6 -14 14 -4 C6 4 0 14 0 14 C0 14 -6 4 -14 -4 Z" fill="#1E3A8A"/>
      <circle cx="0" cy="-6" r="3" fill="#D97706"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#1E3A8A" letter-spacing="0.5">AL-JANAHIN</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#D97706">شركة الجناحين للتجارة والمقاولات</text>
  </g>
</svg>`
  },
  {
    filename: 'logo_anabeeb.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
  <g transform="translate(10, 12)">
    <!-- ANABEEB Heavy Industrial Pipeline -->
    <rect x="2" y="4" width="48" height="48" rx="10" fill="#DC2626" opacity="0.08"/>
    <g transform="translate(26, 28)">
      <circle cx="-6" cy="0" r="10" stroke="#DC2626" stroke-width="3" fill="none"/>
      <circle cx="6" cy="0" r="10" stroke="#1E293B" stroke-width="3" fill="none"/>
      <rect x="-8" y="-3" width="16" height="6" fill="#937338" rx="2"/>
    </g>
    <text x="60" y="22" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="900" fill="#DC2626" letter-spacing="1">ANABEEB</text>
    <text x="60" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#1E293B">شركة أنابيب للمقاولات</text>
  </g>
</svg>`
  }
];

logos.forEach(({ filename, svg }) => {
  const filePath = path.join(clientsDir, filename);
  fs.writeFileSync(filePath, svg.trim(), 'utf8');
  console.log(`[Created] ${filePath}`);
});

console.log('All 13 Client vector SVG logos created successfully.');
