import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { LevelsModule } from './levels/levels.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ProgressModule } from './progress/progress.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Level } from './entities/level.entity';
import { Subject } from './entities/subject.entity';
import { Lesson } from './entities/lesson.entity';
import { UserProgress } from './entities/user-progress.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'deacons_school.db',
      entities: [Level, Subject, Lesson, UserProgress],
      synchronize: true, // Only for development
    }),
    AuthModule,
    UsersModule,
    LevelsModule,
    SubjectsModule,
    LessonsModule,
    ProgressModule,
    AttendanceModule,
    NotificationsModule,
  ],
})
export class AppModule {}