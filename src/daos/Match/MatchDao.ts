/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import { getConnection } from 'typeorm';
import { Match } from '@entities/Match';

export interface IMatchDao {
    findOneByUsersIds: (userId_1: string, userId_2: string)=> Promise<Match | undefined>
}

class MatchDao implements IMatchDao {
  /**
     *
     * @param userId_1
     * @param userId_2
     */
  public findOneByUsersIds(userId_1: string, userId_2: string): Promise<Match | undefined> {
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
