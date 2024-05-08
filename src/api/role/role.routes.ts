import { Router } from 'express';
import { RoleController } from './role.controller';
import { EValidPermission } from './../../data/constant/permission/permission.constant';
import { authorization } from './../../data/middlewares/guard/authorization';
import { authentification } from './../../data/middlewares/guard/authentification';

const router = Router();
const roleController = new RoleController();

router.post('/create', async (req, res) => {
  await
    roleController.createRole(req, res);
});

router.get('/list',
  authentification,
  authorization([EValidPermission.settings_roles_read]),
  async (req, res) => {
    await
      roleController.findAllRoles(req, res);
  });

router.get('/:roleId',
  authentification,
  authorization([EValidPermission.settings_roles_read]),
  async (req, res) => {
    await
      roleController.findRoleById(req, res);
  });

router.put('/:roleId',
  authentification,
  authorization([EValidPermission.settings_roles_read]),
  async (req, res) => {
    await
      roleController.updateRole(req, res);
  });

router.delete('/:roleId',
  authentification,
  authorization([EValidPermission.settings_roles_delete]),
  async (req, res) => {
    await
      roleController.deleteRole(req, res);
  });

export default router;
