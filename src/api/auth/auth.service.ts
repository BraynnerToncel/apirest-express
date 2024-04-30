import { Repository } from "typeorm";
import { AppDataSource } from "../../data/database-config/data-source";
import { User } from "../../data/entities/api/user/user.entity";
import { encrypt } from "../../data/helpers/encrypt";
import { IAuth } from "../../data/interface/api/auth/auth.interface";
import { IAuteenticationUser } from "../../data/interface/api/jwt/payload.jwt";
import { IRespose } from "../../data/interface/response/response";

export class AuthService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async asigToken({
    userName,
    userPassword,
  }: IAuth): Promise<IRespose<string | IAuteenticationUser>> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { userName } });
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
    const token = encrypt.generateToken({ userId: user.userId });

    return { status: 200, message: { token } };
  }
}
