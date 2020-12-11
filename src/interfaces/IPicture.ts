import { User } from '@entities/User';

export interface IPicture {
    pictureId: string;
    order: number;
    user: User;
}
