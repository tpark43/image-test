import { Router } from 'express';
import { imageRouter } from './ImageRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/images', imageRouter);
router.use('/users', userRouter);