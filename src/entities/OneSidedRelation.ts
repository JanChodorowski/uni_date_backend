import {
  Column, Entity, Index, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from './User';

@Index('one_sided_relation_pk', ['activeSideUserId', 'passiveSideUserId'], {
  unique: true,
})
@Entity('one_sided_relation', { schema: 'public' })
export class OneSidedRelation {
  @Column('character varying', {
    primary: true,
    name: 'active_side_user_id',
    length: 450,
  })
  activeSideUserId: string;

  @Column('character varying', {
    primary: true,
    name: 'passive_side_user_id',
    length: 450,
  })
  passiveSideUserId: string;

  @Column('boolean', { name: 'is_liking' })
  isLiking: boolean;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.oneSidedRelations)
  @JoinColumn([{ name: 'active_side_user_id', referencedColumnName: 'id' }])
  activeSideUser: User;

  @ManyToOne(() => User, (user) => user.oneSidedRelations2)
  @JoinColumn([{ name: 'passive_side_user_id', referencedColumnName: 'id' }])
  passiveSideUser: User;
}
