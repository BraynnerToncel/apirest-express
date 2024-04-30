import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/auth.dto";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
async login(req: Request, res: Response) {
    try {
      const loginDto: LoginDto = plainToClass(LoginDto, req.body);
      const errors:Array<ValidationError> = await validate(loginDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const {status,message} = await this.authService.asigToken(loginDto);
      return res.status(status).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  
}