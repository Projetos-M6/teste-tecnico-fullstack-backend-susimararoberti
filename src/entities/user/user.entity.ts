import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
//import { Exclude } from "class-transformer";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  //@Exclude()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  //@OneToMany(() => Contacts, (contacts) => contacts.user, { eager: true })
  //contacts: Contacts[];
}
