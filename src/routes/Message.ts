import { Request, Response, Router } from 'express';

import StatusCodes from 'http-status-codes';

import { authenticate } from '@middleware/middleware';

import * as yup from 'yup';
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

router.post('/getmessage', authenticate, async (req: Request, res: Response) => {
  const reqBody = req.body;
  const isValid = await yup.object().shape(
    {
      passiveSideUserId: yup.string().required(),
    },
  ).isValid(reqBody);

  if (!isValid) {
    return res.status(BAD_REQUEST).end();
  }

  const { passiveSideUserId, payload } = req.body;

  const rawMessages = await messageDao.get(payload.id, passiveSideUserId).catch((err) => {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json(`Error: ${err}`);
  });

  const messagesDto = rawMessages.map((rm:any) => ({
    content: rm.content,
    userId_1: rm.user_id_1,
    userId_2: rm.user_id_2,
    createdAt: rm.created_at,
    senderUserId: rm.sender_user_id,
    messageId: rm.message_id,
  }));

  res.json(messagesDto).end();
});

export default router;
