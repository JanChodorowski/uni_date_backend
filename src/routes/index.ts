import { Router } from 'express';
// import UserRouter from './Users';
// import UniversitiesRouter from './Universities';
import UsersRouter from './Users';
import AuthRouter from './Auth';
import PictureRouter from './Picture';
import Relation from './Relation';

const router = Router();
router.use('/users', UsersRouter);
router.use('/auth', AuthRouter);
router.use('/pictures', PictureRouter);
router.use('/relation', Relation);

export default router;
