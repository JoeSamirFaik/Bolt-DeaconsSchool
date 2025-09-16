import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('profile')
  async getProfile(@Request() req) {
    // This would normally use JWT guard, but for demo we'll return mock data
    return {
      id: '1',
      email: 'deacon1@deacons.com',
      firstName: 'أحمد',
      lastName: 'محمد',
      role: 'deacon',
      stage: 'ابتدائي',
      level: '2',
      createdAt: new Date().toISOString(),
    };
  }
}