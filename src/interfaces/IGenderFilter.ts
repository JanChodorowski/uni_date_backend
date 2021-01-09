import { User } from '@entities/User';

export interface IGenderFilter {
    userId: string;
    genderFilter: string;
    isLiking: boolean;
    user: User;
}
