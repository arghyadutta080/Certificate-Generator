import express from 'express'
import { login, logout, profile, registration } from '../controller/authentication.js';
import { authenticate } from '../middleware/authenticate.js';

const userRouter = express.Router();

userRouter.post('/auth/register', registration);
userRouter.post('/auth/login', login);
userRouter.get('/auth/profile', authenticate, profile);
userRouter.get('/auth/logout', authenticate, logout);

export { userRouter };