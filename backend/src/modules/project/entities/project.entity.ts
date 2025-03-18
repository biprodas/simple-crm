import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriorityEnum } from '../enums/priority.enum';
import { ProjectStatus } from '../enums/status.enum';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'start_date', type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'enum', enum: PriorityEnum, nullable: true })
  priority: PriorityEnum;

  // in hour
  @Column({ name: 'time_estimated', type: 'int', nullable: true })
  timeEstimated: number;

  // in hour
  @Column({ name: 'time_tracked', type: 'int', nullable: true })
  timeTracked: number;

  // in hour
  @Column({ name: 'time_difference', type: 'int', nullable: true })
  timeDifference: number;

  @Column({
    name: 'project_type',
    type: 'enum',
    enum: ['Fixed', 'Hourly'],
    default: 'Fixed',
  })
  projectType: 'Fixed' | 'Hourly';

  @Column({
    name: 'project_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  projectValue: number;

  // assignee

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.Open,
  })
  status: ProjectStatus;

  // accountId
  // dealId
  // invoices

  @Column({ nullable: true })
  details: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Project with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Project of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Project`);
  }
}
