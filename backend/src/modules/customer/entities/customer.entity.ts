import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerTier } from '../enums/customer-tier.enum';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerStatus } from '../enums/status.enum';

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

  // @Column({ name: 'country_id' })
  // countryId: string;
  // @ManyToOne((_type) => CountryEntity, (country) => country.customers)
  // @JoinColumn({ name: 'country_id' })
  // country: CountryEntity;

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
