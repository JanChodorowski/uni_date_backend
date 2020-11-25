// // import UserDao from '@daos/User/UserDao.mock';
// import { IRequest, paramMissingError } from '@shared/constants';
// import { Request, Response, Router } from 'express';
// import StatusCodes from 'http-status-codes';

// const router = Router();
// // const userDao = new UserDao();
// const { BAD_REQUEST, CREATED, OK } = StatusCodes;

// /** ****************************************************************************
//  *                      Get All Users - "GET /api/users/all"
//  ***************************************************************************** */

// router.get('/all', async (req: Request, res: Response) => {
//   const users = await userDao.getAll();
//   return res.status(OK).json({ users });
// });

// /** ****************************************************************************
//  *                       Add One - "POST /api/users/add"
//  ***************************************************************************** */

// router.post('/add', async (req: IRequest, res: Response) => {
//   const { user } = req.body;
//   console.log(user);

//   if (!user) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError,
//     });
//   }
//   await userDao.add(user);
//   return res.status(CREATED).end();
// });

// router.post('/addddd', async (req: IRequest, res: Response) => {
//   console.log(req.params);

//   const { user } = req.body;
//   console.log(user);

//   return res.status(CREATED).end();
// });

// /** ****************************************************************************
//  *                       Update - "PUT /api/users/update"
//  ***************************************************************************** */

// router.put('/update', async (req: IRequest, res: Response) => {
//   const { user } = req.body;
//   console.log(user);
//   if (!user) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError,
//     });
//   }
//   user.id = Number(user.id);
//   await userDao.update(user);
//   return res.status(OK).end();
// });

// /** ****************************************************************************
//  *                    Delete - "DELETE /api/users/delete/:id"
//  ***************************************************************************** */

// router.delete('/delete/:id', async (req: IRequest, res: Response) => {
//   const { id } = req.params;
//   await userDao.delete(Number(id));
//   return res.status(OK).end();
// });

// /** ****************************************************************************
//  *                                     Export
//  ***************************************************************************** */

// export default router;
