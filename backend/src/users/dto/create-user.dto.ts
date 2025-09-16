import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['deacon', 'servant', 'parent', 'admin'])
  role: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  level?: string;
}