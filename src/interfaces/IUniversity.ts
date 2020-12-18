import { User } from '@entities/User';

export interface IUniversity {
  universityName: string;
  users: User[];
  users2: User[];
}
