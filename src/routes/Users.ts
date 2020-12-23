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
import * as yup from 'yup';
import { City } from '@entities/City';
import { University } from '@entities/University';
import { Interest } from '@entities/Interest';
import { capitalizeFirstLetter } from '@shared/functions';

global.Blob = require('node-blob');
const CrossBlob = require('cross-blob');

const streamToBlob = require('stream-to-blob');

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
  if (!userViewData) {
    res.sendStatus(BAD_REQUEST).end();
  }

  const userDto = {
    ...userViewData,
    city: userViewData?.cityName?.cityName || '',
    university: userViewData?.universityName?.universityName || '',
    interests: (userViewData?.interests
        && userViewData?.interests.length > 0
        && userViewData?.interests.map((interest: any) => interest.interestName)) || [],
  };
  delete userDto.cityName;
  delete userDto.universityName;
  res.json(userDto).end();
});

router.get('/profiles', authenticate, async (req: Request, res: Response) => {
  const profilesData = await userDao.findProfiles(req?.body?.payload?.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });
  if (!profilesData) {
    res.sendStatus(BAD_REQUEST).end();
  }
  const profilesDto = profilesData.map((pd: any) => ({
    ...pd,
    city: pd?.cityName?.cityName || '',
    university: pd?.universityName?.universityName || '',
    interests: (pd?.interests
        && pd?.interests.length > 0
        && pd?.interests.map((interest: any) => interest.interestName))
        || [],
  }));

  profilesDto.forEach((pd: any) => { delete pd.cityName; delete pd.universityName; });

  res.json(profilesDto).end();
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

  const updatedUser = new User();
  updatedUser.id = req?.body?.payload?.id;
  updatedUser.userName = capitalizeFirstLetter(userName);
  updatedUser.gender = gender;
  updatedUser.dateOfBirth = dateOfBirth;
  updatedUser.description = description;
  updatedUser.email = email;
  updatedUser.popularity = popularity;
  updatedUser.isGraduated = isGraduated;
  updatedUser.fieldOfStudy = capitalizeFirstLetter(fieldOfStudy);
  updatedUser.activityIntensity = activityIntensity;
  updatedUser.localization = localization;
  updatedUser.maxSearchDistanceFilter = maxSearchDistanceFilter;
  updatedUser.ageFromFilter = ageFromFilter;
  updatedUser.ageToFilter = ageToFilter;

  const newOrUpdatedCity = new City();
  const capitalizedCity = capitalizeFirstLetter(city);
  newOrUpdatedCity.cityName = capitalizedCity;
  updatedUser.cityName = capitalizedCity;

  const newOrUpdatedUniversity = new University();
  const capitalizedUniversity = capitalizeFirstLetter(university);
  newOrUpdatedUniversity.universityName = capitalizedUniversity;
  updatedUser.universityName = capitalizedUniversity;

  const newOrUpdatedInterests = interests.map((interest: string) => {
    const newInterest = new Interest();
    newInterest.interestName = interest;
    newInterest.users2 = [];
    newInterest.users2.push(updatedUser);
    return newInterest;
  });

  const dbResult = userDao.update(
    updatedUser,
    newOrUpdatedCity,
    newOrUpdatedUniversity,
    newOrUpdatedInterests,
  ).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  if (!dbResult) {
    res.sendStatus(BAD_REQUEST).end();
  }

  res.end();
});

router.delete('/', authenticate, async (req: Request, res: Response) => {
  await userDao.delete(req?.body?.payload?.id).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });
  res.end();
});

export default router;
