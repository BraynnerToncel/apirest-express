import 'reflect-metadata'
import * as dotenv from 'dotenv';
import AppRouter from './serverConfig/routes';
import { Server } from './serverConfig/server';
dotenv.config();

async function main() {
  const server = new Server();
  const router = new AppRouter().router();
  const port = process.env.port ? +process.env.port : 3000;

  await server.start({
    port,
    router,
  });
}

void main();
