import express from 'express'
import { login, logout, profile, registration } from '../controller/authentication.js';
import { authenticate } from '../middleware/authenticate.js';

const userRouter = express.Router();

userRouter.post('/api/auth/register', registration);
userRouter.post('/api/auth/login', login);
userRouter.get('/api/auth/profile', authenticate, profile);
userRouter.get('/api/auth/logout', authenticate, logout);

export { userRouter };