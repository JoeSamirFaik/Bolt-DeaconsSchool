import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgressService {
  getMyProgress() {
    return [
      {
        id: '1',
        userId: '1',
        lessonId: '1',
        completed: true,
        score: 95,
        completedAt: '2024-01-15T10:00:00Z',
        timeSpent: 30,
      },
      {
        id: '2',
        userId: '1',
        lessonId: '2',
        completed: true,
        score: 88,
        completedAt: '2024-01-16T10:00:00Z',
        timeSpent: 45,
      },
    ];
  }

  getMyStats() {
    return {
      completedLessons: 2,
      totalLessons: 5,
      completionRate: 40,
      averageScore: 91.5,
      totalTimeSpent: 75,
    };
  }
}