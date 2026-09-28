import { NextResponse } from 'next/server';
import { ensureDatabaseSeeded } from '@/lib/dataService';

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with reference site data',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
