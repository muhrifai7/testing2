import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Role } from "../roles/Role";
import { Profile } from "../profile/Profile";
import { Department } from "../department/Department";
import { Modules } from "../modules/Modules";
// import { EmailBlast } from "../emailBlast/EmailBlast";
import { Attendance } from "./../attendance/Attendance";
import { Payroll } from "./../payroll/Payroll";
import { RoleType, Language } from "./userTypes";
import { Salaries } from "../salaries/Salaries";
import { UserTax } from "../userTax/UserTax";
import { Profesion } from "../profesion/Profesion";

@Entity()
export class TU_USER {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  basicSalary!: string;

  @Column()
  password!: string;

  @Column({
    default: true as boolean,
  })
  isActive!: boolean;

  @Column({
    nullable: true,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: true,
  })
  account_number!: string;

  @Column()
  @UpdateDateColumn()
  join_date!: Date;

  @Column({
    nullable: true,
    unique: true,
  })
  nik!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  nip!: string;

  @Column({
    default: "STANDARD" as RoleType,
  })
  role_name!: string;

  @Column({
    default: "en-US" as Language,
    length: 15,
  })
  language!: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  profile!: Profile;

  @OneToOne(() => Salaries, (salaries) => salaries.user)
  salaries!: Salaries;

  @OneToOne(() => UserTax, (userTax) => userTax.user)
  userTax!: UserTax;

  @Column({ type: "string", nullable: true })
  role_id?: string;
  @ManyToOne(() => Role, (role) => role.user) // specify inverse side as a second parameter
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @Column({ type: "number", nullable: true })
  department_id?: number;
  @ManyToOne(() => Department, (department) => department.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "department_id" })
  department!: Department;

  @Column({ type: "number", nullable: true })
  @ManyToOne(() => Profesion, (profesion) => profesion.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profesion_id" })
  profesion_id!: Profesion;

  @OneToMany(() => Modules, (module) => module.user)
  module!: Modules[];

  @OneToMany(() => Payroll, (payroll) => payroll.user)
  payroll!: Payroll[];

  // @OneToMany(() => EmailBlast, (email) => email.user)
  // emailBlast!: EmailBlast[];

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendance!: Attendance;

  setLanguage(language: Language) {
    this.language = language;
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
