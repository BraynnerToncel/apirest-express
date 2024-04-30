import "reflect-metadata"
import { DataSource } from "typeorm"
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    database: process.env.DB_DATABASE,
    entities: ['dist/src/data/entities/**/**/*.entity.{js,ts}'],
    logging: true,
    synchronize: true,
  });
