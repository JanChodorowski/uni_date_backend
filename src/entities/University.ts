import {
  Column, Entity, Index, OneToMany,
} from 'typeorm';
import { User } from './User';

@Index('university_pk', ['universityName'], { unique: true })
@Entity('university', { schema: 'public' })
export class University {
  @Column('character varying', {
    primary: true,
    name: 'university_name',
    length: 255,
  })
  universityName: string;

  @OneToMany(() => User, (user) => user.universityFilter)
  users: User[];

  @OneToMany(() => User, (user) => user.universityName)
  users2: User[];
}
