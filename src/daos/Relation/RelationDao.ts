/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Picture } from '@entities/Picture';
import { IPicture } from '@interfaces/IPicture';

import { getConnection, getRepository } from 'typeorm';
import { IUser } from '@interfaces/IUser';
import { User } from '@entities/User';
import { OneSidedRelation } from '@entities/OneSidedRelation';

export interface IRelationDao {
  add: (newRelation: OneSidedRelation) => Promise<any>;
  findLikingBackRelation: (
      activeSideUser: string,
      passiveSideUser: string,
  )=> Promise<OneSidedRelation | undefined>

}

class RelationDao implements IRelationDao {
  public async add(newRelation: OneSidedRelation): Promise<OneSidedRelation> {
    return getConnection().manager.save(newRelation);
  }

  public async findLikingBackRelation(
    activeSideUser: string,
    passiveSideUser: string,
  ): Promise<OneSidedRelation | undefined> {
    return await getConnection()
      .createEntityManager()
      .findOne(OneSidedRelation, {
        where: {
          activeSideUser,
          passiveSideUser,
          isLiking: true,
        },
      });
  }

  public async createMatch(foundLikingBackRelation: OneSidedRelation) {
    await getConnection()
      .transaction(async (entityManager) => {
        await entityManager.remove(foundLikingBackRelation);
      });
  }
}

export default RelationDao;
