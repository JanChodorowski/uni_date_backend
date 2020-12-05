import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import {
  NextFunction, Request, Response, Router,
} from 'express';

const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;
const { TOKEN_SECRET } = process.env;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(UNAUTHORIZED).end();
  }

  let payload: any;
  try {
    payload = jwt.verify(token, TOKEN_SECRET!);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(UNAUTHORIZED).end();
    }
    return res.status(BAD_REQUEST).end();
  }

  req.payload = payload;
  next();
};
