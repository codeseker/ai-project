import {Router} from 'express';
const router = Router();
import authRouter from './auth';
import courseRouter from './course';
import { authMiddleware } from '../middlewares/auth';

router.use('/auth', authRouter);
router.use('/course', authMiddleware, courseRouter);

export default router;