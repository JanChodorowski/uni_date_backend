import {
  Column, Entity, Index, JoinColumn, ManyToOne,
} from 'typeorm';
import { MatchedUsers } from './MatchedUsers';

@Index('message_pk', ['messageId', 'userId_1', 'userId_2'], { unique: true })
@Entity('message', { schema: 'public' })
export class Message {
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

  @Column('integer', { primary: true, name: 'message_id' })
  messageId: number;

  @Column('character varying', { name: 'sender_user_id', length: 450 })
  senderUserId: string;

  @Column('character varying', { name: 'content', length: 255 })
  content: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => MatchedUsers, (matchedUsers) => matchedUsers.messages)
  @JoinColumn([
    { name: 'user_id_1', referencedColumnName: 'userId_1' },
    { name: 'user_id_2', referencedColumnName: 'userId_2' },
  ])
  matchedUsers: MatchedUsers;
}
