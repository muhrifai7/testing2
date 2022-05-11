import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { TU_USER } from "../users/User";

@Entity()
export class EmailBlast {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  subject!: string;

  @Column()
  emailType!: string;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @ManyToOne(() => TU_USER, (user) => user.emailBlast) // specify inverse side as a second parameter
  user!: TU_USER;
}
