import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  lessonId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'int', default: 0 })
  timeSpent: number; // in minutes

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  lastAccessedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;
}