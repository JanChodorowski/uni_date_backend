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
  const formattedEmail = removeWhiteSpaces(String(email).toLocaleLowerCase());
  const noWhitespacePassword = removeWhiteSpaces(password);
  const noWhitespacePasswordConfirmation = removeWhiteSpaces(passwordConfirmation);

  const schema = yup.object().shape({
    ...basicCredentialsValidation,
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const isValid = await schema.isValid({
    email: formattedEmail,
    password: noWhitespacePassword,
    passwordConfirmation: noWhitespacePasswordConfirmation,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.register(formattedEmail).catch((err: Error) => {
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
  newUser.email = formattedEmail;
  newUser.passwordHash = passwordHash;
  newUser.createdAt = new Date();
  newUser.isGraduated = false;
  newUser.fieldOfStudy = '';
  newUser.maxSearchDistanceFilter = initialMaxSearchDistance;
  newUser.ageFromFilter = 18;
  newUser.ageToFilter = 100;

  await userDao.addOrUpdate(newUser).catch((err: Error) => {
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

router.put('/email', authenticate, async (req: Request, res: Response) => {
  const { newEmail, password, payload } = req.body;
  const { id } = payload;
  const formattedEmail = removeWhiteSpaces(String(newEmail).toLocaleLowerCase());
  const noWhitespacePassword = removeWhiteSpaces(password);
  console.log('req.body', req.body);
  const currentEmail = userDao.getEmailById(id).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  const schema = yup.object().shape({
    newEmail: yup
      .string()
      .email('Enter a valid new email')
      .notOneOf([!currentEmail || ''], 'Provided new email is the same as current')
      .required('New email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const isValid = await schema.isValid({
    newEmail: formattedEmail,
    password: noWhitespacePassword,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const { user_password_hash } = await userDao.getPassword(id)
    .catch((err: Error) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!user_password_hash) {
    return res.status(UNAUTHORIZED).end();
  }
  const arePasswordsMatching = await bcrypt.compare(noWhitespacePassword, user_password_hash);

  if (!arePasswordsMatching) {
    return res.status(UNAUTHORIZED).end();
  }

  const userWithNewEmail = new User();
  userWithNewEmail.id = id;
  userWithNewEmail.email = newEmail;

  userDao.addOrUpdate(userWithNewEmail)
    .catch((err: Error) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  res.json({ hasEmailChanged: true }).end();
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const formattedEmail = removeWhiteSpaces(String(email).toLocaleLowerCase());
  const noWhitespacePassword = removeWhiteSpaces(password);
  const schema = yup.object().shape(basicCredentialsValidation);

  const isValid = await schema.isValid({
    email: formattedEmail,
    password: noWhitespacePassword,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUser = await userDao.login(formattedEmail)
    .catch((err: Error) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });

  if (!foundUser) {
    return res.status(UNAUTHORIZED).end();
  }

  const { passwordHash, id } = foundUser;

  const arePasswordsMatching = await bcrypt.compare(noWhitespacePassword, passwordHash);
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
