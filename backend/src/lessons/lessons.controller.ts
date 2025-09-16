import { Controller, Get, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  findAll(@Query('stage') stage?: string, @Query('level') level?: string) {
    return this.lessonsService.findAll(stage, level);
  }
}