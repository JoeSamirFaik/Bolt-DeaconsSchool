import { Controller, Get } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('my-progress')
  getMyProgress() {
    return this.progressService.getMyProgress();
  }

  @Get('my-stats')
  getMyStats() {
    return this.progressService.getMyStats();
  }
}