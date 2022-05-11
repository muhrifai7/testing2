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
export class Info {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  imageUrl!: string;

  @Column()
  content!: string;

  @Column()
  createdBy!: string;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
