import { User } from '@entities/User';

export interface IPicture {
    fileName: string;
    user: User;
    isAvatar: boolean;
    blob: Buffer;
}
