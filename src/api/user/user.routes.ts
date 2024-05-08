import { EValidPermission } from './../../data/constant/permission/permission.constant';
import { authorization } from './../../data/middlewares/guard/authorization';
import { authentification } from './../../data/middlewares/guard/authentification';
import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.post('/create',

  async (req, res) => {

    await
      userController.createUser(req, res);
  });

userRouter.get('/list',
  authentification,
  authorization([EValidPermission.settings_users_read]),
  async (req, res) => {
    await
      userController.findAllUser(req, res);
  });

userRouter.get('/:userId',
  authentification,
  authorization([EValidPermission.settings_users_read]),
  async (req, res) => {
    await
      userController.findUserById(req, res);
  });

userRouter.put('/:userId',
  authentification,
  authorization([EValidPermission.settings_users_update]),
  async (req, res) => {
    await
      userController.updateUser(req, res);
  });

userRouter.delete('/:userId',
  authentification,
  authorization([EValidPermission.settings_users_delete]),
  async (req, res) => {
    await

      userController.deleteUser(req, res);
  });

export default userRouter;
