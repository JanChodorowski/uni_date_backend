/* eslint-disable no-unused-vars */

import { IUser } from '@interfaces/IUser';
import { IUniversity } from '@interfaces/IUniversity';
import { getConnection } from 'typeorm';
import { University } from '@entities/University';
import { User } from '@entities/User';

export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<IUser>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
    findOneByEmail: (email: string) => Promise<IUser | undefined>;
}

class UserDao implements IUserDao {
  /**
     * @param email
     */
  public findOneByEmail(email: string): Promise<IUser | undefined> {
    return getConnection()
      .createEntityManager()
      .findOne(User, { where: { email } });
  }

  /**
     * @param email
     */
  public getOne(email: string): Promise<IUser | null> {
    // TODO
    return Promise.resolve(null);
  }

  /**
     *
     */
  public getAll(): Promise<IUser[]> {
    // TODO
    return Promise.resolve([]);
  }

  /**
     *
     * @param user
     */
  public async add(user: IUser): Promise<IUser> {
    return getConnection()
      .createEntityManager()
      .save(user);
  }

  /**
     *
     * @param user
     */
  public async update(user: IUser): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
     *
     * @param id
     */
  public async delete(id: number): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }
}

export default UserDao;
