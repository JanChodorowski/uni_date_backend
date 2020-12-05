import { Router } from 'express';
// import UserRouter from './Users';
import UniversitiesRouter from './Universities';
import AuthRouter from './Auth';

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use('/universities', UniversitiesRouter);
router.use('/auth', AuthRouter);

// Export the base-router
export default router;
