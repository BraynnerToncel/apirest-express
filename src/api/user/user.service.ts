import { IRespose } from './../../data/interface/response/response';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../../data/entities/api/user/user.entity';
import { AppDataSource } from '../../data/database-config/data-source';
import { ICreateUser, IUpdateUser } from '../../data/interface/api/user/user.interface';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(newUser: ICreateUser): Promise<IRespose<User>> {
    try {
      console.log('newUser :>> ', newUser);
      const encryptedPassword: string = await bcrypt.hash(newUser.userPassword, 10);
      newUser.userPassword = encryptedPassword;
      newUser.userFullName = newUser.userEmail.toLocaleLowerCase();
      newUser.userState= newUser.userState??true
      console.log('newUser :>> ', newUser);


      const {userId} = await this.userRepository.save(newUser);
      const user = await this.userRepository.findOne({where:{userId}});
      if(!user){
        return {status:500,message:'error al crear el user'}
      }

      return { status: 200, message: {userPassword:undefined,...user} };
    } catch (error) {
      console.error("Error creating user:", error);
      return { status: 500, message: 'Error creating user' };
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({where:{userId}});
  }

  async updateUser(userId:string, updatedUser: IUpdateUser): Promise<IRespose<User>> {
    try {
      const existingUser = await this.userRepository.findOne({where:{userId}});
      if (!existingUser) {
        return { status: 404, message: 'User not found' };
      }

      const savedUser = await this.userRepository.save({ ...existingUser, ...updatedUser });
      return { status: 200, message: savedUser };
    } catch (error) {
      console.error("Error updating user:", error);
      return { status: 500, message: 'Error updating user' };
    }
  }

  async deleteUser(userId: string): Promise<IRespose<void>> {
    try {
      const existingUser = await this.userRepository.findOne({where:{userId}});
      if (!existingUser) {
        return { status: 404, message: 'User not found' };
      }

      await this.userRepository.delete(userId);
      return { status: 200, message: 'User deleted successfully' };
    } catch (error) {
      console.error("Error deleting user:", error);
      return { status: 500, message: 'Error deleting user' };
    }
  }
}
