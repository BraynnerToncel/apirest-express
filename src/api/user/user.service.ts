import { User } from './../../data/entities/api/user/user.entity';
import { IRespose } from './../../data/interface/response/response';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/database-config/data-source';
import { ICreateUser, IUpdateUser, IUser } from '../../data/interface/api/user/user.interface';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(newUser: ICreateUser): Promise<IRespose<IUser>> {
    try {
      console.log('newUser  :>> ', newUser.userPassword);
      const encryptedPassword: string = await bcrypt.hash(newUser.userPassword, 10);
      newUser.userPassword = encryptedPassword;
      newUser.userFullName = newUser.userEmail.toLocaleLowerCase();

      console.log(newUser)

      const { userId }: IUser = await this.userRepository.save({ ...newUser });


      const user = await this.userRepository.findOne({ 
        relations: { role: true }, 
        loadEagerRelations: false,
        select:  {userPassword:false} ,
         where: { userId } });

      if (!user) {
        return { status: 500, message: 'error al crear el user' }
      }

      return { status: 200, message: user };
    } catch (error) {
      console.error("Error creating user:", error);
      return { status: 500, message: 'Error creating user' };
    }
  }


  async findAllUsers(): Promise<IRespose<Array<IUser>>> {
    try {
      const users = await this.userRepository.find({ 
        relations: { role: true }, 
        loadEagerRelations: false, 
        select:  {userPassword:false} });
      return { status: 200, message: users };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async findUserById(userId: string): Promise<IRespose<IUser>> {
    try {
      const user = await this.userRepository.findOne({
         relations: { role: true }, 
         loadEagerRelations: false,
        select:   {userPassword:false} ,

         where: { userId } });
      if (!user) {
        return { status: 404, message: 'user not found' };
      }
      return { status: 200, message: user };
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async updateUsers(userId: string, updatedUser: IUpdateUser): Promise<IRespose<IUser>> {
    try {
      const existingUser = await this.userRepository.findOne({ relations: { role: true }, loadEagerRelations: false, where: { userId } });
      if (!existingUser) {
        return { status: 404, message: 'user not found' };
      }

      await this.userRepository.update({ userId }, updatedUser);
      const permission = await this.userRepository.findOne({ where: { userId } });

      if (!permission) {
        return { status: 404, message: 'Error al actualizar el user' };
      }
      return { status: 200, message: permission };

    } catch (error) {
      console.error("Error updating user:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async deleteUsers(userId: string): Promise<IRespose<string>> {
    try {
      const deleteResult = await this.userRepository.delete({ userId });
      if (deleteResult.affected === 0) {
        return { status: 404, message: 'user not found' };
      }
      return { status: 200, message: userId };
    } catch (error) {
      console.error("Error deleting user:", error);
      return { status: 500, message: 'Internal server error' };
    }
  }



}
