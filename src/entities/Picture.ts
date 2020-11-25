import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Index("picture_pk", ["userId"], { unique: true })
@Entity("picture", { schema: "public" })
export class Picture {
  @Column("character varying", { primary: true, name: "user_id", length: 450 })
  userId: string;

  @Column("bytea", { name: "picture" })
  picture: Buffer;

  @Column("integer", { name: "order" })
  order: number;

  @OneToOne(() => User, (user) => user.picture)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
