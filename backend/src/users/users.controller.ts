import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('deacons')
  findDeacons() {
    return this.usersService.findByRole('deacon');
  }

  @Get('children')
  findChildren() {
    return this.usersService.findByRole('deacon'); // Parents see their children (deacons)
  }

  @Get('profile')
  getProfile() {
    return this.usersService.getProfile();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}