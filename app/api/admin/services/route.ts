import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getServices, saveServices } from '@/lib/dataService';
import { ServiceType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const services = await getServices();
    return NextResponse.json({ success: true, data: services });
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

    const newService = await req.json();
    const services = await getServices();
    const serviceWithId: ServiceType = {
      ...newService,
      _id: newService._id || `srv-${Date.now()}`,
      number: newService.number || String(services.length + 1).padStart(2, '0'),
      order: services.length + 1,
    };
    const updated = [...services, serviceWithId];
    await saveServices(updated);
    return NextResponse.json({ success: true, data: serviceWithId, message: 'تمت إضافة الخدمة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const services = await getServices();
    const id = body._id || body.id;
    const updated = services.map((s) => (s._id === id || s.number === body.number ? { ...s, ...body } : s));
    await saveServices(updated);
    return NextResponse.json({ success: true, data: updated, message: 'تم تحديث بيانات الخدمة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Service ID is required' }, { status: 400 });
    }
    const services = await getServices();
    const updated = services.filter((s) => s._id !== id && s.number !== id);
    await saveServices(updated);
    return NextResponse.json({ success: true, message: 'تم حذف الخدمة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
