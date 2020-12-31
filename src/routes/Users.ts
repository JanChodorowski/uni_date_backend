import {
  Request, Response, Router,
} from 'express';

import UserDao from '@daos/User/UserDao';
import { User } from '@entities/User';

import StatusCodes from 'http-status-codes';
import { getConnection, getRepository } from 'typeorm';

import { authenticate } from '@middleware/middleware';
import { IUser } from '@interfaces/IUser';
import { UserDto } from '@dto/UserDto';
import * as yup from 'yup';
import { City } from '@entities/City';
import { University } from '@entities/University';
import { Interest } from '@entities/Interest';
import { capitalizeFirstLetter } from '@shared/functions';
import { GenderFilter } from '@entities/GenderFilter';

global.Blob = require('node-blob');
const CrossBlob = require('cross-blob');

const streamToBlob = require('stream-to-blob');

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const userDao = new UserDao();

const filterValidation = {
  maxSearchDistanceFilter: yup.number(),
  genderFilter: yup.number(),
  universityFilter: yup.string(),
  interestFilter: yup.string(),
  cityFilter: yup.string(),
  genderFilters: yup.object(),
  yearsFilter: yup.array(),
};

router.post('/', authenticate, async (req: Request, res: Response) => {
  const userViewData = await userDao.getUserViewDataByUserId(req?.body?.payload?.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!userViewData) {
    res.sendStatus(BAD_REQUEST).end();
  }

  const initGenderFilter = {
    Female: true,
    Male: true,
    Other: true,
  };

  const getGenderFilters = () => {
    if (!(
      userViewData
        && userViewData.genderFilters
        && Array.isArray(userViewData.genderFilters)
        && userViewData.genderFilters.length === 3
        && userViewData?.genderFilters[0].genderFilter)) {
      return initGenderFilter;
    }

    return {
      [userViewData?.genderFilters[0].genderFilter]: userViewData?.genderFilters[0].isLiking,
      [userViewData?.genderFilters[1].genderFilter]: userViewData?.genderFilters[1].isLiking,
      [userViewData?.genderFilters[2].genderFilter]: userViewData?.genderFilters[2].isLiking,
    };
  };

  const userDto = {
    ...userViewData,
    city: userViewData?.cityName?.cityName || '',
    cityFilter: userViewData?.cityFilter?.cityName || '',
    university: userViewData?.universityName?.universityName || '',
    universityFilter: userViewData?.universityFilter?.universityName || '',
    interestFilter: userViewData?.interestFilter?.interestName || '',
    genderFilters: getGenderFilters() || initGenderFilter,
    interests: (userViewData?.interests
        && userViewData?.interests.length > 0
        && userViewData?.interests.map((interest: any) => interest.interestName)) || [],
  };
  delete userDto.cityName;
  delete userDto.universityName;
  res.json(userDto).end();
});

router.get('/matches', authenticate, async (req: Request, res: Response) => {
  console.log('req.body.payload.id', req.body.payload.id);
  const matchesData = await userDao.findMatches(req.body.payload.id).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });
  console.log('matchesData', matchesData);
  if (!matchesData) {
    res.sendStatus(BAD_REQUEST).end();
  }

  const matchesDto = matchesData.map((pd: any) => ({
    ...pd,
    city: pd?.cityName?.cityName || '',
    university: pd?.universityName?.universityName || '',
    interests: (pd?.interests
        && pd?.interests.length > 0
        && pd?.interests.map((interest: any) => interest.interestName))
        || [],
  }));

  matchesDto.forEach((pd: any) => { delete pd.cityName; delete pd.universityName; });

  res.json(matchesDto).end();
});

