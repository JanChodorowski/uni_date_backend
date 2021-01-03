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
import { Match } from '@entities/Match';
import MessageDao from '@daos/Message/MessageDao';
import { Message } from '@entities/Message';
import { v4 as uuidv4 } from 'uuid';
import MatchDao from '@daos/Match/MatchDao';

global.Blob = require('node-blob');

const router = Router();
const {
  BAD_REQUEST, CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR,
} = StatusCodes;

const messageDao = new MessageDao();
const matchDao = new MatchDao();

router.post('/', authenticate, async (req: Request, res: Response) => {
  const reqBody = req.body;
  const isValid = await yup.object().shape(
    {
      userId_2: yup.string().required(),
      content: yup.string().required(),
    },
  ).isValid(reqBody);

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const { content, userId_2, payload } = req.body;
  const { id } = payload;

  const isThisDirectionRelationFound = await matchDao.findOneByUsersIds(id, userId_2).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  console.log('isThisDirectionRelationFound', isThisDirectionRelationFound);

  const newMessage = new Message();
  newMessage.content = content;
  newMessage.senderUserId = id;
  newMessage.userId_1 = isThisDirectionRelationFound ? id : userId_2;
  newMessage.userId_2 = isThisDirectionRelationFound ? userId_2 : id;
  newMessage.createdAt = new Date();
  newMessage.messageId = uuidv4();

  await messageDao.add(newMessage).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  res.status(CREATED)
    .end();
});

export default router;
