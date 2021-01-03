/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Picture } from '@entities/Picture';
import { IPicture } from '@interfaces/IPicture';

import { getConnection, getRepository } from 'typeorm';
import { IUser } from '@interfaces/IUser';
import { User } from '@entities/User';

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
}

export default MessageDao;
