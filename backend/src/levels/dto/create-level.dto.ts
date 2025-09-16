import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  passPercentage?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}