import UniversityDao, { IUniversityDao } from '@daos/University/UniversityDao';
import UserDao from '@daos/User/UserDao';
import { University } from '@entities/University';
import { UniversityAttendance } from '@entities/UniversityAttendance';
import { User } from '@entities/User';
import { IUniversityAttendance } from '@interfaces/IUniversityAttendance';
import { IUser } from '@interfaces/IUser';
import { IRequest, paramMissingError } from '@shared/constants';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { getConnection, getManager } from 'typeorm';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const universityDao : IUniversityDao = new UniversityDao();
router.get('/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  const newUniversity = new University();
  newUniversity.name = name;
  universityDao
    .add(newUniversity)
    .then((result) => res.status(OK).json({ czyDotarlo: result }));
});

router.post('/add', async (req: Request, res: Response) => {
  const { name } = req.body;
  const newUniversity = new University();
  newUniversity.name = name;
  const example = {
    stringValue: 'TestUser3',
    stringDate: '2017-10-10',
    numberValue: 42,
    dateValue: new Date(),
  };
  const {
    stringValue, numberValue, dateValue, stringDate,
  } = example;
  const newUser = new User();

  newUser.id = stringValue;
  newUser.userName = stringValue;
  newUser.dateOfBirth = stringDate;
  newUser.gender = stringValue;
  newUser.description = stringValue;
  newUser.email = stringValue;
  newUser.passwordHash = stringValue;
  newUser.createdAt = dateValue;
  newUser.popularity = numberValue;
  newUser.activityIntensity = numberValue;
  newUser.localization = numberValue;
  newUser.maxSearchDistanceFilter = numberValue;
  newUser.ageFromFilter = numberValue;
  newUser.ageToFilter = numberValue;
  newUser.genderFilter = numberValue;

  const newUniversityAttendance = new UniversityAttendance();
  newUniversityAttendance.fieldOfStudy = stringValue;
  newUniversityAttendance.isGraduated = false;
  newUniversityAttendance.universityName2 = newUniversity;
  newUniversityAttendance.user = newUser;

  await getConnection().transaction(async (entityManager) => {
    await entityManager.save(newUniversity);
    await entityManager.save(newUser);
    await entityManager.save(newUniversityAttendance);
  });
  res.end();
});

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default router;
