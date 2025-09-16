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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('الإشعارات')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'إنشاء إشعار جديد' })
  create(@Body() createNotificationDto: CreateNotificationDto, @Request() req) {
    return this.notificationsService.create(createNotificationDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'عرض جميع الإشعارات' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('my-notifications')
  @ApiOperation({ summary: 'عرض إشعاراتي' })
  findMyNotifications(@Request() req) {
    return this.notificationsService.findForUser(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'عرض إشعار محدد' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'تعليم الإشعار كمقروء' })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch(':id')
  @Roles(UserRole.SERVANT, UserRole.ADMIN)
  @ApiOperation({ summary: 'تحديث إشعار' })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'حذف إشعار' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}