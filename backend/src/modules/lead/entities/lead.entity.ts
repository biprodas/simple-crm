import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadStatus } from '../enums/status.enum';

@Entity('leads')
export class LeadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'contact_name', nullable: true })
  contactName: string;

  @Column({ name: 'job_title', nullable: true })
  jobTitle: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  // Social Media, Referral, Website, Email Campaign, Paid Advertising
  @Column({ nullable: true })
  source: string;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NewLead })
  status: LeadStatus;

  // assignee, due date, priority

  // projects
  // accounts

  // @Column({ name: 'country_id' })
  // countryId: string;
  // @ManyToOne((_type) => CountryEntity, (country) => country.leads)
  // @JoinColumn({ name: 'country_id' })
  // country: CountryEntity;

  // // relations
  // @OneToMany((_type) => UniversityEntity, (university) => university.lead)
  // universities: UniversityEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Lead with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Lead of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Lead of id ${this.id}`);
  }
}
