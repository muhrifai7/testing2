import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Role } from "../roles/Role"

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    nullable : true,
    default : false as boolean
  })
  canCreate!: boolean;

  @Column({
     nullable : true,
    default : false as boolean
  })
  canUpdate!: boolean;

  @Column({
     nullable : true,
    default : false as boolean
  })
  canDelete!: boolean;

  @Column({
     nullable : true,
    default : false as boolean
  })
  canRead!: boolean;

  @Column({
    nullable : true
  })
  description!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  role_id!: string;
  @OneToOne(() => Role, role => role.permission)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}