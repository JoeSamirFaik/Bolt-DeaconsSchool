import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from '../../../common/enums/user-role.enum';
import { Progress } from '../../progress/entities/progress.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEACON,
  })
  role: UserRole;

  @Column({ nullable: true })
  stage: string;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendance: Attendance[];
}