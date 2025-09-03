import { Router, Request, Response } from 'express';
import { IRouterBase } from './IGenericRoutes';
import { BookController } from '../Controllers/BookController';
import { catchAsync } from '../../Shared/Middlewares/CatchMiddleware';
import { validateRequest } from '../../Shared/Middlewares/ValidateRequestMiddleWare';
import { BookDTO } from '../../BL/DTOs/BookDTO';
import { bookRetrievalLimiter } from '../../Shared/Middlewares/RateLimiterMiddleware';


export class BookRouter implements IRouterBase<BookController> {
  router: Router;
  controller: BookController;

  constructor() {
    this.router = Router();
    this.controller = new BookController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {
    this.router.post(
      '/',
      catchAsync(validateRequest(BookDTO)),
      catchAsync(async (req: Request, res: Response) => this.controller.create(req, res)),
    );

    this.router.get(
      '/',
      bookRetrievalLimiter,
      catchAsync(async (req: Request, res: Response) => this.controller.getAll(req, res)),
    );

    this.router.get(
      '/search',
      catchAsync(async (req: Request, res: Response) => this.controller.search(req, res)),
    );

    this.router.get(
      '/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.getById(req, res)),
    );

    this.router.put(
      '/:id',
      catchAsync(validateRequest(BookDTO)),
      catchAsync(async (req: Request, res: Response) => this.controller.update(req, res)),
    );

    this.router.delete(
      '/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.delete(req, res)),
    );
  }
}
