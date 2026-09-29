import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getCertificationsList, saveCertifications } from '@/lib/dataService';
import { CertificationType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const certs = await getCertificationsList();
    return NextResponse.json({ success: true, data: certs });
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
    const certs = await getCertificationsList();
    const id = body._id || body.id;

    let matched = false;
    const updated = certs.map((item: any) => {
      const isMatch =
        (id && (String(item._id) === String(id) || String(item.id) === String(id))) ||
        (body.certNumber && String(item.certNumber) === String(body.certNumber)) ||
        (body.titleAr && String(item.titleAr) === String(body.titleAr));

      if (isMatch) {
        matched = true;
        return { ...item, ...body };
      }
      return item;
    });

    if (!matched) {
      const newItem = {
        ...body,
        order: certs.length + 1,
      };
      updated.push(newItem);
    }

    const saved = await saveCertifications(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حفظ الشهادة بنجاح' });
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

    const certs = await getCertificationsList();
    const updated = certs.filter((item: any) => String(item._id) !== String(id) && String(item.id) !== String(id));
    const saved = await saveCertifications(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حذف الشهادة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

