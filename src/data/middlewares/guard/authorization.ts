import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/api/user/user.entity";
import { AppDataSource } from "../../database-config/data-source";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { userId: req[" currentUser"].userId},
    });
    console.log(user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};