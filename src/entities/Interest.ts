import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from './User';

@Index('interest_pk', ['interestId'], { unique: true })
@Entity('interest', { schema: 'public' })
export class Interest {
  @Column('integer', { primary: true, name: 'interest_id' })
  interestId: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.interestIdFilter)
  users: User[];

  @ManyToMany(() => User, (user) => user.interests)
  @JoinTable({
    name: 'user_interest',
    joinColumns: [{ name: 'interest_id', referencedColumnName: 'interestId' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    schema: 'public',
  })
  users2: User[];
}
