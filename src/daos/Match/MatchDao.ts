/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Picture } from '@entities/Picture';
import { IPicture } from '@interfaces/IPicture';

import { getConnection, getRepository } from 'typeorm';
import { IUser } from '@interfaces/IUser';
import { User } from '@entities/User';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { Match } from '@entities/Match';

export interface IMatchDao {

}

class MatchDao implements IMatchDao {
  public findOneByUsersIds(userId_1: string, userId_2: string): Promise<Match | undefined> {
    console.log(userId_1, userId_2);

    return getConnection()
      .createEntityManager()
      .findOne(Match, {
        where: {
          userId_1,
          userId_2,
        },
      });
  }
}

export default MatchDao;
