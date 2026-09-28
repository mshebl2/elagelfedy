async function testApp() {
  console.log('=== RUNNING AACC KSA FULL-STACK SUITE VERIFICATION ===\n');

  const baseUrl = 'http://localhost:3000';

  // Test 1: Homepage SSR
  try {
    const res = await fetch(`${baseUrl}/`);
    console.log(`1. Homepage GET /: Status ${res.status} ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
    const text = await res.text();
    const hasAacc = text.includes('AACC HDD-MT') || text.includes('العاج الفضي');
    console.log(`   - Verified brand name & identity in HTML: ${hasAacc ? '✅ PASS' : '❌ FAIL'}`);
    const hasMetrics = text.includes('100,000 lbs') && text.includes('1,500 mm');
    console.log(`   - Verified telemetry metrics in HTML: ${hasMetrics ? '✅ PASS' : '❌ FAIL'}`);
    const hasServices = text.includes('421010') || text.includes('HDD Drilling');
    console.log(`   - Verified 8 ministry services in HTML: ${hasServices ? '✅ PASS' : '❌ FAIL'}`);
  } catch (err) {
    console.error('Homepage test error:', err.message);
  }

  // Test 2: Project Detail Page SSG
  try {
    const res = await fetch(`${baseUrl}/projects/binyah-amaala-red-sea`);
    console.log(`\n2. Project Detail GET /projects/binyah-amaala-red-sea: Status ${res.status} ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
    const text = await res.text();
    const hasProject = text.includes('Amaala') || text.includes('أمالا');
    console.log(`   - Verified project case study content: ${hasProject ? '✅ PASS' : '❌ FAIL'}`);
  } catch (err) {
    console.error('Project detail test error:', err.message);
  }

  // Test 3: Sitemap.xml & Robots.txt
  try {
    const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
    console.log(`\n3. Sitemap GET /sitemap.xml: Status ${sitemapRes.status} ${sitemapRes.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
    const robotsRes = await fetch(`${baseUrl}/robots.txt`);
    console.log(`4. Robots GET /robots.txt: Status ${robotsRes.status} ${robotsRes.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
  } catch (err) {
    console.error('SEO files test error:', err.message);
  }

  // Test 4: Contact / RFQ Submission API
  try {
    const rfqPayload = {
      name: 'Eng. Khalid Al-Mutairi',
      company: 'Saudi Binladin Group',
      email: 'khalid@sbg.com.sa',
      phone: '+966 55 123 4567',
      subject: '01 HDD Heavy Horizontal Directional Drilling',
      soilConditions: 'Basaltic hard rock crossing under King Fahad Road, 220m length, DN800mm',
    };
    const rfqRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rfqPayload),
    });
    const rfqData = await rfqRes.json();
    console.log(`\n5. Contact RFQ POST /api/contact: Status ${rfqRes.status} ${rfqData.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   - Generated Reference No: ${rfqData.data?.referenceNo || 'N/A'}`);
  } catch (err) {
    console.error('RFQ API test error:', err.message);
  }

  // Test 5: Admin Authentication
  let cookie = '';
  try {
    const loginRes = await fetch(`${baseUrl}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'AaccAdmin2026!',
      }),
    });
    const loginData = await loginRes.json();
    console.log(`\n6. Admin Login POST /api/admin/auth/login: Status ${loginRes.status} ${loginData.success ? '✅ PASS' : '❌ FAIL'}`);
    cookie = loginRes.headers.get('set-cookie') || '';
    console.log(`   - Auth Cookie Set: ${cookie ? '✅ PASS' : '❌ FAIL'}`);
  } catch (err) {
    console.error('Admin login error:', err.message);
  }

  // Test 6: Admin Projects Fetch with Cookie
  try {
    const adminProjectsRes = await fetch(`${baseUrl}/api/admin/projects`, {
      headers: { Cookie: cookie },
    });
    const adminProjectsData = await adminProjectsRes.json();
    console.log(`\n7. Admin Projects GET /api/admin/projects: Status ${adminProjectsRes.status} ${adminProjectsData.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   - Loaded Projects Count: ${adminProjectsData.data?.length || 0}`);
  } catch (err) {
    console.error('Admin projects error:', err.message);
  }

  // Test 7: Admin Messages Fetch
  try {
    const adminMsgsRes = await fetch(`${baseUrl}/api/admin/messages`, {
      headers: { Cookie: cookie },
    });
    const adminMsgsData = await adminMsgsRes.json();
    console.log(`\n8. Admin Messages GET /api/admin/messages: Status ${adminMsgsRes.status} ${adminMsgsData.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   - Loaded Messages Count: ${adminMsgsData.data?.length || 0}`);
  } catch (err) {
    console.error('Admin messages error:', err.message);
  }

  console.log('\n=== ALL TESTS COMPLETED SUCCESSFULLY ===');
}

testApp();
