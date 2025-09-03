import { Router, Request, Response } from 'express';
import { IRouterBase } from './IGenericRoutes';
import { BorrowingController } from '../Controllers/BorrowingController';
import { catchAsync } from '../../Shared/Middlewares/CatchMiddleware';
import { validateRequest } from '../../Shared/Middlewares/ValidateRequestMiddleWare';
import { BorrowRecordDTO } from '../../BL/DTOs/BorrowRecordDTO';

export class BorrowingRouter implements IRouterBase<BorrowingController> {
  router: Router;
  controller: BorrowingController;

  constructor() {
    this.router = Router();
    this.controller = new BorrowingController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {
    this.router.post(
      '/borrow',
      catchAsync(validateRequest(BorrowRecordDTO)),
      catchAsync(async (req: Request, res: Response) => this.controller.borrowBook(req, res)),
    );

    this.router.post(
      '/return/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.returnBook(req, res)),
    );

    this.router.get(
      '/borrower/:id',
      catchAsync(async (req: Request, res: Response) => this.controller.getBorrowerBooks(req, res)),
    );

    this.router.get(
      '/overdue',
      catchAsync(async (req: Request, res: Response) => this.controller.getOverdueBooks(req, res)),
    );
  }
}