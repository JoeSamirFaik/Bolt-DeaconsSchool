import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { Subject } from '../entities/subject.entity';
import { Lesson } from '../entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Lesson])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}