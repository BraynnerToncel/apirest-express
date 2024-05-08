import { Router } from 'express';
import authRoutes from '../api/auth/auth.routes';
import permissionRoutes from '../api/permission/permission.routes';
import roleRoutes from '../api/role/role.routes';
import userRouter from '../api/user/user.routes';
import { authentification } from '../data/middlewares/guard/authentification';
import { authorization } from '../data/middlewares/guard/authorization';
export default class AppRouter {
  router() {
    const router = Router();
    router.use('/auth', authRoutes);
    router.use('/users', userRouter);
    router.use('/roles',   roleRoutes);
    router.use('/permissions', permissionRoutes)

    return router;
  }
}
