import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config()
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as
    | 'mysql'
    | 'mssql'
    | 'postgres'
    | 'mongodb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['**/src/data/entities/**/**/*.entity.{js,ts}'],

  // ,'dist/src/data/entities/api/role/role.entity.js','dist/src/data/entities/api/permission/permision.entity.js'], // Ruta relativa a la raíz del proyecto
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // Convierte el string a booleano
  logging: process.env.DB_LOGGING === 'true', // Convierte el string a booleano
});
