import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'كلمة المرور مطلوبة' })
  password: string;
}