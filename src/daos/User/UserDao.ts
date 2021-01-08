/* eslint-disable no-unused-vars */

import { IUser } from '@interfaces/IUser';
import { getConnection, getRepository } from 'typeorm';
import { University } from '@entities/University';
import { User } from '@entities/User';
import { City } from '@entities/City';
import { Interest } from '@entities/Interest';
import { GenderFilter } from '@entities/GenderFilter';
import { Match } from '@entities/Match';

export interface IUserDao {
  add: (user: IUser) => Promise<IUser>;
  delete: (id: string) => Promise<void>;
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
    findProfiles: (
        id: string,
        cityFilter: string | null,
        universityFilter: string | null,
        interestFilter: string | null,
        genderFilters: any | null,
        ageFromFilter: number,
        ageToFilter: number,
        maxSearchDistanceFilter: number | null,
    ) => Promise<any>
    findMatches: (id: string) => Promise<any>
    deleteMatch: (id :string, passiveSideUserId:string) => Promise<void>

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
    profilesDto = [
      'user.id',
      'user.userName',
      'user.gender',
      'user.description',
      'user.isGraduated',
      'user.fieldOfStudy',
      'user.dateOfBirth',
      'user.latitude',
      'user.longitude',
      'picture.fileName',
      'picture.isAvatar',
      'city.cityName',
      'university.universityName',
      'interests.interestName',
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
          // 'user.latitude',
          // 'user.longitude',
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
    public findMatches(id: string): Promise<any> {
      return getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('user.pictures', 'picture')
        .leftJoin('user.cityName', 'city')
        .leftJoin('user.universityName', 'university')
        .leftJoin('user.interests', 'interests')
        .leftJoin('user.matches2', 'matches2')
        .leftJoin('user.matches', 'matches')
        .where('id != :paramId')
        .andWhere('(matches2.userId = :paramId OR matches.userId_3 = :paramId) AND (matches2.isResigned = false OR matches2.isResigned IS NULL) AND (matches.isResigned = false OR matches.isResigned IS NULL)')
        // .andWhere('matches2.isResigned = \'false\'')
        // .andWhere('matches.isResigned = \'false\'')
        .setParameter('paramId', id)
        .select(this.profilesDto)
        .getMany();
    }

    /**
   * @param id
   * @param cityFilter
   * @param universityFilter
   * @param interestFilter
   * @param genderFilters
   * @param ageFromFilter
   * @param ageToFilter
   * @param maxSearchDistanceFilter
     */
    public findProfiles(
      id: string,
      cityFilter: string | null = null,
      universityFilter: string | null = null,
      interestFilter: string | null = null,
      genderFilters: any | null = null,
      ageFromFilter: number,
      ageToFilter: number,
      maxSearchDistanceFilter: number | null = null,

    ): Promise<any> {
      let genders = null;
      if (genderFilters) {
        genders = Object.keys(genderFilters).filter((key) => genderFilters[key]);
      }
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - ageFromFilter);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - ageToFilter);

      return getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('user.pictures', 'picture')
        .leftJoin('user.cityName', 'city')
        .leftJoin('user.universityName', 'university')
        .leftJoin('user.interests', 'interests')
        .leftJoin('user.oneSidedRelations2', 'oneSidedRelations2')
        .leftJoin('user.oneSidedRelations', 'oneSidedRelations')
        .leftJoin('user.matches2', 'matches2')
        .where('id != :paramId')
        .andWhere(cityFilter ? 'user.cityName = :cityFilter' : '1=1', { cityFilter })
        .andWhere(universityFilter ? 'user.universityName = :universityFilter' : '1=1', { universityFilter })
        .andWhere(interestFilter ? 'interests.interestName = :interestFilter' : '1=1', { interestFilter })
        .andWhere(genders && genders.length !== 3 ? 'user.gender IN (:...genders)' : '1=1', { genders })
        .andWhere(ageFromFilter && ageFromFilter !== 18 ? 'user.dateOfBirth <= :maxDate' : '1=1', { maxDate })
        .andWhere(ageToFilter && ageToFilter !== 100 ? 'user.dateOfBirth >= :minDate' : '1=1', { minDate })
        .andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('u2.id')
            .from(User, 'u2')
            .innerJoin('u2.oneSidedRelations2', 'osr2')
            .where('osr2.activeSideUserId = :paramId')
            .andWhere('osr2.passiveSideUserId = u2.id')
            .getQuery();
          return `(oneSidedRelations2.activeSideUserId is NUll OR user.id NOT IN ${subQuery}) AND user.id != :paramId`;
        })
        .andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('u2.id')
            .from(User, 'u2')
            .innerJoin('u2.matches2', 'osr2')
            .where('osr2.userId = :paramId')
            .andWhere('osr2.userId_3 = u2.id')
            .getQuery();
          return `(matches2.userId is NUll OR user.id NOT IN ${subQuery}) AND user.id != :paramId`;
        })
        .andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('u2.id')
            .from(User, 'u2')
            .innerJoin('u2.matches', 'm')
            .where('(m.userId = :paramId AND m.userId_3 = u2.id) OR (m.userId = u2.id AND m.userId_3 = :paramId)')
            .getQuery();
          return `(user.id NOT IN ${subQuery}) AND user.id != :paramId`;
        })
        .andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('u2.id')
            .from(User, 'u2')
            .innerJoin('u2.matches', 'osr2')
            // .where('osr2.userId = :paramId')
            // .andWhere('osr2.userId_3 = u2.id')
            .where('(osr2.userId = :paramId AND osr2.userId_3 = u2.id) OR (osr2.userId = u2.id AND osr2.userId_3 = :paramId)')
            .getQuery();
          return `(user.id NOT IN ${subQuery}) AND user.id != :paramId`;
        })
        .setParameter('paramId', id)
        .select(this.profilesDto)
        .orderBy('picture.isAvatar')
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

    //
    // public async updateGeo(
    //     latitude: number,
    //     longitude: number,
    // ): Promise<void> {
    //     await getConnection().createEntityManager()
    //
    // }
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
    public async update(
      newOrUpdatedUser: IUser,
      newOrUpdatedCity : City | null = null,
      newOrUpdatedUniversity: University | null = null,
      newOrUpdatedInterests: Interest[] | null = null,
      newOrUpdatedGenderFilters: GenderFilter[] | null = null,
      newOrExistingCity : City | null = null,
      newOrExistingInterest: Interest | null = null,
      newOrExistingUniversity: University | null = null,
    ): Promise<void> {
      await getConnection()
        .transaction(async (entityManager) => {
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
          if (newOrExistingUniversity) {
            await entityManager.save(newOrExistingUniversity);
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
    public async delete(id: string): Promise<void> {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
    }

    /**
     *
     * @param id
     * @param passiveSideUserId
     */
    public async deleteMatch(id :string, passiveSideUserId:string): Promise<void> {
      const matchToRemove : Match | undefined = await getRepository(Match)
        .createQueryBuilder()
        .where('(Match.user_id_1 = :id AND Match.user_id_2 = :passiveSideUserId) OR (Match.user_id_2 = :id AND Match.user_id_1 = :passiveSideUserId)', {
          id,
          passiveSideUserId,
        })
        .getOne();

      if (!matchToRemove) {
        return;
      }

      matchToRemove.isResigned = true;
      await getRepository(Match).save(matchToRemove);
    }
}

export default UserDao;
