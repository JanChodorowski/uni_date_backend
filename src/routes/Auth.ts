import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import UniversityDao, { IUniversityDao } from '@daos/University/UniversityDao';
import UserDao from '@daos/User/UserDao';
import { University } from '@entities/University';
import { UniversityAttendance } from '@entities/UniversityAttendance';
import { User } from '@entities/User';
import { IUniversityAttendance } from '@interfaces/IUniversityAttendance';
import { IUser } from '@interfaces/IUser';
import { IRequest, paramMissingError } from '@shared/constants';
import StatusCodes from 'http-status-codes';
import { getConnection, getManager } from 'typeorm';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const {
  NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL, TOKEN_SECRET,
} = process.env;
const jwtExpirySeconds = 300;

const users: any = {
  user1: 'password1',
  user2: 'password2',
};

router.post('/signin', (req: Request, res: Response) => {
  // Get credentials from JSON body
  const { username, password } = req.body;
  if (!username || !password || users[username] !== password) {
    // return 401 error is username or password doesn't exist, or if password does
    // not match the password in our records
    console.log('ioio', username, password);
    return res.status(401).end();
  }

  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ username }, TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });
  console.log('token:', token);

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
    return res.status(401).end();
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
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  res.send(`Welcome ${payload.username}!`);
});

export default router;
