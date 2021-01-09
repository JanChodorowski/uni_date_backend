import { User } from '@entities/User';

export interface IOneSidedRelation {
    activeSideUserId: string;
    passiveSideUserId: string;
    isLiking: boolean;
    createdAt: Date;
    activeSideUser: User;
    passiveSideUser: User;
}
