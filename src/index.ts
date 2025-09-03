import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import apiRouter from './Web/Routes/LibraryRoutes';
import { globalErrorHandler } from './Shared/Middlewares/GlobalErrorHandler';
import { AppDataSource } from './DAL/Data/TypeORMConfig';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';


dotenv.config();

export class Server {
  public express: Application;
  private readonly port: number;

  constructor() {
    this.express = express();
    this.port = Number(process.env.PORT) || 5000;

    this.configuration();
    this.routes();
    this.middlewares();
    this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private configuration() {
    this.express.use(express.json());
    this.express.use(express.static('./'));
  }

  private routes() {
    this.express.use('/api', apiRouter);
  }

  private middlewares() {
    this.express.use(globalErrorHandler);
  }

  public async start() {
    try {
      await AppDataSource.initialize();
      console.log('Database connected');

      this.express.listen(this.port, () => {
        console.log(`Server running at http://localhost:${this.port}`);
      });
    } catch (err) {
      console.error('Database connection error:', err);
    }
  }
}

new Server().start();