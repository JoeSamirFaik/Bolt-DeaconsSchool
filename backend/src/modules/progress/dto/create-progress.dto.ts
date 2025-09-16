import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgressDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 'lesson-uuid' })
  @IsString({ message: 'معرف الدرس مطلوب' })
  lessonId: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({ example: 85, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'النتيجة يجب أن تكون رقم' })
  score?: number;

  @ApiProperty({ example: 1800, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'الوقت المستغرق يجب أن يكون رقم' })
  timeSpent?: number;
}