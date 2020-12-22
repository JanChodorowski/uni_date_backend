/* eslint-disable no-unused-vars */

import { IUser } from '@interfaces/IUser';
import { IUniversity } from '@interfaces/IUniversity';
import { getConnection, getRepository } from 'typeorm';
import { University } from '@entities/University';
import { User } from '@entities/User';
import { UserDto } from '@dto/UserDto';
import { City } from '@entities/City';
import { Interest } from '@entities/Interest';

export interface IUserDao {
  // getOne: (email: string) => Promise<IUser | null>;
  // getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<IUser>;
  // update: (newUserPart: IUser, id: string, newCity: City, newUniversity: University) => Promise<void>;
  delete: (id: number) => Promise<void>;
  findOneByEmail: (email: string) => Promise<IUser | undefined>;
  findOneById: (id: string) => Promise<IUser | undefined>;
  getUserViewDataByUserId: (id: string) => Promise<any>
  login: (email: string) => Promise<any>
  register: (email: string) => Promise<any>
}

class UserDao implements IUserDao {
  // user = [
  //   'user.userName',
  //   'user.gender',
  //   'user.description',
  //   'user.email',
  //   'user.maxSearchDistanceFilter',
  //   'user.ageFromFilter',
  //   'user.ageToFilter',
  //   'user.isGraduated',
  //   'user.fieldOfStudy',
  //   'picture.fileName',
  //   'picture.isAvatar',
  //   'city.cityName',
  //   'university.universityName',
  //   'interests.interestName',
  // ]

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
  public getUserViewDataByUserId(id: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.pictures', 'picture')
      .leftJoinAndSelect('user.cityName', 'city')
      .leftJoinAndSelect('user.universityName', 'university')
      .leftJoinAndSelect('user.interests', 'interests')
      .where({ id })
      .select([
        'user.userName',
        'user.gender',
        'user.description',
        'user.email',
        'user.maxSearchDistanceFilter',
        'user.ageFromFilter',
        'user.ageToFilter',
        'user.isGraduated',
        'user.fieldOfStudy',
        'user.dateOfBirth',
        'picture.fileName',
        'picture.isAvatar',
        'picture.blob',
        'city.cityName',
        'university.universityName',
        'interests.interestName',
      ])
      .getOne();
  }

  /**
   * @param email
   */
  public login(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user')
      .where({ email })
      .select([
        'user.id',
        'user.passwordHash',
      ])
      .getOne();
  }

  /**
   * @param email
   */
  public register(email: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user')
      .where({ email })
      .select([
        'user.id',
      ])
      .getOne();
  }

  /**
     * @param id
     */
  public findProfiles(id: string): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.pictures', 'picture')
      .leftJoinAndSelect('user.cityName', 'city')
      .leftJoinAndSelect('user.universityName', 'university')
      .leftJoinAndSelect('user.interests', 'interests')
      .where('id != :id', { id })
      .select([
        'user.id',
        'user.userName',
        'user.gender',
        'user.description',
        'user.isGraduated',
        'user.fieldOfStudy',
        'user.dateOfBirth',
        'picture.fileName',
        'picture.isAvatar',
        'city.cityName',
        'university.universityName',
        'interests.interestName',
      ])
      // .limit(2)
      .getMany();
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
   * @param newOrUpdatedUser
   * @param newOrUpdatedCity
   * @param newOrUpdatedUniversity
   * @param newOrUpdatedInterests
   */
  public async update(newOrUpdatedUser: IUser,
    newOrUpdatedCity : City | null = null,
    newOrUpdatedUniversity: University | null = null,
    newOrUpdatedInterests: Interest[] | null = null): Promise<void> {
    await getConnection().transaction(async (entityManager) => {
      if (newOrUpdatedCity) {
        await entityManager.save(newOrUpdatedCity);
      }
      if (newOrUpdatedUniversity) {
        await entityManager.save(newOrUpdatedUniversity);
      }
      if (newOrUpdatedInterests) {
        await entityManager.save(newOrUpdatedInterests);
        newOrUpdatedUser.interests = newOrUpdatedInterests;
      }

      await entityManager.save(newOrUpdatedUser);
    });
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
