import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { IRequestWithPayload } from '@shared/constants';

const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;
const { TOKEN_SECRET } = process.env;

export const authenticate = (req: IRequestWithPayload, res: Response, next: NextFunction) => {
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
  req.body.payload = payload;
  next();
};
