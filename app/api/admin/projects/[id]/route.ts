import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getProjects, saveProjects } from '@/lib/dataService';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projects = await getProjects();
    const project = projects.find((p) => p._id === id || p.slug === id);

    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const projects = await getProjects();

    const updated = projects.map((p) => (p._id === id || p.slug === id ? { ...p, ...body } : p));
    await saveProjects(updated);

    return NextResponse.json({ success: true, data: body, message: 'تم تحديث بيانات المشروع بنجاح' });
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
    const projects = await getProjects();

    const updated = projects.filter((p) => p._id !== id && p.slug !== id);
    await saveProjects(updated);

    return NextResponse.json({ success: true, message: 'تم حذف المشروع بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
