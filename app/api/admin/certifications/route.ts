import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certification from '@/models/Certification';
import { getAdminSession } from '@/lib/auth';
import { getCertificationsList } from '@/lib/dataService';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const certs = await getCertificationsList();
    return NextResponse.json({ success: true, data: certs });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    if (body._id) {
      const updated = await Certification.findByIdAndUpdate(body._id, body, { new: true });
      return NextResponse.json({ success: true, data: updated });
    } else {
      const created = await Certification.create(body);
      return NextResponse.json({ success: true, data: created });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
