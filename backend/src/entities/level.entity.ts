import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity('levels')
export class Level {
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

  @OneToMany(() => Subject, subject => subject.level)
  subjects: Subject[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}