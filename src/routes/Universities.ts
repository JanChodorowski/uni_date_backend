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

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default router;
