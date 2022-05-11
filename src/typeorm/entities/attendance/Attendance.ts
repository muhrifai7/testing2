import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import moment from "moment";

import { TU_USER } from "../users/User";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    nullable: true,
  })
  title!: string;

  @Column({
    nullable: true,
  })
  timeOfEntry!: string;

  @Column({
    nullable: true,
  })
  timeOfOut!: string;

  @Column({
    nullable: true,
  })
  totalWorkingDays!: string;

  @Column({
    nullable: true,
  })
  created_by!: string;

  @Column({
    nullable: true,
  })
  updated_by!: string;

  @CreateDateColumn({
    default: moment(new Date()).format("YYYY-MM-DD"),
  })
  created_at!: string;

  @UpdateDateColumn({
    default: moment(new Date()).format("YYYY-MM-DD"),
  })
  updated_at!: string;

  @Column()
  user_id!: string;
  @ManyToOne(() => TU_USER, (user) => user.attendance)
  @JoinColumn({ name: "user_id" })
  user!: TU_USER;
}
