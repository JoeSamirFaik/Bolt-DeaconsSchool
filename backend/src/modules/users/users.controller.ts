import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('المستخدمون')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'إنشاء مستخدم جديد' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SERVANT)
  @ApiOperation({ summary: 'عرض جميع المستخدمين' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'عرض الملف الشخصي' })
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Get('deacons')
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض الشمامسة' })
  findDeacons(@Request() req) {
    return this.usersService.findDeaconsByServant(req.user.id);
  }

  @Get('children')
  @Roles(UserRole.PARENT)
  @ApiOperation({ summary: 'عرض الأطفال' })
  findChildren(@Request() req) {
    return this.usersService.findChildrenByParent(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'عرض مستخدم محدد' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'تحديث الملف الشخصي' })
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'تحديث مستخدم' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'حذف مستخدم' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}