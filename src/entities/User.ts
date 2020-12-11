import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MatchedUsers } from "./MatchedUsers";
import { OneSidedRelation } from "./OneSidedRelation";
import { Picture } from "./Picture";
import { UniversityAttendance } from "./UniversityAttendance";
import { City } from "./City";
import { Interest } from "./Interest";
import { University } from "./University";

@Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("character varying", { primary: true, name: "id", length: 450 })
  id: string;

  @Column("character varying", { name: "user_name", length: 450 })
  userName: string;

  @Column("integer", { name: "gender" })
  gender: number;

  @Column("date", { name: "date_of_birth" })
  dateOfBirth: string;

  @Column("character varying", { name: "description", length: 255 })
  description: string;

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("integer", { name: "popularity" })
  popularity: number;

  @Column("integer", { name: "activity_intensity" })
  activityIntensity: number;

  @Column("integer", { name: "localization" })
  localization: number;

  @Column("integer", { name: "max_search_distance_filter" })
  maxSearchDistanceFilter: number;

  @Column("integer", { name: "age_from_filter" })
  ageFromFilter: number;

  @Column("integer", { name: "age_to_filter" })
  ageToFilter: number;

  @Column("integer", { name: "gender_filter" })
  genderFilter: number;

  @OneToMany(() => MatchedUsers, (matchedUsers) => matchedUsers.userId)
  matchedUsers: MatchedUsers[];

  @OneToMany(() => MatchedUsers, (matchedUsers) => matchedUsers.userId_3)
  matchedUsers2: MatchedUsers[];

  @OneToMany(
      () => OneSidedRelation,
      (oneSidedRelation) => oneSidedRelation.activeSideUser
  )
  oneSidedRelations: OneSidedRelation[];

  @OneToMany(
      () => OneSidedRelation,
      (oneSidedRelation) => oneSidedRelation.passiveSideUser
  )
  oneSidedRelations2: OneSidedRelation[];

  @OneToMany(() => Picture, (picture) => picture.user)
  pictures: Picture[];

  @OneToMany(
      () => UniversityAttendance,
      (universityAttendance) => universityAttendance.user
  )
  universityAttendances: UniversityAttendance[];

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn([{ name: "city_id", referencedColumnName: "cityId" }])
  city: City;

  @ManyToOne(() => Interest, (interest) => interest.users)
  @JoinColumn([
    { name: "interest_id_filter", referencedColumnName: "interestId" },
  ])
  interestIdFilter: Interest;

  @ManyToOne(() => University, (university) => university.users)
  @JoinColumn([{ name: "university_id_filter", referencedColumnName: "name" }])
  universityIdFilter: University;

  @ManyToMany(() => Interest, (interest) => interest.users2)
  interests: Interest[];
}
