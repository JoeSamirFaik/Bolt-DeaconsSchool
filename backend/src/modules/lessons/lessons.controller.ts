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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('الدروس')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'إنشاء درس جديد' })
  create(@Body() createLessonDto: CreateLessonDto, @Request() req) {
    return this.lessonsService.create(createLessonDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'عرض جميع الدروس' })
  @ApiQuery({ name: 'stage', required: false })
  @ApiQuery({ name: 'level', required: false })
  findAll(@Query('stage') stage?: string, @Query('level') level?: string) {
    if (stage && level) {
      return this.lessonsService.findByStageAndLevel(stage, level);
    }
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'عرض درس محدد' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'تحديث درس' })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'حذف درس' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}