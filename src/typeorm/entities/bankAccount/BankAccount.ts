import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { TU_USER } from "../users/User";

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nik!: string;

  @Column()
  description!: string;

  @Column()
  accountNumber!: string;

  @Column()
  createdBy!: string;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
