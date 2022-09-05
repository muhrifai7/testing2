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
import { TU_USER } from "../users/User";

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    nullable: true,
  })
  totalPay!: number;

  @Column({
    nullable: true,
  })
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

  @Column({
    nullable: true,
  })
  basicSalaries!: number;

  @Column({
    nullable: true,
  })
  totalSalaries!: number;

  @Column({
    nullable: true,
  })
  overtime!: number;

  @Column({
    nullable: true,
  })
  professionalAllowance!: number;

  @Column({
    nullable: true,
  })
  healthAllowance!: number;

  // tunjangan makan
  @Column({
    nullable: true,
  })
  mealAllowance!: number;

  // tunjangan jabaan
  @Column({
    nullable: true,
  })
  positionalAllowance!: number;

  @Column({
    nullable: true,
  })
  transportationAllowance!: number;

  @Column({
    nullable: true,
  })
  operatorAllowance!: number;

  @Column({
    nullable: true,
  })
  healthSubsidyBpjs!: number;

  @Column({
    nullable: true,
  })
  taktisAllowance!: number;

  @Column({
    nullable: true,
  })
  performanceAllowance!: number;

  @Column({
    nullable: true,
  })
  serviceAllowance!: number;

  // potongan pph 21
  @Column({
    nullable: true,
  })
  pphDeduction!: number;
  // subsidi pph 21
  @Column({
    nullable: true,
  })
  pphAllowance!: number;

  @Column({
    nullable: true,
  })
  bpjsAllowance!: number;

  // potongan pinjaman
  @Column({
    nullable: true,
  })
  loanDeduction!: number;

  // add 2022-07-05 potongan
  @Column({
    nullable: true,
  })
  bpjsDeduction!: number;

  @Column({
    nullable: true,
  })
  deductionJkn!: number;

  @Column({
    nullable: true,
  })
  deductionJk!: number;

  @Column({
    nullable: true,
  })
  deductionJht!: number;

  @Column({
    nullable: true,
  })
  deductionJht1!: number;

  @Column({
    nullable: true,
  })
  deductionPension!: number;

  @Column({
    nullable: true,
  })
  deductionPension1!: number;

  @Column({
    nullable: true,
  })
  prefix1!: number;

  @Column({ type: "string", nullable: false })
  salaries_id?: string;
  @ManyToOne(() => Salaries, (salaries) => salaries.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "salaries_id" })
  salaries!: Salaries;

  @Column()
  user_id!: number;
  @ManyToOne(() => TU_USER, (user) => user.payroll)
  @JoinColumn({ name: "user_id" })
  user!: TU_USER;
}
