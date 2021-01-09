import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Index('match_pk', ['userId_1', 'userId_2'], { unique: true })
@Entity('match', { schema: 'public' })
export class Match {
  @Column('character varying', {
    primary: true,
    name: 'user_id_1',
    length: 450,
  })
  userId_1: string;

  @Column('character varying', {
    primary: true,
    name: 'user_id_2',
    length: 450,
  })
  userId_2: string;

  @Column('boolean', { name: 'is_resigned' })
  isResigned: boolean;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.matches, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id_1', referencedColumnName: 'id' }])
  userId: User;

  @ManyToOne(() => User, (user) => user.matches2, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id_2', referencedColumnName: 'id' }])
  userId_3: User;

  @OneToMany(() => Message, (message) => message.match)
  messages: Message[];
}
