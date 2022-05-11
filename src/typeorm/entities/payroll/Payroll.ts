import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Salaries } from "../salaries/Salaries";

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  totalPay!: number;

  @Column()
  paidDate!: string;

  @Column()
  created_by!: string;

  @Column({
    nullable: true,
  })
  updated_by!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column({ type: "string", nullable: false })
  salaries_id?: string;
  @ManyToOne(() => Salaries, (salaries) => salaries.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "salaries_id" })
  salaries!: Salaries;
}
