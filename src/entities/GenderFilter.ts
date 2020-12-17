import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("gender_filter_pk", ["genderFilter", "userId"], { unique: true })
@Entity("gender_filter", { schema: "public" })
export class GenderFilter {
  @Column("character varying", {
    primary: true,
    name: "gender_filter",
    length: 255,
  })
  genderFilter: string;

  @Column("character varying", { primary: true, name: "user_id", length: 450 })
  userId: string;

  @ManyToOne(() => User, (user) => user.genderFilters)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
