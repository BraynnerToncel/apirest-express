//falrta los datos del user
export interface IPayloadJwt{
  permission: Array<string>;
}

export interface IAuteenticationUser{
  token:string;
}