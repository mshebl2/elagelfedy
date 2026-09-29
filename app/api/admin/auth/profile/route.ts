import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminUser from '@/models/AdminUser';
import { getAdminSession, comparePassword, hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectDB();
    let email = 'admin@alaajsa.com';
    let username = session.username;

    if (db) {
      const user = await AdminUser.findById(session.id);
      if (user) {
        email = user.email || email;
        username = user.username || username;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: session.id,
        username,
        email,
        role: session.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { username, email, currentPassword, newPassword } = await req.json();
    const db = await connectDB();

    if (db) {
      let user = await AdminUser.findById(session.id);
      if (!user) {
        user = await AdminUser.findOne({ username: session.username });
      }

      if (user) {
        // If password change is requested
        if (newPassword) {
          if (!currentPassword) {
            return NextResponse.json(
              { success: false, message: 'يرجى إدخال كلمة المرور الحالية لتأكيد التغيير' },
              { status: 400 }
            );
          }
          const isMatch = await comparePassword(currentPassword, user.passwordHash);
          if (!isMatch) {
            return NextResponse.json(
              { success: false, message: 'كلمة المرور الحالية غير صحيحة' },
              { status: 400 }
            );
          }
          user.passwordHash = await hashPassword(newPassword);
        }

        if (username) user.username = username;
        if (email) user.email = email;
        await user.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات الحساب وكلمة المرور بنجاح',
      data: { username, email },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
