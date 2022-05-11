import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

@Entity()
export class Absence {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  from!: string;

  @Column()
  to!: string;

  @Column()
  createdBy!: string;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
