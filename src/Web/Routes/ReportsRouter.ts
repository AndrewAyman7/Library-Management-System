import { Router } from 'express';
import { IRouterBase } from './IGenericRoutes';
import { catchAsync } from '../../Shared/Middlewares/CatchMiddleware';
import { BorrowReportController } from '../Controllers/BorrowReportController';
import { reportLimiter } from '../../Shared/Middlewares/RateLimiterMiddleware';

export class ReportsRouter implements IRouterBase<BorrowReportController> {
  router: Router;
  controller: BorrowReportController;

  constructor() {
    this.router = Router();
    this.controller = new BorrowReportController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {

    this.router.get(
      "/period",
      reportLimiter,
      catchAsync((req, res) => this.controller.getBorrowsInPeriod(req, res))
    );

    this.router.get(
      "/period/csv",
      reportLimiter,
      catchAsync((req, res) => this.controller.exportBorrowsCSV(req, res))
    );

    this.router.get(
      "/period/xlsx",
      catchAsync((req, res) => this.controller.exportBorrowsXLSX(req, res))
    );

    this.router.get(
      "/all/last-month/csv",
      catchAsync((req, res) => this.controller.exportAllLastMonthCSV(req, res))
    );

    this.router.get(
      "/all/last-month/xlsx",
      catchAsync((req, res) => this.controller.exportAllLastMonthXLSX(req, res))
    );

  }
}