import {Router} from 'express';
const router = Router();
import authRouter from './auth';

router.use('/auth', authRouter);

export default router;