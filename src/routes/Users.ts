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
  const userDto : UserDto = await userDao.findUserDtoById(req.body.payload.id)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  // const resUser = new UserDto();
  // const test = await userDao.findUserDtoById(req.body.payload.id)
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  //   });
  // console.log('test', test);
  if (!userDto) {
    res.sendStatus(BAD_REQUEST).end();
  } else {
    console.log('foundUser', userDto);
    // resUser.userName = userDto.userName;
    // resUser.dateOfBirth = userDto.dateOfBirth;
    // resUser.gender = userDto.gender;
    // resUser.description = userDto.description;
    // resUser.email = userDto.email;
    // resUser.maxSearchDistanceFilter = userDto.maxSearchDistanceFilter;
    // resUser.ageFromFilter = userDto.ageFromFilter;
    // resUser.ageToFilter = userDto.ageToFilter;
    // resUser.genderFilter = userDto.genderFilter;
  }

  res.json(userDto).end();
});

export default router;
