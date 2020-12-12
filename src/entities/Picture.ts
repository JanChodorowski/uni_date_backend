import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("picture_pk", ["fileName"], { unique: true })
@Entity("picture", { schema: "public" })
export class Picture {
  @Column("character varying", {
    primary: true,
    name: "file_name",
    length: 255,
  })
  fileName: string;

  @Column("integer", { name: "order" })
  order: number;

  @Column("boolean", { name: "is_avatar" })
  isAvatar: boolean;

  @ManyToOne(() => User, (user) => user.pictures)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
