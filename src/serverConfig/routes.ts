import { Router } from 'express';
import authRoutes from '../api/auth/auth.routes';

export default class AppRouter {
  router() {
    const router = Router();
    router.use('/auth', authRoutes);
    router.use('/users', );
    // router.use('/role', RoleRouter);

    return router;
  }
}
