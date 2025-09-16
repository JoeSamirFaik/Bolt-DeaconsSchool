import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ example: 'مغامرات الكتاب المقدس' })
  @IsString({ message: 'عنوان الدرس مطلوب' })
  title: string;

  @ApiProperty({ example: 'درس ممتع عن قصص الكتاب المقدس' })
  @IsString({ message: 'وصف الدرس مطلوب' })
  description: string;

  @ApiProperty({ example: 'ابتدائي' })
  @IsString({ message: 'المرحلة مطلوبة' })
  stage: string;

  @ApiProperty({ example: '1' })
  @IsString({ message: 'المستوى مطلوب' })
  level: string;

  @ApiProperty({ 
    example: { 
      text: 'محتوى الدرس',
      videoUrl: 'https://example.com/video.mp4',
      attachments: ['file1.pdf']
    },
    required: false 
  })
  @IsOptional()
  @IsObject()
  content?: {
    text?: string;
    videoUrl?: string;
    audioUrl?: string;
    attachments?: string[];
  };

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'مدة الدرس يجب أن تكون رقم' })
  duration?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'ترتيب الدرس يجب أن يكون رقم' })
  order?: number;
}