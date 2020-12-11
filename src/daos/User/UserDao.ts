/* eslint-disable no-unused-vars */

import { IUser } from '@interfaces/IUser';
import { IUniversity } from '@interfaces/IUniversity';
import { getConnection, getRepository } from 'typeorm';
import { University } from '@entities/University';
import { User } from '@entities/User';
import { UserDto } from '@dto/UserDto';

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
  findOneByEmail: (email: string) => Promise<IUser | undefined>;
  findOneById: (id: string) => Promise<IUser | undefined>;
  findUserViewDataByUserId: (id: string) => Promise<any>
  login: (email: string) => Promise<any>
  register: (email: string) => Promise<any>
}

class UserDao implements IUserDao {
  userViewData = [
    'userViewData.userName',
    'userViewData.gender',
    'userViewData.description',
    'userViewData.email',
    'userViewData.maxSearchDistanceFilter',
    'userViewData.ageFromFilter',
    'userViewData.ageToFilter',
    'userViewData.genderFilter',
  ]

  /**
     * @param email
     */
  public findOneByEmail(email: string): Promise<IUser | undefined> {
    return getConnection()
      .createEntityManager()
      .findOne(User, { where: { email } });
  }

  /**
   * @param id
   */
  public findOneById(id: string): Promise<IUser | undefined> {
    return getConnection()
      .createEntityManager()
      .findOne(User, { where: { id } });
  }

  /**
   * @param id
   */
  public findUserViewDataByUserId(id: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userViewData')
      .leftJoinAndSelect('userViewData.pictures', 'photo')
      .where({ id })
      .select(this.userViewData)
      .getOne();
  }

  /**
   * @param email
   */
  public login(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userViewData')
      .where({ email })
      .select([
        ...this.userViewData,
        'userViewData.id',
        'userViewData.passwordHash',
      ])
      .getOne();
  }

  /**
   * @param email
   */
  public register(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userViewData')
      .where({ email })
      .select([
        'userViewData.id',
      ])
      .getOne();
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
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}

export default UserDao;
