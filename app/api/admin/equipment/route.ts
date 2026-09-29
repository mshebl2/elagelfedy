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

    if (Array.isArray(body)) {
      const saved = await saveEquipment(body);
      return NextResponse.json({ success: true, data: saved, message: 'تم حفظ قائمة المعدات بنجاح' });
    }

    const equipment = await getEquipmentList();
    const id = body._id || body.id;
    const bodyOrder = body.order !== undefined ? Number(body.order) : null;

    let matched = false;
    const updated = equipment.map((item: any) => {
      const itemId = item._id || item.id;
      const itemOrder = item.order !== undefined ? Number(item.order) : null;

      const isMatch =
        (id && itemId && String(itemId) === String(id)) ||
        (bodyOrder !== null && itemOrder !== null && itemOrder === bodyOrder) ||
        (body.nameAr && item.nameAr && String(item.nameAr).trim() === String(body.nameAr).trim());

      if (isMatch && !matched) {
        matched = true;
        return { ...item, ...body };
      }
      return item;
    });

    if (!matched) {
      const newItem = {
        ...body,
        order: body.order || equipment.length + 1,
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
    const updated = equipment.filter(
      (item: any) =>
        String(item._id) !== String(id) &&
        String(item.id) !== String(id) &&
        String(item.order) !== String(id) &&
        String(item.nameAr) !== String(id)
    );

    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    const saved = await saveEquipment(reordered);
    return NextResponse.json({ success: true, data: saved, message: 'تم حذف المعدة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


