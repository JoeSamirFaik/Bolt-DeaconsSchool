import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto, createdBy: string): Promise<Lesson> {
    const lesson = this.lessonsRepository.create({
      ...createLessonDto,
      createdBy,
    });

    return this.lessonsRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findByStageAndLevel(stage: string, level: string): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      where: { stage, level, isActive: true },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({
      where: { id, isActive: true },
    });

    if (!lesson) {
      throw new NotFoundException('الدرس غير موجود');
    }

    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    await this.lessonsRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonsRepository.update(id, { isActive: false });
  }
}