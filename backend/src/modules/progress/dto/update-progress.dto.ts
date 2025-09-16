import { PartialType } from '@nestjs/swagger';
import { CreateProgressDto } from './create-progress.dto';
import { IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto extends PartialType(CreateProgressDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  completedAt?: Date;
}