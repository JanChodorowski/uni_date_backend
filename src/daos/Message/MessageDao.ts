/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import {IPicture} from '@interfaces/IPicture';

import {getConnection} from 'typeorm';
import {Message} from '@entities/Message';

export interface IMessageDao {

    add: (user: IPicture) => Promise<IPicture>;

}

class MessageDao implements IMessageDao {
  /**
     *
     * @param newMessage
     */
  public add(newMessage: any): Promise<any> {
    return getConnection().manager.save(newMessage);
  }

  public get(userId_1: string, userId_2: string): Promise<any> {
    return getConnection()
      .createQueryBuilder()
      .from(Message, 'm')
      .where('(m.userId_1 = :paramUserId_1 AND m.userId_2 = :paramUserId_2) OR (m.userId_1 = :paramUserId_2 AND m.userId_2 = :paramUserId_1)')
      .setParameters({ paramUserId_1: userId_1, paramUserId_2: userId_2 })
      .getRawMany();
  }
}

export default MessageDao;
