import { Role } from './../../data/entities/api/role/role.entity';
import { Repository } from "typeorm";
import { AppDataSource } from "../../data/database-config/data-source";
import { ICreateRole, IRole, IUpdateRole } from "../../data/interface/api/role/role.interface";
import { IRespose } from "../../data/interface/response/response";

export class RoleService {
  private roleRepository :Repository<Role>
  
  constructor(){
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async createRole(newRole: ICreateRole): Promise<IRespose<IRole>> {
    try {
      const { roleId }: IRole = await this.roleRepository.save({
        ...newRole,
      });
      const Role = await this.roleRepository.findOne({ where: { roleId } });
      if (!Role) {
        return { status: 404, message: 'Error al crear el rol' };
      }
      return { status: 200, message: Role };
    } catch (error) {
      console.error("Error creating role:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async findAllRoles(): Promise<IRespose<Array<IRole>>> {
    try {
      const roles = await this.roleRepository.find();
      return { status: 200, message: roles };
    } catch (error) {
      console.error("Error fetching roles:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async findRoleById(roleId: string): Promise<IRespose<IRole>> {
    try {
      const role = await this.roleRepository.findOne({ where: { roleId } });
      if (!role) {
        return { status: 404, message: 'Role not found' };
      }
      return { status: 200, message: role };
    } catch (error) {
      console.error("Error fetching role by ID:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async updateRole(roleId: string, updatedRole: IUpdateRole): Promise<IRespose<IRole>> {
    try {
      const existingRole = await this.roleRepository.findOne({ where: { roleId } });
      if (!existingRole) {
        return { status: 404, message: 'Role not found' };
      }

      await this.roleRepository.update({ roleId }, updatedRole);
      const role = await this.roleRepository.findOne({ where: { roleId } });
      if (!role) {
        return { status: 404, message: 'Error al actualizar el rol' };
      }
      return { status: 200, message: role };
    } catch (error) {
      console.error("Error updating role:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }


  async deleteRole(roleId: string): Promise<IRespose<string>> {
    try {
      const deleteResult = await this.roleRepository.delete({ roleId });
      if (deleteResult.affected === 0) {
        return { status: 404, message: 'Role not found' };
      }
      return { status: 200, message: roleId };
    } catch (error) {
      console.error("Error deleting role:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }
}
