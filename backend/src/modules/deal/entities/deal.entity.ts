import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DealType } from '../enums/deal-type.enum';

@Entity('deals')
export class DealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  accountId: string;

  @Column({ type: 'enum', enum: DealType, nullable: true })
  type: DealType;

  @Column({ nullable: true })
  amount: string;

  // Majors
  // @Column({ name: 'department_id', type: 'uuid', nullable: true })
  // departmentId: string;
  // @ManyToOne((_type) => DepartmentEntity, (department) => department.deals)
  // @JoinColumn({ name: 'department_id' })
  // department: DepartmentEntity;

  // @Column({ name: 'university_id', type: 'uuid' })
  // universityId: string;
  // @ManyToOne((_type) => UniversityEntity, (university) => university.deals)
  // @JoinColumn({ name: 'university_id' })
  // university: UniversityEntity;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Deal with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Deal of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Deal`);
  }
}
