import { Controller, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('my-attendance')
  getMyAttendance() {
    return this.attendanceService.getMyAttendance();
  }

  @Get('my-stats')
  getMyAttendanceStats() {
    return this.attendanceService.getMyAttendanceStats();
  }
}