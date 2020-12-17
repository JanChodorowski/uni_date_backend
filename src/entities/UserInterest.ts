import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Interest } from "./Interest";
import { User } from "./User";

@Index("user_interest_pk", ["userId"], { unique: true })
@Entity("user_interest", { schema: "public" })
export class UserInterest {
  @Column("character varying", { primary: true, name: "user_id", length: 450 })
  userId: string;

  @ManyToOne(() => Interest, (interest) => interest.userInterests)
  @JoinColumn([{ name: "interest_name", referencedColumnName: "interestName" }])
  interestName: Interest;

  @OneToOne(() => User, (user) => user.userInterest)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
