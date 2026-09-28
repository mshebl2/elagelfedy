import { NextRequest, NextResponse } from 'next/server';
import { getContactSettings, saveContactSettings } from '@/lib/dataService';

export async function GET() {
  try {
    const contact = await getContactSettings();
    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updates = await req.json();
    const updated = await saveContactSettings(updates);
    return NextResponse.json({ success: true, data: updated, message: 'تم حفظ وسائل الاتصال والعنوان وروابط السوشيال بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
