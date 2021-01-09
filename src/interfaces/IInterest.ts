import { User } from '@entities/User';

export interface IInterest {
    interestName: string;
    users: User[];
    users2: User[];
}
