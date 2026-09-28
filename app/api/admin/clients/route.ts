import { NextRequest, NextResponse } from 'next/server';
import { getClients, saveClients } from '@/lib/dataService';
import { ClientType } from '@/types';

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
      await saveClients(body);
      return NextResponse.json({ success: true, data: body });
    }
    const { id, ...updates } = body;
    const clients = await getClients();
    const updated = clients.map((c) => (c.id === id || c._id === id ? { ...c, ...updates } : c));
    await saveClients(updated);
    return NextResponse.json({ success: true, data: updated });
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
    const updated = clients.filter((c) => c.id !== id && c._id !== id);
    await saveClients(updated);
    return NextResponse.json({ success: true, message: 'Client deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
