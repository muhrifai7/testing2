import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { TU_USER } from "../users/User";
import { Permission } from "../permission/Permission";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @OneToMany(() => TU_USER, (user) => user.role) // specify inverse side as a second parameter
  user!: TU_USER;

  @OneToOne(() => Permission, (permission) => permission.role)
  permission!: Permission;
}
