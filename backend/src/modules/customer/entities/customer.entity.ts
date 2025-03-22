import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerTier } from '../enums/customer-tier.enum';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerStatus } from '../enums/status.enum';
import { LeadEntity } from '@modules/lead/entities/lead.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.Personal,
  })
  type: CustomerType;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'bill_rate', nullable: true })
  billRate: string;

  @Column({ type: 'enum', enum: CustomerTier, nullable: true })
  tier: CustomerTier;

  @Column({ name: 'lead_id', nullable: true })
  leadId: string;
  @ManyToOne((_type) => LeadEntity, (lead) => lead.customers)
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.Prospect,
  })
  status: CustomerStatus;

  // assignee

  // contacts
  // projects
  // credentials

  // // relations
  // @OneToMany((_type) => UniversityEntity, (university) => university.customer)
  // universities: UniversityEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Customer with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Customer of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Customer of id ${this.id}`);
  }
}
