/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import { getConnection } from 'typeorm';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { Match } from '@entities/Match';
import { Message } from '@entities/Message';

export interface IRelationDao {
  add: (newRelation: OneSidedRelation) => Promise<any>;
  findLikingBackRelation: (
      activeSideUser: string,
      passiveSideUser: string,
  )=> Promise<OneSidedRelation | undefined>
  createMatch: (foundLikingBackRelation: OneSidedRelation, newMatch: Match) => Promise<any>

}

class RelationDao implements IRelationDao {
  /**
   * @param newRelation
   */
  public async add(newRelation: OneSidedRelation): Promise<OneSidedRelation> {
    return getConnection().manager.save(newRelation);
  }

  /**
   * @param activeSideUserId
   * @param passiveSideUserId
   */
  public async findLikingBackRelation(
    activeSideUserId: string,
    passiveSideUserId: string,
  ): Promise<OneSidedRelation | undefined> {
    return await getConnection()
      .createEntityManager()
      .findOne(OneSidedRelation, {
        where: {
          activeSideUserId,
          passiveSideUserId,
          isLiking: true,
        },
      });
    // getConnection()
    //     .createQueryBuilder()
    //     .from(OneSidedRelation, 'osr')
    //     .where('(osr.activeSideUserId = :paramUserId_1 AND osr.passiveSideUserId = :paramUserId_2 AND ) OR (osr.activeSideUserId = :paramUserId_2 AND osr.passiveSideUserId = :paramUserId_1)')
    //     .setParameters({ paramUserId_1: activeSideUserId, paramUserId_2: passiveSideUserId })
    //     .getRawMany();
  }

  /**
   * @param foundLikingBackRelation
   */
  public async createMatch(foundLikingBackRelation: OneSidedRelation, newMatch: Match) : Promise<any> {
    await getConnection()
      .transaction(async (entityManager) => {
        await entityManager.remove(foundLikingBackRelation);
        await entityManager.save(newMatch);
      });
  }
}

export default RelationDao;
