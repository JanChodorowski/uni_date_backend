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

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const userDao = new UserDao();

router.get('/', authenticate, async (req: Request, res: Response) => {
  const userDto : UserDto = await userDao.getUserViewDataByUserId(req?.body?.payload?.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!userDto) {
    res.sendStatus(BAD_REQUEST).end();
  }

  res.json(userDto).end();
});

router.put('/', authenticate, async (req: Request, res: Response) => {
  const userCopy = { ...req.body.user };
  console.log('userCopy 1', userCopy);
  userCopy.email = removeWhiteSpaces(userCopy.email);
  console.log('userCopy 2', userCopy);

  removeUndefinedFields(userCopy);
  console.log('userCopy 3', userCopy);

  const pickedUser : any = (({
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
    genderFilter,
  }) => ({
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
    genderFilter,
  }))(userCopy);
  removeUndefinedFields(pickedUser);
  console.log('pickedUser 4', pickedUser);

  const schema = yup.object().shape(
    {
      email: yup.string().email(),
      userName: yup.string(),
      gender: yup.number(),
      dateOfBirth: yup.string(),
      description: yup.string(),
      popularity: yup.number(),
      activityIntensity: yup.number(),
      localization: yup.number(),
      maxSearchDistanceFilter: yup.number(),
      ageFromFilter: yup.number(),
      ageToFilter: yup.number(),
      genderFilter: yup.number(),
    },
  );

  const isValid = await schema.isValid(pickedUser);
  console.log('isvalid 5', isValid);
  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const dbResult = userDao.update(pickedUser, req?.body?.payload?.id);

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
