import { Request } from "express";

//falrta los datos del user
export interface IPayloadJwt{
  userId:string
  permissions: Array<string>;
}

export interface IAuteenticationUser{
  token:string;
}
export interface IAuthRequest extends Request {
  currentUser?: IPayloadJwt; // Ajusta el tipo según la interfaz IPayloadJwt
}