/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { University } from '@entities/University';
import { IUniversity } from '@interfaces';

import { getConnection } from 'typeorm';

export interface IUniversityDao {
    // getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUniversity[]>;
    // add: (user: IUser) => Promise<void>;
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

  //   /**
  //      *
  //      * @param user
  //      */
  //   public async add(user: IUser): Promise<void> {
  //     // TODO
  //     return Promise.resolve(undefined);
  //   }

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
