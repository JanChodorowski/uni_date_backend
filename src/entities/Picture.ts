import {
  Column, Entity, Index, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from './User';

@Index('picture_pk', ['pictureId'], { unique: true })
@Entity('picture', { schema: 'public' })
export class Picture {
  @Column('character varying', {
    primary: true,
    name: 'picture_id',
    length: 255,
  })
  pictureId: string;

  @Column('integer', { name: 'order' })
  order: number;

  @ManyToOne(() => User, (user) => user.pictures)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
