import { Router } from 'express';
import { RoleController } from './role.controller';

const router = Router();
const roleController = new RoleController();

router.post('/create', async (req, res) => {
  await roleController.createRole(req, res);
});

router.get('/list', async (req, res) => {
  await roleController.findAllRoles(req, res);
});

router.get('/:roleId', async (req, res) => {
  await roleController.findRoleById(req, res);
});

router.put('/:roleId', async (req, res) => {
  await roleController.updateRole(req, res);
});

router.delete('/:roleId', async (req, res) => {
  await roleController.deleteRole(req, res);
});

export default router;
