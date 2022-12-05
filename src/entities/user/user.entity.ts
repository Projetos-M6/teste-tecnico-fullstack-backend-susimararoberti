import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Contact } from "../contacts/contacts.entity";
import { Exclude } from "class-transformer";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Contact, (contacts) => contacts.user, {
    eager: true,
  })
  contacts: Contact[];
}
