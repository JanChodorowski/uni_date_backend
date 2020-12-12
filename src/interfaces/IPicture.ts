import { User } from '@entities/User';

export interface IPicture {
    fileName: string;
    order: number;
    user: User;
    isAvatar: boolean;
}
