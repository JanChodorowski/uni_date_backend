import { Message } from '@entities/Message';
import { User } from '@entities/User';

export interface IMatch {
    userId_1: string;
    userId_2: string;
    isResigned: boolean;
    createdAt: Date;
    userId: User;
    userId_3: User;
    messages: Message[];
}
