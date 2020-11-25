import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { University } from "./University";
import { User } from "./User";

@Index("university_attendance_pk", ["universityName", "userId"], {
  unique: true,
})
@Entity("university_attendance", { schema: "public" })
export class UniversityAttendance {
  @Column("character varying", {
    primary: true,
    name: "university_name",
    length: 255,
  })
  universityName: string;

  @Column("character varying", { primary: true, name: "user_id", length: 450 })
  userId: string;

  @Column("boolean", { name: "is_graduated" })
  isGraduated: boolean;

  @Column("character varying", { name: "field_of_study", length: 255 })
  fieldOfStudy: string;

  @ManyToOne(() => University, (university) => university.universityAttendances)
  @JoinColumn([{ name: "university_name", referencedColumnName: "name" }])
  universityName2: University;

  @ManyToOne(() => User, (user) => user.universityAttendances)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
