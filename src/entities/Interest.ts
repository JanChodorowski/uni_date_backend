import { Column, Entity, Index, OneToMany } from "typeorm";
import { User } from "./User";
import { UserInterest } from "./UserInterest";

@Index("interest_pk", ["interestName"], { unique: true })
@Entity("interest", { schema: "public" })
export class Interest {
  @Column("character varying", {
    primary: true,
    name: "interest_name",
    length: 255,
  })
  interestName: string;

  @OneToMany(() => User, (user) => user.interestName)
  users: User[];

  @OneToMany(() => UserInterest, (userInterest) => userInterest.interestName)
  userInterests: UserInterest[];
}
