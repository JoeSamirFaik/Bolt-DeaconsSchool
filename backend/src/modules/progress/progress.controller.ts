import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('التقدم')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @ApiOperation({ summary: 'تسجيل تقدم جديد' })
  create(@Body() createProgressDto: CreateProgressDto, @Request() req) {
    return this.progressService.create({
      ...createProgressDto,
      userId: req.user.id,
    });
  }

  @Get('my-progress')
  @ApiOperation({ summary: 'عرض تقدمي' })
  findMyProgress(@Request() req) {
    return this.progressService.findByUser(req.user.id);
  }

  @Get('my-stats')
  @ApiOperation({ summary: 'عرض إحصائياتي' })
  getMyStats(@Request() req) {
    return this.progressService.getUserStats(req.user.id);
  }

  @Get('user/:userId')
  @Roles(UserRole.SERVANT, UserRole.PARENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض تقدم مستخدم' })
  findUserProgress(@Param('userId') userId: string) {
    return this.progressService.findByUser(userId);
  }

  @Get('user/:userId/stats')
  @Roles(UserRole.SERVANT, UserRole.PARENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض إحصائيات مستخدم' })
  getUserStats(@Param('userId') userId: string) {
    return this.progressService.getUserStats(userId);
  }

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'عرض تقدم درس محدد' })
  findLessonProgress(@Param('lessonId') lessonId: string, @Request() req) {
    return this.progressService.findByUserAndLesson(req.user.id, lessonId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'تحديث التقدم' })
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'حذف التقدم' })
  remove(@Param('id') id: string) {
    return this.progressService.remove(id);
  }
}