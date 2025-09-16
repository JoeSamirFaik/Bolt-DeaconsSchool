import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'كلمة المرور مطلوبة' })
  @MinLength(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
  password: string;

  @ApiProperty({ example: 'يوحنا' })
  @IsString({ message: 'الاسم الأول مطلوب' })
  firstName: string;

  @ApiProperty({ example: 'سمير' })
  @IsString({ message: 'اسم العائلة مطلوب' })
  lastName: string;

  @ApiProperty({ enum: UserRole, example: UserRole.DEACON })
  @IsEnum(UserRole, { message: 'الدور غير صحيح' })
  role: UserRole;

  @ApiProperty({ example: 'ابتدائي', required: false })
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiProperty({ example: '1', required: false })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentId?: string;
}