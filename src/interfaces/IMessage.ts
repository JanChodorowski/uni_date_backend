import { Match } from '@entities/Match';

export interface IMessage {
    userId_1: string;
    userId_2: string;
    messageId: string;
    senderUserId: string;
    content: string;
    createdAt: Date;
    match: Match;
}
