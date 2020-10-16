import { Router } from 'express';
import { UserController } from '../controller/UserController';

const userRouter = Router();

userRouter.post('/signup/:type', new UserController().signup);

userRouter.post('/signin', new UserController().signin);

userRouter.get('/bands', new UserController().listAllBands);

userRouter.get('/bands/approval/:id', new UserController().approvalBands);

export default userRouter;