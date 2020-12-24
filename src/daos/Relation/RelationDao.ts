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

}

class RelationDao implements IRelationDao {
  public async add(newRelation: OneSidedRelation): Promise<OneSidedRelation> {
    return getConnection().manager.save(newRelation);
  }
}

export default RelationDao;
