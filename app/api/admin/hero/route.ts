import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, saveHeroSlides } from '@/lib/dataService';
import { HeroSlideType } from '@/types';

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
      // Reordering / bulk update
      await saveHeroSlides(body);
      return NextResponse.json({ success: true, data: body });
    }
    const { id, ...updates } = body;
    const slides = await getHeroSlides();
    const updated = slides.map((s) => (s.id === id || s._id === id ? { ...s, ...updates } : s));
    await saveHeroSlides(updated);
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
      return NextResponse.json({ success: false, message: 'Slide ID is required' }, { status: 400 });
    }
    const slides = await getHeroSlides();
    const updated = slides.filter((s) => s.id !== id && s._id !== id);
    await saveHeroSlides(updated);
    return NextResponse.json({ success: true, message: 'Slide deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
