import { Permission } from './../../data/entities/api/permission/permision.entity';
import { IRespose } from './../../data/interface/response/response';
import { AppDataSource } from '../../data/database-config/data-source';
import { IPermission, ICreatePermission, IUpdatePermission } from '../../data/interface/api/permission/permission.interface';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { EValidPermission } from './../../data/constant/permission/permission.constant';

export class PermissionServices {
    private PermissionRepository: Repository<Permission>
    constructor() {
        this.PermissionRepository = AppDataSource.getRepository(Permission);
    }

    async findAllPermissions() {
        return await this.PermissionRepository.find();
    }

    async syncPermissions() {
        const incosistentPermissions: Array<string> = [];
        console.log("Verfyng permissions...");

        let storedPermissions = await this.PermissionRepository.find();
        const storedPermissionNames = storedPermissions.map(
            (permission) => permission.permissionName
        );

        const staticPermissions = Object.values(EValidPermission) as Array<string>;


        for (const permission of staticPermissions) {
            if (process.env.DB_SYNCHRONIZE === "true") {
                if (!storedPermissionNames.includes(permission)) {
                    await this.PermissionRepository.save({
                        permissionName: permission,
                        permissionDescription: `${permission
                            .split(":")
                            .join(" ")} (default)`,
                        permissionState: true,
                    });
                }
            }
        }

        storedPermissionNames.forEach((permission) => {
            if (!staticPermissions.includes(permission)) {
                incosistentPermissions.push(permission);
            }
        });

        if (incosistentPermissions.length > 0) {
            const errorMessage =
                "Inconsistent permissions found: " + incosistentPermissions.join(",");
            console.error(incosistentPermissions.join(","));
            throw new Error(errorMessage);
        }
        storedPermissions = await this.PermissionRepository.find();
        if (!(storedPermissions.length === staticPermissions.length)) {
            throw new Error("Permission imcomplite activate sincronized");
        }
        console.log("Verification done!");

    }


}