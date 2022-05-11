import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TU_USER } from "../users/User";

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column()
  canCreate!: string;

  @Column()
  canUpdate!: string;

  @Column()
  canRead!: string;

  @Column()
  canDelete!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  user_id!: number;
  @ManyToOne(() => TU_USER, (user) => user.module)
  @JoinColumn({ name: "user_id" })
  user!: TU_USER;

  // @ManyToOne(() => User, user => user.module) // specify inverse side as a second parameter
  // user!: User;
}
