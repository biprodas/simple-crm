import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('credentials')
export class CredentialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'login_url', nullable: true })
  loginUrl: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  secret: string;

  @Column({ name: 'is_enabled_2fa', nullable: true })
  isEnabled2FA: boolean;

  @Column({ name: 'owner_2fa', nullable: true })
  owner2FA: string;

  @Column({ nullable: true })
  notes: string;

  // assignee

  // projects
  // account

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Credential with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Credential of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Credential`);
  }
}
