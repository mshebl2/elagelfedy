import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getEquipmentList, saveEquipment } from '@/lib/dataService';
import { EquipmentType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const equipment = await getEquipmentList();
    return NextResponse.json({ success: true, data: equipment });
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
    const equipment = await getEquipmentList();
    const id = body._id || body.id;

    let matched = false;
    const updated = equipment.map((item: any) => {
      const isMatch =
        (id && (String(item._id) === String(id) || String(item.id) === String(id))) ||
        (body.nameAr && String(item.nameAr) === String(body.nameAr));

      if (isMatch) {
        matched = true;
        return { ...item, ...body };
      }
      return item;
    });

    if (!matched) {
      const newItem = {
        ...body,
        order: equipment.length + 1,
      };
      updated.push(newItem);
    }

    const saved = await saveEquipment(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حفظ المعدة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
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
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }

    const equipment = await getEquipmentList();
    const updated = equipment.filter((item: any) => String(item._id) !== String(id) && String(item.id) !== String(id));
    const saved = await saveEquipment(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حذف المعدة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

