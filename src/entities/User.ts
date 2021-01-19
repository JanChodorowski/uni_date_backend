import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GenderFilter } from './GenderFilter';
import { Match } from './Match';
import { OneSidedRelation } from './OneSidedRelation';
import { Picture } from './Picture';
import { City } from './City';
import { Interest } from './Interest';
import { University } from './University';

@Index('user_pk', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @Column('character varying', { primary: true, name: 'id', length: 450 })
  id: string;

  @Column('date', { name: 'date_of_birth', nullable: true })
  dateOfBirth: string | null;

  @Column('real', { name: 'latitude', nullable: true, precision: 24 })
  latitude: number | null;

  @Column('real', { name: 'longitude', nullable: true, precision: 24 })
  longitude: number | null;

  @Column('character varying', { name: 'user_name', length: 450 })
  userName: string;

  @Column('character varying', { name: 'gender', length: 255 })
  gender: string;

  @Column('character varying', { name: 'description', length: 255 })
  description: string;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('character varying', { name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('boolean', { name: 'is_graduated' })
  isGraduated: boolean;

  @Column('character varying', { name: 'field_of_study', length: 255 })
  fieldOfStudy: string;

  @Column('integer', { name: 'age_from_filter' })
  ageFromFilter: number;

  @Column('integer', { name: 'age_to_filter' })
  ageToFilter: number;

  @Column('integer', { name: 'max_search_distance_filter' })
  maxSearchDistanceFilter: number;

  @OneToMany(() => GenderFilter, (genderFilter) => genderFilter.user)
  genderFilters: GenderFilter[];

  @OneToMany(() => Match, (match) => match.userId)
  matches: Match[];

  @OneToMany(() => Match, (match) => match.userId_3)
  matches2: Match[];

  @OneToMany(
    () => OneSidedRelation,
    (oneSidedRelation) => oneSidedRelation.activeSideUser,
  )
  oneSidedRelations: OneSidedRelation[];

  @OneToMany(
    () => OneSidedRelation,
    (oneSidedRelation) => oneSidedRelation.passiveSideUser,
  )
  oneSidedRelations2: OneSidedRelation[];

  @OneToMany(() => Picture, (picture) => picture.user)
  pictures: Picture[];

  @ManyToOne(() => City, (city) => city.users, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'city_filter', referencedColumnName: 'cityName' }])
  cityFilter: City | null;

  @ManyToOne(() => City, (city) => city.users2, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'city_name', referencedColumnName: 'cityName' }])
  cityName: City | null;

  @ManyToOne(() => Interest, (interest) => interest.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([
    { name: 'interest_filter', referencedColumnName: 'interestName' },
  ])
  interestFilter: Interest | null;

  @ManyToOne(() => University, (university) => university.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([
    { name: 'university_filter', referencedColumnName: 'universityName' },
  ])
  universityFilter: University | null;

  @ManyToOne(() => University, (university) => university.users2, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([
    { name: 'university_name', referencedColumnName: 'universityName' },
  ])
  universityName: University | null;

  @ManyToMany(() => Interest, (interest) => interest.users2, { cascade: true })
  interests: Interest[];
}
