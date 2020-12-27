/* eslint-disable no-unused-vars */

import { IUser } from '@interfaces/IUser';
import { IUniversity } from '@interfaces/IUniversity';
import { getConnection, getRepository } from 'typeorm';
import { University } from '@entities/University';
import { User } from '@entities/User';
import { UserDto } from '@dto/UserDto';
import { City } from '@entities/City';
import { Interest } from '@entities/Interest';
import { GenderFilter } from '@entities/GenderFilter';

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
  register: (email: string) => Promise<any>;
  update: (newOrUpdatedUser: IUser,
             newOrUpdatedCity : City | null,
             newOrUpdatedUniversity: University | null,
             newOrUpdatedInterests: Interest[] | null,
             newOrUpdatedGenderFilters: GenderFilter[] | null,
             newOrExistingCity : City | null,
             newOrExistingInterest: Interest | null,
             newOrExistingUniversity: University | null
  ) => Promise<void>
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
      .leftJoinAndSelect('user.universityFilter', 'universityFilter')
      .leftJoinAndSelect('user.interestFilter', 'interestFilter')
      .leftJoinAndSelect('user.cityFilter', 'cityFilter')
      .leftJoinAndSelect('user.interests', 'interests')
      .leftJoinAndSelect('user.genderFilters', 'genderFilters')
      .where({ id })
      .select([
        'user.userName',
        'user.gender',
        'user.description',
        'user.email',
        'user.maxSearchDistanceFilter',
        'user.ageFromFilter',
        'user.ageToFilter',
        'universityFilter.universityName',
        'cityFilter.cityName',
        'interestFilter.interestName',
        'user.isGraduated',
        'user.fieldOfStudy',
        'user.dateOfBirth',
        'genderFilters.genderFilter',
        'genderFilters.isLiking',
        'picture.fileName',
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
  public findProfiles(id: string, cityFilter: string | null = null): Promise<any> {
    console.log('cityFilter', cityFilter);
    return getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.pictures', 'picture')
      .leftJoinAndSelect('user.cityName', 'city')
      .leftJoinAndSelect('user.universityName', 'university')
      .leftJoinAndSelect('user.interests', 'interests')
      .where('id != :id', { id })
      .andWhere(cityFilter ? 'user.cityName = :cityFilter' : '1=1', { cityFilter })
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
   * @param newOrUpdatedGenderFilters
   * @param newOrExistingCity
   * @param newOrExistingInterest
   * @param newOrExistingUniversity
   */
  public async update(newOrUpdatedUser: IUser,
    newOrUpdatedCity : City | null = null,
    newOrUpdatedUniversity: University | null = null,
    newOrUpdatedInterests: Interest[] | null = null,
    newOrUpdatedGenderFilters: GenderFilter[] | null = null,
    newOrExistingCity : City | null = null,
    newOrExistingInterest: Interest | null = null,
    newOrExistingUniversity: University | null = null): Promise<void> {
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
      if (newOrUpdatedGenderFilters) {
        await entityManager.save(newOrUpdatedGenderFilters);
        newOrUpdatedUser.genderFilters = newOrUpdatedGenderFilters;
      }
      if (newOrExistingCity) {
        await entityManager.save(newOrExistingCity);
      }
      if (newOrExistingInterest) {
        await entityManager.save(newOrExistingInterest);
      }
      if (newOrExistingUniversity) {
        await entityManager.save(newOrExistingUniversity);
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
