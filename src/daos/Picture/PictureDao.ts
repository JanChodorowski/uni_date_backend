/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Picture } from '@entities/Picture';
import { IPicture } from '@interfaces/IPicture';

import { getConnection, getRepository } from 'typeorm';
import { IUser } from '@interfaces/IUser';
import { User } from '@entities/User';

export interface IPictureDao {
    // getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IPicture[]>;
    add: (user: IPicture) => Promise<IPicture>;
    // update: (user: IUser) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

class PictureDao implements IPictureDao {
  /**
     *
     */
  public getAll(): Promise<IPicture[]> {
    // TODO
    // return Promise.resolve([]);
    return getConnection().manager.find(Picture);
  }

  /**
     *
     * @param fileName
     */
  public findBlobByFileName(fileName: string): Promise<any> {
    return getRepository(Picture)
      .createQueryBuilder('picture')
      .where({ fileName })
      .select([
        'picture.blob',
      ])
      .getOne();
  }

  /**
     *
     * @param newPicture
     */
  public async add(newPictureOrPictures: any): Promise<any> {
    return getConnection().manager.save(newPictureOrPictures);
  }

//   /**
//      *
//      * @param id
//      */
//   public async delete(id: number): Promise<void> {
//     // TODO
//     return Promise.resolve(undefined);
//   }
}

export default PictureDao;
