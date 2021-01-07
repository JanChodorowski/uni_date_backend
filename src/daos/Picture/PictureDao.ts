/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Picture } from '@entities/Picture';
import { IPicture } from '@interfaces/IPicture';

import { getConnection, getRepository } from 'typeorm';
import { User } from '@entities/User';

export interface IPictureDao {
    getAll: () => Promise<IPicture[]>;
    add: (user: IPicture) => Promise<IPicture>;
    chooseAvatar: (userId: string, trimmedFileName: string) => Promise<any>;
    findBlobByFileName:(fileName: string)=> Promise<any>
    delete: (fileName: string)=> Promise<void>
}

class PictureDao implements IPictureDao {
  /**
     *
     */
  public getAll(): Promise<IPicture[]> {
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
  public add(newPictureOrPictures: any): Promise<any> {
    return getConnection().manager.save(newPictureOrPictures);
  }

  /**
   *
   * @param userId
   * @param trimmedFileName
   */
  public async chooseAvatar(userId: string, trimmedFileName: string): Promise<any> {
    return getConnection().transaction(async (entityManager) => {
      await entityManager
        .createQueryBuilder()
        .update(Picture)
        .set(
          { isAvatar: false },
        )
        .where('fileName != :fileName', { fileName: trimmedFileName })
        .andWhere('user.id = :id', { id: userId })
        .execute();

      await entityManager
        .createQueryBuilder()
        .update(Picture)
        .set(
          { isAvatar: true },
        )
        .where('fileName = :fileName', { fileName: trimmedFileName })
        .andWhere('user.id = :id', { id: userId })

        .execute();
    });
  }

  /**
   *
   * @param fileName
   */
  public async delete(fileName: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Picture)
      .where('fileName = :fileName', { fileName })
      .execute();
  }
}

export default PictureDao;
