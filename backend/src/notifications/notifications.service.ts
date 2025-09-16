import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  getMyNotifications() {
    return [
      {
        id: '1',
        title: 'درس جديد متاح!',
        message: 'تم إضافة درس جديد: "مغامرة الصلاة الثانية"',
        type: 'info',
        read: false,
        createdAt: '2024-01-17T10:00:00Z',
      },
      {
        id: '2',
        title: 'تهانينا!',
        message: 'لقد أكملت 5 دروس بنجاح!',
        type: 'success',
        read: false,
        createdAt: '2024-01-16T15:00:00Z',
      },
    ];
  }
}