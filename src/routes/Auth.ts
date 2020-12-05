import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import UniversityDao, { IUniversityDao } from '@daos/University/UniversityDao';
import UserDao from '@daos/User/UserDao';
import { University } from '@entities/University';
import { UniversityAttendance } from '@entities/UniversityAttendance';
import { User } from '@entities/User';
import { IUniversityAttendance } from '@interfaces/IUniversityAttendance';
import { IUser } from '@interfaces/IUser';
import { IRequest, paramMissingError, gender } from '@shared/constants';
import StatusCodes from 'http-status-codes';
import { getConnection, getManager } from 'typeorm';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;
const {
  NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL, TOKEN_SECRET,
} = process.env;
const jwtExpirySeconds = 100000000000;

const users: any = {
  user1: 'password1',
  user2: 'password2',
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

router.post('/register', async (req: Request, res: Response) => {
  // Get credentials from JSON body
  const { email, password, passwordConfirmation } = req.body;
  const trimmedEmail = String(email).trim();
  const trimmedPassword = String(password).trim();
  const trimmedPasswordConfirmation = String(passwordConfirmation).trim();
  const isValid = await schema.isValid({
    email: trimmedEmail,
    password: trimmedPassword,
    passwordConfirmation: trimmedPasswordConfirmation,
  });

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const foundUsers = await getConnection()
    .createEntityManager()
    .find(User, { where: { email: trimmedEmail } })
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    }) || [];

  console.log('foundUsers', foundUsers);
  if (foundUsers.length > 0) {
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
  // To-Do get clients localization
  newUser.localization = 0;
  newUser.maxSearchDistanceFilter = 0;
  newUser.ageFromFilter = 0;
  newUser.ageToFilter = 0;
  newUser.genderFilter = 0;

  await getConnection()
    .createEntityManager()
    .save(newUser);
  // Create a new token with the email in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ email: trimmedEmail }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });
  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
});

router.post('/login', (req: Request, res: Response) => {
  // Get credentials from JSON body
  const { email, password } = req.body;
  const trimmedEmail = String(email).trim();
  const trimmedPassword = String(password).trim();
  if (!trimmedEmail || !trimmedPassword || users[trimmedEmail] !== trimmedPassword) {
    // return UNAUTHORIZED error is email or password doesn't exist, or if password does
    // not match the password in our records
    return res.status(UNAUTHORIZED).end();
  }

  // Create a new token with the email in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ email: trimmedEmail }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
});

router.post('/secret', (req: Request, res: Response) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const { token } = req.cookies;

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(UNAUTHORIZED).end();
  }

  let payload : any;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, TOKEN_SECRET!);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a UNAUTHORIZED error
      return res.status(UNAUTHORIZED).end();
    }
    // otherwise, return a bad request error
    return res.status(BAD_REQUEST).end();
  }

  // Finally, return the welcome message to the user, along with their
  // email given in the token
  res.send(`Welcome ${payload.email}!`);
});

router.post('/refresh', (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const { token } = req.cookies;

  if (!token) {
    console.log('no token');
    return res.status(UNAUTHORIZED).end();
  }

  let payload : any;
  try {
    payload = jwt.verify(token, TOKEN_SECRET!);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(UNAUTHORIZED).end();
    }
    console.log('smth wrong:', e);
    return res.status(BAD_REQUEST).end();
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  // const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  // if (payload.exp - nowUnixSeconds > 30) {
  //   console.log('token too young');
  //   return res.status(BAD_REQUEST).end();
  // }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ email: payload.email }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
});

export default router;
