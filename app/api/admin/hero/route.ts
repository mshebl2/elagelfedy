import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, saveHeroSlides } from '@/lib/dataService';
import { HeroSlideType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const slides = await getHeroSlides();
    return NextResponse.json({ success: true, data: slides });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newSlide = await req.json();
    const slides = await getHeroSlides();
    const slideWithId: HeroSlideType = {
      ...newSlide,
      id: newSlide.id || `hero-${Date.now()}`,
      order: slides.length + 1,
      active: newSlide.active ?? true,
    };
    const updated = [...slides, slideWithId];
    await saveHeroSlides(updated);
    return NextResponse.json({ success: true, data: slideWithId });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (Array.isArray(body)) {
      const saved = await saveHeroSlides(body);
      return NextResponse.json({ success: true, data: saved });
    }
    const { id, _id, ...updates } = body;
    const targetId = id || _id;
    const slides = await getHeroSlides();
    let matched = false;
    const updated = slides.map((s) => {
      const isMatch =
        (targetId && (String(s.id) === String(targetId) || String(s._id) === String(targetId))) ||
        (body.titleAr && String(s.titleAr) === String(body.titleAr));
      if (isMatch) {
        matched = true;
        return { ...s, ...updates };
      }
      return s;
    });
    if (!matched) {
      updated.push(body);
    }
    const saved = await saveHeroSlides(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حفظ شريحة العرض بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Slide ID is required' }, { status: 400 });
    }
    const slides = await getHeroSlides();
    const updated = slides.filter((s) => String(s.id) !== String(id) && String(s._id) !== String(id));
    const saved = await saveHeroSlides(updated);
    return NextResponse.json({ success: true, data: saved, message: 'تم حذف شريحة العرض بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
