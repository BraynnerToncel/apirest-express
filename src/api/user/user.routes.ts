import{ Router } from 'express';
import { UserController } from './user.controller';

const userRouter: Router =Router();
const userController: UserController = new UserController();

userRouter.post('/create', async (req, res) => {
  await userController.createUser(req, res);
});

userRouter.get('/list', async (req, res) => {
  await userController.getUsers(req, res);
});

userRouter.get('/:userId', async (req, res) => {
  await userController.getUserById(req, res);
});

userRouter.put('/:userId', async (req, res) => {
  await userController.updateUser(req, res);
});

userRouter.delete('/:userId', async (req, res) => {
  await userController.deleteUser(req, res);
});

export default userRouter;
