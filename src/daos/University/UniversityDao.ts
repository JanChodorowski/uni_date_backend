/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { University } from '@entities/University';
import { IUniversity } from '@interfaces/IUniversity';

import { getConnection } from 'typeorm';

export interface IUniversityDao {
    // getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUniversity[]>;
    add: (user: IUniversity) => Promise<IUniversity>;
    // update: (user: IUser) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

class UniversityDao implements IUniversityDao {
  /**
     * @param name
     */
  //   public getOne(email: string): Promise<IUser | null> {
  //     // TODO
  //     return Promise.resolve(null);
  //   }

  /**
     *
     */
  public getAll(): Promise<IUniversity[]> {
    // TODO
    // return Promise.resolve([]);
    return getConnection().manager.find(University);
  }

  /**
       *
       * @param newUniversity
       */
  public async add(newUniversity: IUniversity): Promise<IUniversity> {
    return getConnection().manager.save(newUniversity);
  }

  //   /**
  //      *
  //      * @param user
  //      */
  //   public async update(user: IUser): Promise<void> {
  //     // TODO
  //     return Promise.resolve(undefined);
  //   }

//   /**
//      *
//      * @param id
//      */
//   public async delete(id: number): Promise<void> {
//     // TODO
//     return Promise.resolve(undefined);
//   }
}

export default UniversityDao;
