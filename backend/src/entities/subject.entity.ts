import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Level } from './level.entity';
import { Lesson } from './lesson.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 70.0 })
  passPercentage: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  levelId: string;

  @ManyToOne(() => Level, level => level.subjects)
  @JoinColumn({ name: 'levelId' })
  level: Level;

  @OneToMany(() => Lesson, lesson => lesson.subject)
  lessons: Lesson[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}