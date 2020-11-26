import { University } from '@entities/University';
import { IRequest, paramMissingError } from '@shared/constants';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { getConnection } from 'typeorm';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

router.get('/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  const newUniversity = new University();
  newUniversity.name = name;
  console.log('fruitssssssssssssssssssssssssss', name);
  getConnection().manager
    .save(newUniversity)
    .then((result) => res.status(OK).json({ czyDotarlo: result }));
});

router.post('/add', async (req: Request, res: Response) => {
  const { name } = req.body;
  const newUniversity = new University();
  newUniversity.name = name;
  const newUser = {

  } as IUser;
  console.log('fruitssssssssssssssssssssssssss', name);
  await getConnection().manager.save(newUniversity);
  await getConnection().manager.save(newUser);
  res.status(OK).json({ czyDotarlo: 'no pewnie mordo' });
});

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default router;
