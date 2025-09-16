import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // For demo purposes, we'll use hardcoded credentials
    const demoUsers = [
      { email: 'deacon1@deacons.com', password: 'password', role: 'deacon', firstName: 'أحمد', lastName: 'محمد' },
      { email: 'servant@deacons.com', password: 'password', role: 'servant', firstName: 'مريم', lastName: 'يوسف' },
      { email: 'parent@deacons.com', password: 'password', role: 'parent', firstName: 'سارة', lastName: 'علي' },
      { email: 'admin@deacons.com', password: 'password', role: 'admin', firstName: 'محمد', lastName: 'أحمد' },
    ];

    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: '1',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        stage: user.role === 'deacon' ? 'ابتدائي' : undefined,
        level: user.role === 'deacon' ? '2' : undefined,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    // For demo purposes, we'll just return a success response
    const payload = { email: createUserDto.email, sub: '1', role: createUserDto.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: '1',
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: createUserDto.role,
        stage: createUserDto.stage,
        level: createUserDto.level,
        createdAt: new Date().toISOString(),
      },
    };
  }
}