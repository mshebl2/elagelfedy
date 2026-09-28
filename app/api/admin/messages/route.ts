import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
