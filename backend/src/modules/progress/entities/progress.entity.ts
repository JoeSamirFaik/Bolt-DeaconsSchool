import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('progress')
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'lesson_id' })
  lessonId: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  score: number;

  @Column({ name: 'time_spent', default: 0 })
  timeSpent: number;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}