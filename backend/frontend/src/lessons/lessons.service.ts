import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonsService {
  private readonly mockLessons = [
    {
      id: '1',
      title: 'مغامرة الصلاة الأولى',
      description: 'تعلم كيفية التحدث مع الله بطريقة ممتعة',
      stage: 'ابتدائي',
      level: '1',
      content: {
        text: 'الصلاة هي محادثة جميلة مع الله...',
        videoUrl: 'https://example.com/video1',
      },
      duration: 30,
      order: 1,
      createdAt: '2024-01-01T10:00:00Z',
    },
    {
      id: '2',
      title: 'أبطال الكتاب المقدس',
      description: 'قصص مثيرة عن الأبطال في الكتاب المقدس',
      stage: 'ابتدائي',
      level: '2',
      content: {
        text: 'دعونا نتعرف على داود الشجاع...',
        videoUrl: 'https://example.com/video2',
      },
      duration: 45,
      order: 2,
      createdAt: '2024-01-02T10:00:00Z',
    },
    {
      id: '3',
      title: 'خدمة المجتمع',
      description: 'كيف نساعد الآخرين ونخدم مجتمعنا',
      stage: 'إعدادي',
      level: '1',
      content: {
        text: 'الخدمة هي طريقة لإظهار محبة الله...',
        videoUrl: 'https://example.com/video3',
      },
      duration: 60,
      order: 3,
      createdAt: '2024-01-03T10:00:00Z',
    },
  ];

  findAll(stage?: string, level?: string) {
    let lessons = this.mockLessons;
    
    if (stage) {
      lessons = lessons.filter(lesson => lesson.stage === stage);
    }
    
    if (level) {
      lessons = lessons.filter(lesson => lesson.level === level);
    }
    
    return lessons;
  }
}