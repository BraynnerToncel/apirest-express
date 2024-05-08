import { IUpdateUser } from './../../data/interface/api/user/user.interface';
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

  async createUser(req: Request, res: Response) {
    try {
      const createUserDto: CreateUserDto = plainToClass(
        CreateUserDto,
        req.body
      );

      const errors: Array<ValidationError> = await validate(createUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const { status, message } = await this.userService.createUser(
        req.body
      );
      res.status(status).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAllUser(req: Request, res: Response) {
    try {
      const result = await this.userService.findAllUsers();
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findUserById(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      const result = await this.userService.findUserById(userId);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      const UpdateUsersDto: IUpdateUser = plainToClass(UpdateUserDto, req.body)
      const errors: Array<ValidationError> = await validate(UpdateUserDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const { status, message } = await this.userService.updateUsers(
        userId,
        UpdateUsersDto

      );
      return res.status(status).json(message);
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      const result = await this.userService.deleteUsers(userId);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }







}