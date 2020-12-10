import { Router } from 'express';
// import UserRouter from './Users';
import UniversitiesRouter from './Universities';
import UsersRouter from './Users';
import AuthRouter from './Auth';
import PictureRouter from './Picture';

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use('/universities', UniversitiesRouter);
router.use('/users', UsersRouter);
router.use('/auth', AuthRouter);
router.use('/pictures', PictureRouter);

// Export the base-router
export default router;
