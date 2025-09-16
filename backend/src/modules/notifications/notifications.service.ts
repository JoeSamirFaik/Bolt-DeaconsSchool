import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, createdBy: string): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      createdBy,
    });

    return this.notificationsRepository.save(notification);
  }

  async findForUser(user: User): Promise<Notification[]> {
    const query = this.notificationsRepository.createQueryBuilder('notification')
      .where('notification.targetUserId = :userId', { userId: user.id })
      .orWhere('notification.targetRole = :role', { role: user.role })
      .orWhere('(notification.targetStage = :stage AND notification.targetLevel = :level)', {
        stage: user.stage,
        level: user.level,
      })
      .orWhere('notification.targetUserId IS NULL AND notification.targetRole IS NULL AND notification.targetStage IS NULL')
      .orderBy('notification.createdAt', 'DESC');

    return query.getMany();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('الإشعار غير موجود');
    }

    return notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.findOne(id);
    await this.notificationsRepository.update(id, { read: true });
    return this.findOne(id);
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.findOne(id);
    await this.notificationsRepository.update(id, updateNotificationDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationsRepository.remove(notification);
  }
}