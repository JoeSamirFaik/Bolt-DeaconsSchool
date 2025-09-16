import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    const existingProgress = await this.progressRepository.findOne({
      where: {
        userId: createProgressDto.userId,
        lessonId: createProgressDto.lessonId,
      },
    });

    if (existingProgress) {
      return this.update(existingProgress.id, createProgressDto);
    }

    const progress = this.progressRepository.create(createProgressDto);
    return this.progressRepository.save(progress);
  }

  async findByUser(userId: string): Promise<Progress[]> {
    return this.progressRepository.find({
      where: { userId },
      relations: ['lesson'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUserAndLesson(userId: string, lessonId: string): Promise<Progress> {
    return this.progressRepository.findOne({
      where: { userId, lessonId },
      relations: ['lesson'],
    });
  }

  async getUserStats(userId: string) {
    const totalLessons = await this.progressRepository.count({
      where: { userId },
    });

    const completedLessons = await this.progressRepository.count({
      where: { userId, completed: true },
    });

    const avgScore = await this.progressRepository
      .createQueryBuilder('progress')
      .select('AVG(progress.score)', 'avgScore')
      .where('progress.userId = :userId AND progress.score IS NOT NULL', { userId })
      .getRawOne();

    const totalTimeSpent = await this.progressRepository
      .createQueryBuilder('progress')
      .select('SUM(progress.timeSpent)', 'totalTime')
      .where('progress.userId = :userId', { userId })
      .getRawOne();

    return {
      totalLessons,
      completedLessons,
      completionRate: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      averageScore: avgScore?.avgScore ? parseFloat(avgScore.avgScore) : 0,
      totalTimeSpent: totalTimeSpent?.totalTime || 0,
    };
  }

  async update(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const progress = await this.progressRepository.findOne({ where: { id } });
    
    if (!progress) {
      throw new NotFoundException('التقدم غير موجود');
    }

    if (updateProgressDto.completed && !progress.completed) {
      updateProgressDto.completedAt = new Date();
    }

    await this.progressRepository.update(id, updateProgressDto);
    return this.progressRepository.findOne({ 
      where: { id },
      relations: ['lesson'],
    });
  }

  async remove(id: string): Promise<void> {
    const progress = await this.progressRepository.findOne({ where: { id } });
    
    if (!progress) {
      throw new NotFoundException('التقدم غير موجود');
    }

    await this.progressRepository.remove(progress);
  }
}