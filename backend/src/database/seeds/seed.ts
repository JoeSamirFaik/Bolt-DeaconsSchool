import { AppDataSource } from '../../config/database.config';
import { User } from '../../modules/users/entities/user.entity';
import { Lesson } from '../../modules/lessons/entities/lesson.entity';
import { Progress } from '../../modules/progress/entities/progress.entity';
import { Attendance } from '../../modules/attendance/entities/attendance.entity';
import { Notification } from '../../modules/notifications/entities/notification.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import { AttendanceStatus } from '../../common/enums/attendance-status.enum';
import { NotificationType } from '../../modules/notifications/entities/notification.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('🌱 بدء عملية البذر...');

    // Clear existing data
    await AppDataSource.query('TRUNCATE TABLE notifications, attendance, progress, lessons, users RESTART IDENTITY CASCADE');

    // Create users
    const hashedPassword = await bcrypt.hash('password', 12);

    const users = [
      {
        email: 'admin@deacons.com',
        password: hashedPassword,
        firstName: 'سارة',
        lastName: 'مينا',
        role: UserRole.ADMIN,
      },
      {
        email: 'servant@deacons.com',
        password: hashedPassword,
        firstName: 'مريم',
        lastName: 'يوسف',
        role: UserRole.SERVANT,
      },
      {
        email: 'parent@deacons.com',
        password: hashedPassword,
        firstName: 'داود',
        lastName: 'إبراهيم',
        role: UserRole.PARENT,
      },
      {
        email: 'deacon1@deacons.com',
        password: hashedPassword,
        firstName: 'يوحنا',
        lastName: 'سمير',
        role: UserRole.DEACON,
        stage: 'ابتدائي',
        level: '1',
      },
      {
        email: 'deacon2@deacons.com',
        password: hashedPassword,
        firstName: 'مارك',
        lastName: 'عادل',
        role: UserRole.DEACON,
        stage: 'ابتدائي',
        level: '2',
      },
    ];

    const savedUsers = await AppDataSource.getRepository(User).save(users);
    console.log('✅ تم إنشاء المستخدمين');

    // Create lessons
    const lessons = [
      {
        title: 'مغامرات الكتاب المقدس - الجزء الأول',
        description: 'رحلة ممتعة في قصص الكتاب المقدس للأطفال',
        stage: 'ابتدائي',
        level: '1',
        content: {
          text: 'في البدء خلق الله السماوات والأرض...',
          videoUrl: 'https://example.com/video1.mp4',
          attachments: ['worksheet1.pdf'],
        },
        duration: 30,
        order: 1,
        createdBy: savedUsers[1].id, // Servant
      },
      {
        title: 'أبطال الإيمان',
        description: 'تعرف على أبطال الإيمان في الكتاب المقدس',
        stage: 'ابتدائي',
        level: '1',
        content: {
          text: 'إبراهيم أبو الآباء...',
          videoUrl: 'https://example.com/video2.mp4',
        },
        duration: 25,
        order: 2,
        createdBy: savedUsers[1].id,
      },
      {
        title: 'قوة الصلاة',
        description: 'تعلم أهمية الصلاة في حياتنا',
        stage: 'ابتدائي',
        level: '2',
        content: {
          text: 'الصلاة هي حديث مع الله...',
          audioUrl: 'https://example.com/audio1.mp3',
        },
        duration: 20,
        order: 1,
        createdBy: savedUsers[1].id,
      },
    ];

    const savedLessons = await AppDataSource.getRepository(Lesson).save(lessons);
    console.log('✅ تم إنشاء الدروس');

    // Create progress records
    const progressRecords = [
      {
        userId: savedUsers[3].id, // Deacon 1
        lessonId: savedLessons[0].id,
        completed: true,
        score: 95,
        timeSpent: 1800,
        completedAt: new Date(),
      },
      {
        userId: savedUsers[3].id,
        lessonId: savedLessons[1].id,
        completed: true,
        score: 88,
        timeSpent: 1500,
        completedAt: new Date(),
      },
      {
        userId: savedUsers[4].id, // Deacon 2
        lessonId: savedLessons[2].id,
        completed: false,
        timeSpent: 600,
      },
    ];

    await AppDataSource.getRepository(Progress).save(progressRecords);
    console.log('✅ تم إنشاء سجلات التقدم');

    // Create attendance records
    const attendanceRecords = [
      {
        userId: savedUsers[3].id,
        sessionId: 'session-1',
        date: new Date(),
        status: AttendanceStatus.PRESENT,
        markedBy: savedUsers[1].id,
      },
      {
        userId: savedUsers[4].id,
        sessionId: 'session-1',
        date: new Date(),
        status: AttendanceStatus.LATE,
        notes: 'وصل متأخراً 10 دقائق',
        markedBy: savedUsers[1].id,
      },
    ];

    await AppDataSource.getRepository(Attendance).save(attendanceRecords);
    console.log('✅ تم إنشاء سجلات الحضور');

    // Create notifications
    const notifications = [
      {
        title: 'مرحباً بكم في مدرسة الشمامسة! 🎉',
        message: 'نرحب بجميع الطلاب الجدد ونتمنى لهم رحلة تعليمية ممتعة ومفيدة',
        type: NotificationType.SUCCESS,
        targetRole: UserRole.DEACON,
        createdBy: savedUsers[0].id, // Admin
      },
      {
        title: 'درس جديد متاح الآن! 📚',
        message: 'تم إضافة درس جديد بعنوان "مغامرات الكتاب المقدس" للمرحلة الابتدائية',
        type: NotificationType.INFO,
        targetStage: 'ابتدائي',
        targetLevel: '1',
        createdBy: savedUsers[1].id, // Servant
      },
      {
        title: 'تذكير: جلسة اليوم ⏰',
        message: 'لا تنسوا جلسة اليوم في الساعة 7:00 مساءً',
        type: NotificationType.WARNING,
        createdBy: savedUsers[1].id,
      },
    ];

    await AppDataSource.getRepository(Notification).save(notifications);
    console.log('✅ تم إنشاء الإشعارات');

    console.log('🎉 تم الانتهاء من عملية البذر بنجاح!');
    console.log('\n📋 بيانات تسجيل الدخول:');
    console.log('المدير: admin@deacons.com / password');
    console.log('الخادم: servant@deacons.com / password');
    console.log('ولي الأمر: parent@deacons.com / password');
    console.log('الشماس 1: deacon1@deacons.com / password');
    console.log('الشماس 2: deacon2@deacons.com / password');

  } catch (error) {
    console.error('❌ خطأ في عملية البذر:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();