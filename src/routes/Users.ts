import {
  Request, Response, Router,
} from 'express';

import UserDao from '@daos/User/UserDao';
import { User } from '@entities/User';

import StatusCodes from 'http-status-codes';
import { getConnection } from 'typeorm';

import { authenticate } from '@middleware/middleware';
import { IUser } from '@interfaces/IUser';
import { UserDto } from '@dto/UserDto';
import { removeUndefinedFields, removeWhiteSpaces } from '@shared/functions';
import * as yup from 'yup';
import { City } from '@entities/City';
import { University } from '@entities/University';
import { Interest } from '@entities/Interest';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const userDao = new UserDao();

router.get('/', authenticate, async (req: Request, res: Response) => {
  const userViewData = await userDao.getUserViewDataByUserId(req?.body?.payload?.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });
  console.log('userViewData', userViewData);
  if (!userViewData) {
    res.sendStatus(BAD_REQUEST).end();
  }

  const userDto = {
    ...userViewData,
    city: userViewData?.cityName?.cityName || '',
    university: userViewData?.universityName?.universityName || '',
    interests: userViewData?.interests && userViewData?.interests.length > 0 && userViewData?.interests.map((interest: any) => interest.interestName) || [],
  };
  console.log('userDto', userDto);
  res.json(userDto).end();
});

router.put('/', authenticate, async (req: Request, res: Response) => {
  const reqUser = req.body.user;
  if (!reqUser.dateOfBirth) {
    reqUser.dateOfBirth = '1970-01-01';
  }
  const schema = yup.object().shape(
    {
      email: yup.string().email(),
      userName: yup.string(),
      gender: yup.string(),
      dateOfBirth: yup.string(),
      description: yup.string(),
      popularity: yup.number(),
      activityIntensity: yup.number(),
      localization: yup.number(),
      maxSearchDistanceFilter: yup.number(),
      ageFromFilter: yup.number(),
      ageToFilter: yup.number(),
      genderFilter: yup.number(),
      isGraduated: yup.bool(),
      fieldOfStudy: yup.string(),
      interests: yup.array(),

    },
  );

  const isValid = await schema.isValid(reqUser);
  console.log('isvalid 5', isValid);
  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const {
    userName,
    gender,
    dateOfBirth,
    description,
    email,
    popularity,
    activityIntensity,
    localization,
    maxSearchDistanceFilter,
    ageFromFilter,
    ageToFilter,
    university,
    city,
    interests,
    isGraduated,
    fieldOfStudy,
  } = reqUser;
  console.log('university', university);
  const updatedUser = new User();
  updatedUser.id = req?.body?.payload?.id;
  updatedUser.userName = userName;
  updatedUser.gender = gender;
  updatedUser.dateOfBirth = dateOfBirth;
  updatedUser.description = description;
  updatedUser.email = email;
  updatedUser.popularity = popularity;
  updatedUser.isGraduated = isGraduated;
  updatedUser.fieldOfStudy = fieldOfStudy;
  updatedUser.activityIntensity = activityIntensity;
  updatedUser.localization = localization;
  updatedUser.maxSearchDistanceFilter = maxSearchDistanceFilter;
  updatedUser.ageFromFilter = ageFromFilter;
  updatedUser.ageToFilter = ageToFilter;

  const newOrUpdatedCity = new City();
  newOrUpdatedCity.cityName = city;
  updatedUser.cityName = city;

  const newOrUpdatedUniversity = new University();
  newOrUpdatedUniversity.universityName = university;
  updatedUser.universityName = university;

  const newOrUpdatedInterests = interests.map((interest: string) => {
    const newInterest = new Interest();
    newInterest.interestName = interest;
    newInterest.users2 = [];
    newInterest.users2.push(updatedUser);
    return newInterest;
  });

  const dbResult = userDao.update(updatedUser, newOrUpdatedCity, newOrUpdatedUniversity, newOrUpdatedInterests);

  if (!dbResult) {
    res.sendStatus(BAD_REQUEST).end();
  }

  res.end();
});

router.delete('/', authenticate, async (req: Request, res: Response) => {
  await userDao.delete(req?.body?.payload?.id);
  res.end();
});

export default router;
