import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Event extends BaseEntity {
  @PrimaryColumn({
    type: "integer",
    generated: false,
  })
  id: number; // url (hmpg_addr) cultcode

  @Column("text")
  title: string; // title

  @Column("text")
  category: string; // codename

  @Column("text")
  organization: string; // org_name

  @Column("text", { nullable: true })
  price?: string; // use_fee

  @Column("boolean")
  isFree: boolean; // is_free

  @Column("text")
  image: string; // main_img

  @Column("date")
  start: Date; // strtdate

  @Column("date")
  end: Date; // end_date

  @Column("decimal")
  latitude: string; // lat

  @Column("decimal")
  longitude: string; // lot

  @Column("text")
  target: string; // use_trgt

  @Column("text")
  place: string; // place

  @Column("text")
  url: string; // hmpg_addr
}
