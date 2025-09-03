import { Router, Request, Response } from 'express';
import { IRouterBase } from './IGenericRoutes';
import { BorrowerController } from '../Controllers/BorrowerController';
import { catchAsync } from '../../Shared/Middlewares/CatchMiddleware';
import { validateRequest } from '../../Shared/Middlewares/ValidateRequestMiddleWare';
import { BorrowerDTO } from '../../BL/DTOs/BorrowerDTO';
import { borrowLimiter } from '../../Shared/Middlewares/RateLimiterMiddleware';

export class BorrowerRouter implements IRouterBase<BorrowerController> {
  router: Router;
  controller: BorrowerController;

  constructor() {
    this.router = Router();
    this.controller = new BorrowerController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {
    this.router.post(
      '/',
      borrowLimiter,
      catchAsync(validateRequest(BorrowerDTO)),
      catchAsync(async (req: Request, res: Response) => this.controller.create(req, res)),
    );

    this.router.get(
      '/',
      catchAsync(async (req: Request, res: Response) => this.controller.getAll(req, res)),
    );

    this.router.get(
      '/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.getById(req, res)),
    );

    this.router.put(
      '/:id',
      catchAsync(validateRequest(BorrowerDTO)),
      catchAsync(async (req: Request, res: Response) => this.controller.update(req, res)),
    );

    this.router.delete(
      '/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.delete(req, res)),
    );
  }
}