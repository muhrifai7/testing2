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
export class Overtime {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nip!: string;

  @Column()
  overtimeDate!: number;

  @Column()
  description!: string;

  @Column()
  updated_by!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