router.post('/profiles', authenticate, async (req: Request, res: Response) => {
  const {
    payload,
    cityFilter,
    universityFilter,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
    genderFilters,
    interestFilter,
  } = req.body;

  const schema = yup.object().shape(filterValidation);
  const isValid = await schema.isValid({
    cityFilter,
    universityFilter,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
    genderFilters,
    interestFilter,
  });
  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const profilesData = await userDao.findProfiles(
    payload?.id,
    cityFilter,
    universityFilter,
    interestFilter,
    genderFilters,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
  )
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
  const { user } = req.body;
  const { id } = req.body.payload;

  const schema = yup.object().shape(
    {
      ...filterValidation,
      email: yup.string().email(),
      userName: yup.string(),
      gender: yup.string(),
      dateOfBirth: yup.string().nullable(),
      description: yup.string(),
      popularity: yup.number(),
      activityIntensity: yup.number(),
      localization: yup.number(),
      isGraduated: yup.bool(),
      fieldOfStudy: yup.string(),
      interests: yup.array(),
    },
  );

  const isValid = await schema.isValid(user);
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
    university,
    city,
    interests,
    isGraduated,
    fieldOfStudy,
    universityFilter,
    interestFilter,
    cityFilter,
    genderFilters,
    yearsFilter,
    ageFromFilter,
    ageToFilter,
  } = user;

  const updatedUser = new User();
  updatedUser.id = id;
  if (userName) {
    updatedUser.userName = capitalizeFirstLetter(userName);
  }
  if (gender) {
    updatedUser.gender = capitalizeFirstLetter(gender);
  }
  if (dateOfBirth) {
    updatedUser.dateOfBirth = dateOfBirth;
  }
  if (description) {
    updatedUser.description = description;
  }
  if (email) {
    updatedUser.email = email;
  }
  if (popularity) {
    updatedUser.popularity = popularity;
  }
  if (isGraduated) {
    updatedUser.isGraduated = isGraduated;
  }
  if (fieldOfStudy) {
    updatedUser.fieldOfStudy = capitalizeFirstLetter(fieldOfStudy);
  }
  if (activityIntensity) {
    updatedUser.activityIntensity = activityIntensity;
  }
  if (localization) {
    updatedUser.localization = localization;
  }
  if (maxSearchDistanceFilter) {
    updatedUser.maxSearchDistanceFilter = maxSearchDistanceFilter;
  }
  if (yearsFilter) {
    updatedUser.ageFromFilter = Math.min(...yearsFilter);
    updatedUser.ageToFilter = Math.max(...yearsFilter);
  }

  let newOrExistingUniversity = null;
  if (universityFilter) {
    const capitalizedUniversityFilter = capitalizeFirstLetter(universityFilter);
    updatedUser.universityFilter = capitalizedUniversityFilter;
    newOrExistingUniversity = new University();
    newOrExistingUniversity.universityName = capitalizedUniversityFilter;
  } else {
    updatedUser.universityFilter = null;
  }

  let newOrExistingInterest = null;
  if (interestFilter) {
    const lowerCaseInterestFilter = interestFilter.toLowerCase();
    updatedUser.interestFilter = lowerCaseInterestFilter;
    newOrExistingInterest = new Interest();
    newOrExistingInterest.interestName = lowerCaseInterestFilter;
  } else {
    updatedUser.interestFilter = null;
  }

  let newOrExistingCity = null;
  if (cityFilter) {
    const capitalizedCityFilter = capitalizeFirstLetter(cityFilter);
    updatedUser.cityFilter = capitalizedCityFilter;
    newOrExistingCity = new City();
    newOrExistingCity.cityName = capitalizedCityFilter;
  } else {
    updatedUser.cityFilter = null;
  }

  let newOrUpdatedGenderFilters = null;
  if (genderFilters) {
    newOrUpdatedGenderFilters = Object.keys(genderFilters)
      .map((key:any) => {
        const newGF = new GenderFilter();
        newGF.userId = id;
        newGF.genderFilter = capitalizeFirstLetter(key);
        newGF.isLiking = genderFilters[key];
        return newGF;
      });
  }

  let newOrUpdatedCity = null;
  if (city) {
    newOrUpdatedCity = new City();
    const capitalizedCity = capitalizeFirstLetter(city);
    newOrUpdatedCity.cityName = capitalizedCity;
    updatedUser.cityName = capitalizedCity;
  }

  let newOrUpdatedUniversity = null;
  if (university) {
    newOrUpdatedUniversity = new University();
    const capitalizedUniversity = capitalizeFirstLetter(university);
    newOrUpdatedUniversity.universityName = capitalizedUniversity;
    updatedUser.universityName = capitalizedUniversity;
  }

  let newOrUpdatedInterests = null;
  if (interests) {
    newOrUpdatedInterests = interests.map((interest: string) => {
      const newInterest = new Interest();
      newInterest.interestName = interest;
      newInterest.users2 = [];
      newInterest.users2.push(updatedUser);
      return newInterest;
    });
  }

  const dbResult = userDao.update(
    updatedUser,
    newOrUpdatedCity,
    newOrUpdatedUniversity,
    newOrUpdatedInterests,
    newOrUpdatedGenderFilters,
    newOrExistingCity,
    newOrExistingInterest,
    newOrExistingUniversity,
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
