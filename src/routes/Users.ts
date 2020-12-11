import {
  Request, Response, Router,
} from 'express';

import UserDao from '@daos/User/UserDao';

import StatusCodes from 'http-status-codes';

import { authenticate } from '@middleware/middleware';
import { UserDto } from '@dto/UserDto';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const userDao = new UserDao();

router.get('/data', authenticate, async (req: Request, res: Response) => {
  const userDto : UserDto = await userDao.findUserViewDataByUserId(req?.body?.payload?.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!userDto) {
    res.sendStatus(BAD_REQUEST).end();
  } else {
    console.log('foundUser', userDto);
  }

  res.json(userDto).end();
});

router.delete('/', authenticate, async (req: Request, res: Response) => {
  await userDao.delete(req?.body?.payload?.id);
  res.end();
});

export default router;
