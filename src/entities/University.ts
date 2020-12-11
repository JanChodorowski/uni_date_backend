import { Column, Entity, Index, OneToMany } from "typeorm";
import { UniversityAttendance } from "./UniversityAttendance";
import { User } from "./User";

@Index("university_pk", ["name"], { unique: true })
@Entity("university", { schema: "public" })
export class University {
  @Column("character varying", { primary: true, name: "name", length: 255 })
  name: string;

  @OneToMany(
    () => UniversityAttendance,
    (universityAttendance) => universityAttendance.universityName2
  )
  universityAttendances: UniversityAttendance[];

  @OneToMany(() => User, (user) => user.universityIdFilter)
  users: User[];
}
