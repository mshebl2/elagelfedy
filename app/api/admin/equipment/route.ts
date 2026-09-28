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

    let updated: EquipmentType[];
    if (body._id || body.id) {
      const id = body._id || body.id;
      updated = equipment.map((item: any) => (item._id === id || item.id === id ? { ...item, ...body } : item));
    } else {
      const newItem = {
        ...body,
        order: equipment.length + 1,
      };
      updated = [...equipment, newItem];
    }

    await saveEquipment(updated);
    return NextResponse.json({ success: true, data: updated });
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
    const updated = equipment.filter((item: any) => item._id !== id && item.id !== id);
    await saveEquipment(updated);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

