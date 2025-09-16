import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = this.levelRepository.create(createLevelDto);
    return await this.levelRepository.save(level);
  }

  async findAll(): Promise<Level[]> {
    return await this.levelRepository.find({
      relations: ['subjects'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['subjects', 'subjects.lessons'],
    });

    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }

    return level;
  }

  async update(id: string, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.findOne(id);
    Object.assign(level, updateLevelDto);
    return await this.levelRepository.save(level);
  }

  async remove(id: string): Promise<void> {
    const level = await this.findOne(id);
    await this.levelRepository.remove(level);
  }

  async findActiveWithSubjects(): Promise<Level[]> {
    return await this.levelRepository.find({
      where: { isActive: true },
      relations: ['subjects'],
      order: { order: 'ASC' },
    });
  }
}