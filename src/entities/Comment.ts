import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Column("integer")
  eventId: number;

  @Column("text")
  name: string;

  @Column("text")
  password: string;

  @Column("text")
  content: string;
}
