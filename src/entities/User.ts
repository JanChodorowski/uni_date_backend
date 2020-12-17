import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { GenderFilter } from "./GenderFilter";
import { MatchedUsers } from "./MatchedUsers";
import { OneSidedRelation } from "./OneSidedRelation";
import { Picture } from "./Picture";
import { City } from "./City";
import { Interest } from "./Interest";
import { University } from "./University";
import { UserInterest } from "./UserInterest";

@Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("character varying", { primary: true, name: "id", length: 450 })
  id: string;

  @Column("character varying", { name: "user_name", length: 450 })
  userName: string;

  @Column("character varying", { name: "gender", length: 255 })
  gender: string;

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

  @Column("boolean", { name: "is_graduated" })
  isGraduated: boolean;

  @Column("character varying", { name: "field_of_study", length: 255 })
  fieldOfStudy: string;

  @Column("integer", { name: "max_search_distance_filter" })
  maxSearchDistanceFilter: number;

  @Column("integer", { name: "age_from_filter" })
  ageFromFilter: number;

  @Column("integer", { name: "age_to_filter" })
  ageToFilter: number;

  @OneToMany(() => GenderFilter, (genderFilter) => genderFilter.user)
  genderFilters: GenderFilter[];

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

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn([{ name: "city_name", referencedColumnName: "cityName" }])
  cityName: City;

  @ManyToOne(() => Interest, (interest) => interest.users)
  @JoinColumn([{ name: "interest_name", referencedColumnName: "interestName" }])
  interestName: Interest;

  @ManyToOne(() => University, (university) => university.users)
  @JoinColumn([
    { name: "university_filter", referencedColumnName: "universityName" },
  ])
  universityFilter: University;

  @OneToOne(() => UserInterest, (userInterest) => userInterest.user)
  userInterest: UserInterest;
}
