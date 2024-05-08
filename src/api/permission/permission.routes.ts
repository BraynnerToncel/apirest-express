import { PermissionController } from './permission.controller';
import { Router } from 'express';
import { EValidPermission } from './../../data/constant/permission/permission.constant';
import { authorization } from './../../data/middlewares/guard/authorization';
import { authentification } from './../../data/middlewares/guard/authentification';

const router = Router();
const permissionController = new PermissionController();


router.get('/list', authentification, authorization([EValidPermission.settings_permission_read]), async (req, res) => {
  await  permissionController.findAllPermission(req, res);
});



export default router;
