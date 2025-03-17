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

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  details: string;

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
