import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await uploadToCloudinary(buffer, 'aacc_ksa/uploads');

    return NextResponse.json({
      success: true,
      url: imageUrl,
      name: file.name,
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
