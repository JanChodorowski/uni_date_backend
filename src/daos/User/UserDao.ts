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
  findUserDtoById: (id: string) => Promise<any>
  login: (email: string) => Promise<any>
  register: (email: string) => Promise<any>
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
  public findUserDtoById(id: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userDto')
      .where({ id })
      .select(UserDto.allFields)
      .getOne();
  }

  /**
   * @param email
   */
  public login(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userDto')
      .where({ email })
      .select([
        ...UserDto.allFields,
        'userDto.id',
        'userDto.passwordHash',
      ])
      .getOne();
  }

  /**
   * @param email
   */
  public register(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('userDto')
      .where({ email })
      .select([
        'userDto.id',
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
    return Promise.resolve(undefined);
  }
}

export default UserDao;
