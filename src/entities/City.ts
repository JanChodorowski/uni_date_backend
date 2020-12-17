import { Column, Entity, Index, OneToMany } from "typeorm";
import { User } from "./User";

@Index("city_pk", ["cityName"], { unique: true })
@Entity("city", { schema: "public" })
export class City {
  @Column("character varying", {
    primary: true,
    name: "city_name",
    length: 255,
  })
  cityName: string;

  @OneToMany(() => User, (user) => user.cityName)
  users: User[];
}
