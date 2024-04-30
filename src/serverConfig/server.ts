import { Router } from "express";
import express = require("express");
import { AppDataSource } from "../data/database-config/data-source";
import { errorHandler } from "../data/middlewares/inertceptor/errorHandler";

export class Server {
  private readonly app = express();
  public async start(options: ServerOptions) {
    this.setupMiddleware();
    this.setErrorHandler()
    this.app.use(options.router);
    console.log(process.env.DB_DATABASE);
    AppDataSource.initialize()
      .then(async () => {
        this.app.listen(options.port, () => {
          console.log(`Server running on port ${options.port}`);
        });
        console.log('Data Source has been initialized!');
      })
      .catch((error) => {
        console.log('error :>> ', error);
      });
  }

  private setupMiddleware() {
    this.app.use(express.json());
  }
  private setErrorHandler(){
    this.app.use(errorHandler)
  }
}
interface ServerOptions {
  port: number;
  router: Router;
}
