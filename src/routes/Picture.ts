import express, {
  Request, Response, Router,
} from 'express';

import StatusCodes from 'http-status-codes';

import { authenticate } from '@middleware/middleware';
import { IRequestWithPayload } from '@shared/constants';
import path from 'path';
import app from '@server';
import morgan from 'morgan';
import helmet from 'helmet';

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;
const multer = require('multer');

const {
  NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL, TOKEN_SECRET,
} = process.env;

let mainDirName: string;

if (NODE_ENV === 'development') {
  // Show routes called in console during development
  mainDirName = 'src';
} else if (NODE_ENV === 'production') {
  mainDirName = 'dist';
}

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, `${mainDirName}/uploads`);
  },
  filename: (req:any, file:any, cb:any) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req:any, file:any, cb:any) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
export const upload = multer({ storage, fileFilter });
console.log('upload', upload);
// upload.array('images', 12)  upload.array('image')
router.post('/', authenticate, upload.array('files'), (req: any, res: Response) => {
  // console.log('req picture', req.files);
  // console.log('req picture', req.file);

  res.end();
});

export default router;
