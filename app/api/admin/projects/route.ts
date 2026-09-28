import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getProjects, saveProjects } from '@/lib/dataService';
import { ProjectType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const projects = await getProjects();
    return NextResponse.json({ success: true, data: projects });
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
    const projects = await getProjects();

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = (body.titleEn || body.titleAr || 'project')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;
    }

    const newProject: ProjectType = {
      ...body,
      _id: body._id || `proj-${Date.now()}`,
      order: projects.length + 1,
      gallery: body.gallery || [],
      featured: body.featured ?? false,
    };

    const updated = [newProject, ...projects];
    await saveProjects(updated);
    return NextResponse.json({ success: true, data: newProject, message: 'تمت إضافة المشروع بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
