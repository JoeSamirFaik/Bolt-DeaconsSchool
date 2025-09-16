import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Subject } from './subject.entity';

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  MIXED = 'mixed'
}

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  textContent: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({
    type: 'enum',
    enum: ContentType,
    default: ContentType.TEXT
  })
  contentType: ContentType;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ type: 'int', default: 30 })
  estimatedDuration: number; // in minutes

  @Column({ default: true })
  isActive: boolean;

  @Column()
  subjectId: string;

  @ManyToOne(() => Subject, subject => subject.lessons)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}