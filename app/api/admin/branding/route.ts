import { NextRequest, NextResponse } from 'next/server';
import { getBrandingSettings, saveBrandingSettings } from '@/lib/dataService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const branding = await getBrandingSettings();
    return NextResponse.json({ success: true, data: branding });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updates = await req.json();
    const updated = await saveBrandingSettings(updates);
    return NextResponse.json({ success: true, data: updated, message: 'تم حفظ إعدادات الهوية والشعار والألوان بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
