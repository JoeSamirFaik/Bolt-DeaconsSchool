import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Progress } from '../../progress/entities/progress.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  stage: string;

  @Column()
  level: string;

  @Column('jsonb', { nullable: true })
  content: {
    text?: string;
    videoUrl?: string;
    audioUrl?: string;
    attachments?: string[];
  };

  @Column({ default: 0 })
  duration: number;

  @Column({ name: 'display_order', default: 0 })
  order: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Progress, (progress) => progress.lesson)
  progress: Progress[];
}