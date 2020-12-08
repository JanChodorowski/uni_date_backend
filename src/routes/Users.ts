import {
  Request, Response, Router,
} from 'express';

import UserDao from '@daos/User/UserDao';

import StatusCodes from 'http-status-codes';

import { authenticate } from '@middleware/middleware';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const userDao = new UserDao();

router.get('/data', authenticate, async (req: Request, res: Response) => {
  const foundUser = await userDao.findOneById(req.body.payload.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!foundUser) {
    res.sendStatus(BAD_REQUEST).end();
  }
  console.log('foundUser', foundUser);
  res.json(foundUser).end();
});

export default router;
