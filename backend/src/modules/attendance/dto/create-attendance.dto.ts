import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';

export class CreateAttendanceDto {
  @ApiProperty({ example: 'user-uuid' })
  @IsString({ message: 'معرف المستخدم مطلوب' })
  userId: string;

  @ApiProperty({ example: 'session-uuid' })
  @IsString({ message: 'معرف الجلسة مطلوب' })
  sessionId: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString({}, { message: 'تاريخ غير صحيح' })
  date: Date;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus, { message: 'حالة الحضور غير صحيحة' })
  status: AttendanceStatus;

  @ApiProperty({ example: 'ملاحظات إضافية', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}