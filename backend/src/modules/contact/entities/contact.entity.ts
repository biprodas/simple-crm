import { CountryEntity } from '@modules/country/entities/country.entity';
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

  // projects
  // accounts

  // @Column({ name: 'country_id' })
  // countryId: string;
  // @ManyToOne((_type) => CountryEntity, (country) => country.contacts)
  // @JoinColumn({ name: 'country_id' })
  // country: CountryEntity;

  // // relations
  // @OneToMany((_type) => UniversityEntity, (university) => university.contact)
  // universities: UniversityEntity[];

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
