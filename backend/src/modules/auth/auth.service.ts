import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await this.usersService.validatePassword(user, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('الحساب غير مفعل');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        stage: user.stage,
        level: user.level,
        avatar: user.avatar,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    
    if (existingUser) {
      throw new UnauthorizedException('البريد الإلكتروني مستخدم بالفعل');
    }

    const user = await this.usersService.create(registerDto);
    const { password, ...result } = user;

    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  async validateToken(payload: any): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('المستخدم غير موجود أو غير مفعل');
    }
    
    return user;
  }
}