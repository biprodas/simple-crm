import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'job_title', nullable: true })
  jobTitle: string;

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  // move to projects_contacts table
  @Column({ name: 'is_primary', nullable: true })
  isPrimary: boolean;

  @Column({ name: 'is_archieved', nullable: true })
  isArchieved: boolean;

  @Column({ name: 'customer_id', nullable: true })
  customerId: string;

  // projects

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Contact with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Contact of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Contact of id ${this.id}`);
  }
}
