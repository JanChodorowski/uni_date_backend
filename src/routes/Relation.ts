import {
  Request, Response, Router,
} from 'express';

import StatusCodes from 'http-status-codes';

import { authenticate } from '@middleware/middleware';

import * as yup from 'yup';

import RelationDao from '@daos/Relation/RelationDao';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { getConnection, getRepository } from 'typeorm';
import { User } from '@entities/User';

global.Blob = require('node-blob');

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const relationDao = new RelationDao();

router.post('/', authenticate, async (req: Request, res: Response) => {
  const reqBody = req.body;

  const isValid = await yup.object().shape(
    {
      passiveSideUserId: yup.string().required(),
      isLiking: yup.bool().required(),
    },
  ).isValid(reqBody);

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const { payload, passiveSideUserId, isLiking } = req.body;
  const { id } = payload;

  const foundLikingBackRelation = await relationDao.findLikingBackRelation(
    passiveSideUserId,
    id,
  ).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  if (foundLikingBackRelation) {
    // const newMatch = ;
    await relationDao.createMatch(foundLikingBackRelation).catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });
  } else {
    const newRelation = new OneSidedRelation();
    newRelation.activeSideUserId = id;
    newRelation.passiveSideUserId = passiveSideUserId;
    newRelation.isLiking = isLiking;
    newRelation.createdAt = new Date();

    await relationDao.add(newRelation).catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
    });
  }

  res.end();
});

export default router;
