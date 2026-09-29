import { NextRequest, NextResponse } from 'next/server';
import { getClients, saveClients } from '@/lib/dataService';
import { ClientType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const clients = await getClients();
    return NextResponse.json({ success: true, data: clients });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newClient = await req.json();
    const clients = await getClients();
    const clientWithId: ClientType = {
      ...newClient,
      id: newClient.id || `client-${Date.now()}`,
      order: clients.length + 1,
      active: newClient.active ?? true,
    };
    const updated = [...clients, clientWithId];
    await saveClients(updated);
    return NextResponse.json({ success: true, data: clientWithId });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (Array.isArray(body)) {
      const saved = await saveClients(body);
      return NextResponse.json({ success: true, data: saved });
    }
    const { id, _id, ...updates } = body;
    const targetId = id || _id;
    const clients = await getClients();
    let matched = false;
    const updated = clients.map((c) => {
      const isMatch =
        (targetId && (String(c.id) === String(targetId) || String(c._id) === String(targetId))) ||
        (body.name && String(c.name) === String(body.name)) ||
        (body.nameAr && String(c.nameAr) === String(body.nameAr));
      if (isMatch) {
        matched = true;
        return { ...c, ...updates };
      }
      return c;
    });
    if (!matched) {
      updated.push(body);
    }
    const saved = await saveClients(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حفظ العميل بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Client ID is required' }, { status: 400 });
    }
    const clients = await getClients();
    const updated = clients.filter((c) => String(c.id) !== String(id) && String(c._id) !== String(id));
    const saved = await saveClients(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حذف العميل بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
