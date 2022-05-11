import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { TU_USER } from "../users/User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
  })
  placeOfBirth!: string;

  @Column({
    nullable: true,
  })
  dateOfBirth!: string;

  @Column({
    nullable: true,
    default: "MALE",
  })
  gender!: string;

  @Column({
    nullable: true,
  })
  religion!: string;

  @Column({
    nullable: true,
  })
  academic!: string;

  @Column({
    nullable: true,
  })
  title!: string;

  @Column({
    nullable: true,
  })
  address!: string;

  @Column({
    nullable: true,
  })
  city!: string;

  @Column({
    nullable: true,
  })
  country!: string;

  @Column({
    nullable: true,
  })
  postalCode!: string;

  @Column({
    nullable: true,
  })
  photo!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column()
  user_id!: number;
  @OneToOne(() => TU_USER, (user) => user.profile)
  @JoinColumn({ name: "user_id" })
  user!: TU_USER;
}
