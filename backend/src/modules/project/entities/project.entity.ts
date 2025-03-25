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
import { ProjectType } from '../enums/project-type.enum';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @Column({ name: 'start_date', type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'enum', enum: PriorityEnum, nullable: true })
  priority: PriorityEnum;

  // in hour
  @Column({ name: 'time_estimated', type: 'int', nullable: true })
  timeEstimated: number;

  // in hour
  @Column({ name: 'time_tracked', type: 'int', nullable: true })
  timeTracked: number;

  // calculated - in hour
  @Column({ name: 'time_difference', type: 'int', nullable: true })
  timeDifference: number;

  @Column({
    name: 'project_type',
    type: 'enum',
    enum: ProjectType,
    nullable: true,
  })
  projectType: ProjectType;

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
