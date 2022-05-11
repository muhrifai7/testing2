import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { TU_USER } from "../users/User";
import { Payroll } from "./../payroll/Payroll";

@Entity()
export class Salaries {
  @PrimaryGeneratedColumn()
  id!: string;

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

  @Column({
    nullable: true,
  })
  created_by!: string;

  @Column({
    nullable: true,
  })
  updated_by!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  user_id!: number;
  @OneToOne(() => TU_USER, (user) => user.salaries)
  @JoinColumn({ name: "user_id" })
  user!: TU_USER;

  @OneToMany(() => Payroll, (payroll) => payroll.salaries)
  payroll!: Payroll;
}
