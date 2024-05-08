import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { IAuthRequest } from "../../interface/api/jwt/payload.jwt";
dotenv.config();

export const authentification = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verificar el token
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret"
    );
    console.log(decode)
    if (typeof decode === "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    (req as any)["currentUser"] = decode;
    next();
  } catch (error) {
    // Manejar los diferentes tipos de errores y devolver un mensaje de error
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "El token ha expirado" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token JWT inválido" });
    } else {
      // Otros tipos de errores
      return res.status(401).json({ message: "Error al verificar el token" });
    }
  }
};
