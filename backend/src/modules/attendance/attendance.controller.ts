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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('الحضور')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'تسجيل حضور' })
  create(@Body() createAttendanceDto: CreateAttendanceDto, @Request() req) {
    return this.attendanceService.create(createAttendanceDto, req.user.id);
  }

  @Get('my-attendance')
  @ApiOperation({ summary: 'عرض حضوري' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  findMyAttendance(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.findByUser(req.user.id, start, end);
  }

  @Get('my-stats')
  @ApiOperation({ summary: 'عرض إحصائيات حضوري' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  getMyAttendanceStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getUserAttendanceStats(req.user.id, start, end);
  }

  @Get('user/:userId')
  @Roles(UserRole.SERVANT, UserRole.PARENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض حضور مستخدم' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  findUserAttendance(
    @Param('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.findByUser(userId, start, end);
  }

  @Get('user/:userId/stats')
  @Roles(UserRole.SERVANT, UserRole.PARENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض إحصائيات حضور مستخدم' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  getUserAttendanceStats(
    @Param('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getUserAttendanceStats(userId, start, end);
  }

  @Get('session/:sessionId')
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض حضور جلسة' })
  @ApiQuery({ name: 'date', required: true })
  findSessionAttendance(
    @Param('sessionId') sessionId: string,
    @Query('date') date: string,
  ) {
    return this.attendanceService.findBySession(sessionId, new Date(date));
  }

  @Patch(':id')
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'تحديث الحضور' })
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'حذف سجل الحضور' })
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}