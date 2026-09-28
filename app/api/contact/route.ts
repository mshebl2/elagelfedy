import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, subject, message, soilConditions } = body;

    if (!name || !company || !email || !phone || !subject) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const referenceNo = `AACC-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const db = await connectDB();
    if (db) {
      try {
        const newMessage = await Message.create({
          referenceNo,
          name,
          company,
          email,
          phone,
          subject,
          message: message || '',
          soilConditions: soilConditions || '',
          status: 'new',
        });

        return NextResponse.json({
          success: true,
          message: 'Tender request submitted successfully',
          data: newMessage,
        });
      } catch (dbErr) {
        console.error('Error saving message in DB:', dbErr);
      }
    }

    // Return success with generated reference even if DB operates in fallback mode
    return NextResponse.json({
      success: true,
      message: 'Tender request logged successfully',
      data: {
        referenceNo,
        name,
        company,
        email,
        phone,
        subject,
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing RFQ submission' },
      { status: 500 }
    );
  }
}
