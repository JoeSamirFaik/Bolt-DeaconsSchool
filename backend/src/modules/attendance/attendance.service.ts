import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceStatus } from '../../common/enums/attendance-status.enum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto, markedBy: string): Promise<Attendance> {
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        userId: createAttendanceDto.userId,
        sessionId: createAttendanceDto.sessionId,
        date: createAttendanceDto.date,
      },
    });

    if (existingAttendance) {
      return this.update(existingAttendance.id, createAttendanceDto);
    }

    const attendance = this.attendanceRepository.create({
      ...createAttendanceDto,
      markedBy,
    });

    return this.attendanceRepository.save(attendance);
  }

  async findByUser(userId: string, startDate?: Date, endDate?: Date): Promise<Attendance[]> {
    const where: any = { userId };

    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    }

    return this.attendanceRepository.find({
      where,
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }

  async findBySession(sessionId: string, date: Date): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { sessionId, date },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async getUserAttendanceStats(userId: string, startDate?: Date, endDate?: Date) {
    const where: any = { userId };

    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    }

    const totalSessions = await this.attendanceRepository.count({ where });

    const presentSessions = await this.attendanceRepository.count({
      where: { ...where, status: AttendanceStatus.PRESENT },
    });

    const lateSessions = await this.attendanceRepository.count({
      where: { ...where, status: AttendanceStatus.LATE },
    });

    const absentSessions = await this.attendanceRepository.count({
      where: { ...where, status: AttendanceStatus.ABSENT },
    });

    return {
      totalSessions,
      presentSessions,
      lateSessions,
      absentSessions,
      attendanceRate: totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 0,
    };
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    
    if (!attendance) {
      throw new NotFoundException('سجل الحضور غير موجود');
    }

    await this.attendanceRepository.update(id, updateAttendanceDto);
    return this.attendanceRepository.findOne({ 
      where: { id },
      relations: ['user'],
    });
  }

  async remove(id: string): Promise<void> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    
    if (!attendance) {
      throw new NotFoundException('سجل الحضور غير موجود');
    }

    await this.attendanceRepository.remove(attendance);
  }
}