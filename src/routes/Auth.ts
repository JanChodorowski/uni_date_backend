import {
  CookieOptions, Request, Response, Router,
} from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import UniversityDao, { IUniversityDao } from '@daos/University/UniversityDao';
import UserDao from '@daos/User/UserDao';
import { University } from '@entities/University';
import { UniversityAttendance } from '@entities/UniversityAttendance';
import { User } from '@entities/User';
import { IUniversityAttendance } from '@interfaces/IUniversityAttendance';
import { IUser } from '@interfaces/IUser';
import {
  IRequest, paramMissingError, gender,
} from '@shared/constants';
import StatusCodes from 'http-status-codes';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { authenticate } from '@middleware/middleware';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;
const {
  TOKEN_SECRET,
} = process.env;
const jwtExpirySeconds = 100000000000;
const signOptions : SignOptions = {
  algorithm: 'HS256',
  expiresIn: jwtExpirySeconds,
};
const cookieOptions : CookieOptions = { maxAge: jwtExpirySeconds * 1000 };
const userDao = new UserDao();

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, passwordConfirmation } = req.body;
  const trimmedEmail = String(email).trim();
  const trimmedPassword = String(password).trim();
  const trimmedPasswordConfirmation = String(passwordConfirmation).trim();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const isValid = await schema.isValid({
    email: trimmedEmail,
    password: trimmedPassword,
    passwordConfirmation: trimmedPasswordConfirmation,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.findOneByEmail(trimmedEmail).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  if (foundUser) {
    return res.json({ isUserExisting: true }).end();
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(trimmedPassword, saltRounds);
  const newUser = new User();

  newUser.id = uuidv4();
  newUser.userName = '';
  newUser.dateOfBirth = '1970-01-01';
  newUser.gender = gender.none;
  newUser.description = '';
  newUser.email = trimmedEmail;
  newUser.passwordHash = passwordHash;
  newUser.createdAt = new Date();
  newUser.popularity = 0;
  newUser.activityIntensity = 0;
  newUser.localization = 0;
  newUser.maxSearchDistanceFilter = 0;
  newUser.ageFromFilter = 0;
  newUser.ageToFilter = 0;
  newUser.genderFilter = 0;

  await userDao.add(newUser);

  const token = jwt.sign({ id: newUser.id }, TOKEN_SECRET!, signOptions);

  res.cookie('token', token, cookieOptions)
    .sendStatus(CREATED)
    .json(foundUser)
    .end();
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const isValid = await schema.isValid({
    email,
    password,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.findOneByEmail(email)
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!foundUser) {
    return res.status(UNAUTHORIZED).end();
  }

  const arePasswordsMatching = await bcrypt.compare(password, foundUser.passwordHash);

  if (!arePasswordsMatching) {
    return res.status(UNAUTHORIZED).end();
  }

  const token = jwt.sign({ id: foundUser.id }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  res.cookie('token', token, cookieOptions)
    .json(foundUser)
    .end();
});

router.post('/secret', authenticate, (req: Request, res: Response) => {
  // const { token } = req.cookies;
  //
  // if (!token) {
  //   return res.status(UNAUTHORIZED)
  //     .end();
  // }
  //
  // let payload : any;
  // try {
  //   payload = jwt.verify(token, TOKEN_SECRET!);
  // } catch (e) {
  //   if (e instanceof jwt.JsonWebTokenError) {
  //     return res.status(UNAUTHORIZED).end();
  //   }
  //   return res.status(BAD_REQUEST).end();
  // }

  res.send('Welcome!');
});

router.post('/refresh', authenticate, (req, res) => {
  // const { token } = req.cookies;
  //
  // if (!token) {
  //   return res.status(UNAUTHORIZED).end();
  // }
  //
  // let payload : any;
  // try {
  //   payload = jwt.verify(token, TOKEN_SECRET!);
  // } catch (e) {
  //   if (e instanceof jwt.JsonWebTokenError) {
  //     return res.status(UNAUTHORIZED).end();
  //   }
  //   return res.status(BAD_REQUEST).end();
  // }

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  // const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  // if (payload.exp - nowUnixSeconds > 30) {
  //   console.log('token too young');
  //   return res.status(BAD_REQUEST).end();
  // }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ id: req.body.payload.id }, TOKEN_SECRET!, signOptions);

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, cookieOptions).end();
});

export default router;