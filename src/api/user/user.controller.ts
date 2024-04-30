import { Request, Response } from "express";
import { UserService } from "./user.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto: CreateUserDto = plainToClass(CreateUserDto, req.body);
      
      const errors: ValidationError[] = await validate(createUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const { status, message } = await this.userService.createUser(createUserDto);
      res.status(status).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json({ status: 200, message: users });
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ status: 500, message: 'Error getting users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const user = await this.userService.getUserById(userId);
      
      if (!user) {
        res.status(404).json({ status: 404, message: 'User not found' });
        return;
      }

      res.status(200).json({ status: 200, message: user });
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ status: 500, message: 'Error getting user by ID' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const updateUserDto: UpdateUserDto = plainToInstance(UpdateUserDto, req.body);
      
      const errors: ValidationError[] = await validate(updateUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const { status, message } = await this.userService.updateUser(userId, updateUserDto);
      res.status(status).json(message);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ status: 500, message: 'Error updating user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const { status, message } = await this.userService.deleteUser(userId);
      res.status(status).json(message);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ status: 500, message: 'Error deleting user' });
    }
  }
}
