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

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  acronym: string;

  @Column({ nullable: true })
  website: string;

  // global=cs
  @Column({ nullable: true })
  ranking: string;

  // other details
  @Column({ nullable: true })
  details: string;
  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Invoice with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Invoice of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Invoice`);
  }
}
