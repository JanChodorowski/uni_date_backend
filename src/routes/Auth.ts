import {
  CookieOptions, Request, Response, Router,
} from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import UserDao from '@daos/User/UserDao';
import { User } from '@entities/User';
import { initialMaxSearchDistance, PASSWORD_MIN_CHARS } from '@shared/constants';
import StatusCodes from 'http-status-codes';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { authenticate } from '@middleware/middleware';
import { UserDto } from '@dto/UserDto';
import { removeWhiteSpaces } from '@shared/functions';

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

const basicCredentialsValidation = {
  email: yup.string().email().required(),
  password: yup.string().min(PASSWORD_MIN_CHARS).required(),
};

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, passwordConfirmation } = req.body;
  const trimmedEmail = String(email).trim();
  const noWhitespacePassword = removeWhiteSpaces(password);
  const noWhitespacePasswordConfirmation = removeWhiteSpaces(passwordConfirmation);

  const schema = yup.object().shape({
    ...basicCredentialsValidation,
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const isValid = await schema.isValid({
    email: trimmedEmail,
    password: noWhitespacePassword,
    passwordConfirmation: noWhitespacePasswordConfirmation,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.register(trimmedEmail).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  if (foundUser) {
    return res.json({ isUserExisting: true }).end();
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(noWhitespacePassword, saltRounds);

  const newUser = new User();

  newUser.id = uuidv4();
  newUser.userName = '';
  newUser.dateOfBirth = null;
  newUser.gender = '';
  newUser.description = '';
  newUser.email = trimmedEmail;
  newUser.passwordHash = passwordHash;
  newUser.createdAt = new Date();
  newUser.isGraduated = false;
  newUser.fieldOfStudy = '';
  newUser.maxSearchDistanceFilter = initialMaxSearchDistance;
  newUser.ageFromFilter = 18;
  newUser.ageToFilter = 100;

  await userDao.add(newUser).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  const token = jwt.sign({ id: newUser.id }, TOKEN_SECRET!, signOptions);

  const resUser = new UserDto();
  resUser.id = newUser.id;
  resUser.userName = newUser.userName;
  resUser.dateOfBirth = newUser.dateOfBirth;
  resUser.gender = newUser.gender;
  resUser.description = newUser.description;
  resUser.isGraduated = newUser.isGraduated;
  resUser.fieldOfStudy = newUser.fieldOfStudy;
  resUser.email = newUser.email;
  resUser.maxSearchDistanceFilter = newUser.maxSearchDistanceFilter;
  resUser.ageFromFilter = newUser.ageFromFilter;
  resUser.ageToFilter = newUser.ageToFilter;

  res
    .cookie('token', token, cookieOptions)
    .status(CREATED)
    .json(resUser)
    .end();
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const schema = yup.object().shape(basicCredentialsValidation);

  const isValid = await schema.isValid({
    email,
    password,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.login(email)
    .catch((err: Error) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!foundUser) {
    return res.status(UNAUTHORIZED).end();
  }

  const { passwordHash, id } = foundUser;

  const arePasswordsMatching = await bcrypt.compare(password, passwordHash);
  if (!arePasswordsMatching) {
    return res.status(UNAUTHORIZED).end();
  }

  const token = jwt.sign({ id }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  res.cookie('token', token, cookieOptions)
    .end();
});

router.post('/refresh', authenticate, (req, res) => {
  // TO-DO
  const newToken = jwt.sign({ id: req?.body?.payload?.id }, TOKEN_SECRET!, signOptions);
  res.cookie('token', newToken, cookieOptions).end();
});

export default router;
