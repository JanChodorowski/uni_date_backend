import {
  NextFunction, Request, Response, Router,
} from 'express';

import StatusCodes from 'http-status-codes';
import { authenticate } from '@middleware/middleware';
import { v4 as uuidv4 } from 'uuid';
import UserDao from '@daos/User/UserDao';
import { IPicture } from '@interfaces/IPicture';
import { Picture } from '@entities/Picture';
import PictureDao from '@daos/Picture/PictureDao';
import * as yup from 'yup';
import { removeWhiteSpaces } from '@shared/functions';

const fileUpload = require('express-fileupload');

const { promisify } = require('util');
const fs = require('fs');

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const fileNameSchema = yup.object().shape({ fileName: yup.string().required() });
const pictureDao = new PictureDao();

router.post('/getone', authenticate, async (req: any, res: Response, next:NextFunction) => {
  const blobHolder = await pictureDao.findBlobByFileName(req?.body?.fileName).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  if (!blobHolder) {
    res.sendStatus(BAD_REQUEST).end();
  }
  res.setHeader('filename', req?.body?.fileName);
  res.end(blobHolder.blob);
});

router.put('/avatar', authenticate, async (req: Request, res: Response) => {
  const trimmedFileName = removeWhiteSpaces(req?.body?.fileName);
  const userId = req?.body?.payload?.id;

  const isValid = await fileNameSchema.isValid({ fileName: trimmedFileName });
  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  await pictureDao.chooseAvatar(userId, trimmedFileName).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  res.end();
});

router.post('/delete', authenticate, async (req: Request, res: Response) => {
  const { fileName } = req?.body;
  const isValid = await fileNameSchema.isValid({ fileName });
  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }
  await pictureDao.delete(fileName).catch((err: Error) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });
  res.end();
});

router.use(fileUpload());

router.post('/', authenticate, async (req: any, res: Response) => {
  try {
    const userDao = new UserDao();
    const foundUser = await userDao.findOneById(req?.body?.payload?.id)
      .catch((err: Error) => {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
      });
    if (foundUser) {
      let newPictureOrPictures: IPicture[] | IPicture;
      const { files } = req.files;
      if (Array.isArray(files)) {
        newPictureOrPictures = files.map((f: any, i: number) => {
          const newPicture = new Picture();
          // newPicture.order = i;
          newPicture.fileName = uuidv4();
          newPicture.user = foundUser!;
          newPicture.isAvatar = false;
          newPicture.blob = f.data;
          return newPicture;
        });
      } else {
        const newPicture = new Picture();
        // newPicture.order = -1;
        newPicture.fileName = uuidv4();
        newPicture.user = foundUser!;
        newPicture.isAvatar = false;
        newPicture.blob = files.data;
        newPictureOrPictures = newPicture;
      }

      const pictureDao = new PictureDao();

      await pictureDao.add(newPictureOrPictures).catch((err: Error) => {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
      });
    } else {
      res.status(INTERNAL_SERVER_ERROR).end();
    }
  } catch (e) {
    console.log(`error${e}`);
  }
  res.end();
});

export default router;
