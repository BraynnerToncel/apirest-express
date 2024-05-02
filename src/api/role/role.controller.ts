import { plainToClass, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response } from "express";
import { ICreateRole, IUpdateRole } from "../../data/interface/api/role/role.interface";
import { UpdateRoleDto } from "./dto/updateRole.dto";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/createRole.dto";

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }
  async createRole(req: Request, res: Response) {
    try {
      const newRole: CreateRoleDto = plainToClass(CreateRoleDto, req.body);
      const errors: Array<ValidationError> = await validate(newRole);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const { status, message } = await this.roleService.createRole(newRole);
      return res.status(status).json(message);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async findAllRoles(req: Request, res: Response) {
    try {
      const result = await this.roleService.findAllRoles();
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error fetching roles:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findRoleById(req: Request, res: Response) {
    try {
      const roleId: string = req.params.roleId;
      const result = await this.roleService.findRoleById(roleId);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error fetching role by ID:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const roleId: string = req.params.roleId;
      const updateRoleDto: IUpdateRole = plainToClass(UpdateRoleDto, req.body);
      const errors: Array<ValidationError> = await validate(updateRoleDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const { status, message } = await this.roleService.updateRole(
        roleId,
        updateRoleDto
      );
      return res.status(status).json(message);
    } catch (err) {
      console.error("Error updating role:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const roleId: string = req.params.roleId;
      const result = await this.roleService.deleteRole(roleId);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error deleting role:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
