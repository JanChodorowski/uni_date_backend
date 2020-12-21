import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Index("interest_pk", ["interestName"], { unique: true })
@Entity("interest", { schema: "public" })
export class Interest {
  @Column("character varying", {
    primary: true,
    name: "interest_name",
    length: 255,
  })
  interestName: string;

  @OneToMany(() => User, (user) => user.interestFilter)
  users: User[];

  @ManyToMany(() => User, (user) => user.interests)
  @JoinTable({
    name: "user_interest",
    joinColumns: [
      { name: "interest_name", referencedColumnName: "interestName" },
    ],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  users2: User[];
}
