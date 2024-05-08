import { Permission } from './../../data/entities/api/permission/permision.entity';
// import { Repository } from "typeorm";
// import { AppDataSource } from "../../data/database-config/data-source";
// import { User } from "../../data/entities/api/user/user.entity";
// import { encrypt } from "../../data/helpers/encrypt";
// import { IAuth } from "../../data/interface/api/auth/auth.interface";
// import { IAuteenticationUser } from "../../data/interface/api/jwt/payload.jwt";
// import { IRespose } from "../../data/interface/response/response";
// import { IUser } from "../../data/interface/api/user/user.interface";

// export class AuthService {
//   private userRepository: Repository<User>;
//   constructor() {
//     this.userRepository = AppDataSource.getRepository(User);
//   }
//   async asigToken({
//     userName,
//     userPassword,
//   }: IAuth): Promise<IRespose<string | IAuteenticationUser>> {
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne({ where: { username: userName } });
//     if (!user) {
//       throw new Error("Nombre de usuario o contraseña incorrectos");
//     }

//     const isPasswordValid = encrypt.comparepassword(
//       user.userPassword,
//       userPassword
//     );
//     if (!user || !isPasswordValid) {
//       return { status: 401, message: "user or password incorrect" };
//     }
//     if (user && user.role && user.role.permissions) {
//       console.log("entre")
//     const { userId, role: { permissions: permissionsDB } }: IUser = user
//     const permissions = permissionsDB.map((permission) => {
//       return permission.permissionName
//     })
//     const token = encrypt.generateToken({ userId, permissions });

//   return { status: 200, message: { ...token } };
//   }else{
    
//   }
//   return {status: 401, message: "User does not have permissio defined"}
//     // const token = encrypt.generateToken({ userId, permissions });

//     // return { status: 200, message: { ...token } };
//   }
// }

import { Repository } from "typeorm";
import { AppDataSource } from "../../data/database-config/data-source";
import { User } from "../../data/entities/api/user/user.entity";
import { encrypt } from "../../data/helpers/encrypt";
import { IAuth } from "../../data/interface/api/auth/auth.interface";
import { IAuteenticationUser } from "../../data/interface/api/jwt/payload.jwt";
import { IRespose } from "../../data/interface/response/response";
import { IUser } from "../../data/interface/api/user/user.interface";

export class AuthService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async asigToken({
    username,
    userPassword,
  }: IAuth): Promise<IRespose<string | IAuteenticationUser>> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      relations: { role: true}, 
      where: { username: username } });
    if (!user) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const isPasswordValid = encrypt.comparepassword(
      user.userPassword,
      userPassword
    );
    if (!user || !isPasswordValid) {
      return { status: 401, message: "user or password incorrect" };
    }
   

    const { userId, role: { permissions: permissionsDB } }: IUser = user
    const permissions = permissionsDB.map((permission) => {
      return permission.permissionName
    
    })
    const token = encrypt.generateToken({ userId, permissions });

    return { status: 200, message: { ...token } };
  }
}
