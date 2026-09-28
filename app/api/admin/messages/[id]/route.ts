import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import { getAdminSession } from '@/lib/auth';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const updated = await Message.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
