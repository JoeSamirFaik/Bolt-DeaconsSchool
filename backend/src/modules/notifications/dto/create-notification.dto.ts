import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({ example: 'إشعار مهم' })
  @IsString({ message: 'عنوان الإشعار مطلوب' })
  title: string;

  @ApiProperty({ example: 'محتوى الإشعار هنا' })
  @IsString({ message: 'محتوى الإشعار مطلوب' })
  message: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.INFO })
  @IsEnum(NotificationType, { message: 'نوع الإشعار غير صحيح' })
  type: NotificationType;

  @ApiProperty({ example: 'deacon', required: false })
  @IsOptional()
  @IsString()
  targetRole?: string;

  @ApiProperty({ example: 'ابتدائي', required: false })
  @IsOptional()
  @IsString()
  targetStage?: string;

  @ApiProperty({ example: '1', required: false })
  @IsOptional()
  @IsString()
  targetLevel?: string;

  @ApiProperty({ example: 'user-uuid', required: false })
  @IsOptional()
  @IsString()
  targetUserId?: string;
}