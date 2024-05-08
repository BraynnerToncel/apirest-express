import { IPermission } from './../../interface/api/permission/permission.interface';
import { EValidPermission } from './../../constant/permission/permission.constant';
import { NextFunction, Response } from "express";
import { User } from "../../entities/api/user/user.entity";
import { AppDataSource } from "../../database-config/data-source";
import { IAuthRequest } from "../../interface/api/jwt/payload.jwt";

export const authorization = (permission: string[]) => {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    try {
      const user = await userRepo.findOne({
        relations: { role: true },
        where: { userId: req.currentUser?.userId },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if ((user.role.permissions) && (user.role.permissions.some(permission => permission.permissionName === EValidPermission.develop_permission_all) ||
        user.role.permissions.some(permission => permission.permissionName.includes(permission.permissionName)))) {
        return next();
      }

      return res.status(403).json({ message: "Forbidden" });
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
