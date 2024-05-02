import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // PARKING_CODE

  @Column("text")
  name: string; // PARKING_NAME

  @Column("text")
  address: string; // ADDR

  @Column("text")
  rule: string; // OPERATION_RULE_NM

  @Column("decimal")
  latitude: string; // LAT

  @Column("decimal")
  longitude: string; // LNG
}
