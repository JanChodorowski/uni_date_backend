import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Index("matched_users_pk", ["userId_1", "userId_2"], { unique: true })
@Entity("matched_users", { schema: "public" })
export class MatchedUsers {
  @Column("character varying", {
    primary: true,
    name: "user_id_1",
    length: 450,
  })
  userId_1: string;

  @Column("character varying", {
    primary: true,
    name: "user_id_2",
    length: 450,
  })
  userId_2: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.matchedUsers)
  @JoinColumn([{ name: "user_id_1", referencedColumnName: "id" }])
  userId: User;

  @ManyToOne(() => User, (user) => user.matchedUsers2)
  @JoinColumn([{ name: "user_id_2", referencedColumnName: "id" }])
  userId_3: User;

  @OneToMany(() => Message, (message) => message.matchedUsers)
  messages: Message[];
}
