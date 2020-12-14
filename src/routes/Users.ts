import {
  Request, Response, Router,
} from 'express';

import UserDao from '@daos/User/UserDao';
import { User } from '@entities/User';

import StatusCodes from 'http-status-codes';
import { getConnection } from 'typeorm';

import { authenticate } from '@middleware/middleware';
import { UserDto } from '@dto/UserDto';
import { IUser } from '@interfaces/IUser';
import { removeUndefinedFields } from '@shared/functions';

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
  console.log('req.body.user', req.body.user);
  const reqUser = { ...req.body.user };
  console.log('reqUser', reqUser);
  removeUndefinedFields(reqUser);
  console.log('removeUndefinedFields reqUser', reqUser);
  const pickedUser : any = (({
    userName,
    gender,
    dateOfBirth,
    description,
    email,
    createdAt,
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
    createdAt,
    popularity,
    activityIntensity,
    localization,
    maxSearchDistanceFilter,
    ageFromFilter,
    ageToFilter,
    genderFilter,
  }))(reqUser);
  console.log('removeUndefinedFields pickedUser', pickedUser);

  removeUndefinedFields(pickedUser);
  console.log('removeUndefinedFields pickedUser', pickedUser);

  const dbResult = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      ...pickedUser,
    })
    .where('id = :id', { id: req?.body?.payload?.id })
    .execute();

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
