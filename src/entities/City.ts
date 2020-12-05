import { Column, Entity, Index, OneToMany } from "typeorm";
import { User } from "./User";

@Index("city_pk", ["cityId"], { unique: true })
@Entity("city", { schema: "public" })
export class City {
  @Column("integer", { primary: true, name: "city_id" })
  cityId: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
