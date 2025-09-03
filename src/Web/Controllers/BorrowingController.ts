import { Request, Response } from "express";
import { BorrowingService } from "../../BL/Services/BorrowingService";
import { ResponseHandlingService } from "../../Shared/Services/ResponseHandlingService";
import { StatusCodes } from "../../Shared/Enums/StatusCodes";

export class BorrowingController {
  private readonly borrowingService: BorrowingService;

  constructor() {
    this.borrowingService = new BorrowingService();
  }

  async borrowBook(req: Request, res: Response) {
    const { bookId, borrowerId, dueDate } = req.body;
    const result = await this.borrowingService.borrowBook(bookId, borrowerId, dueDate);
    return new ResponseHandlingService(res, result, StatusCodes.Created);
  }

  async returnBook(req: Request, res: Response) {
    const recordId = parseInt(req.params.id!, 10);
    const result = await this.borrowingService.returnBook(recordId);
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  async getBorrowerBooks(req: Request, res: Response) {
    const borrowerId = parseInt(req.params.id!, 10);
    const results = await this.borrowingService.getBorrowerBooks(borrowerId);
    return new ResponseHandlingService(res, results, StatusCodes.OK);
  }

  async getOverdueBooks(req: Request, res: Response) {
    const results = await this.borrowingService.getOverdueBooks();
    return new ResponseHandlingService(res, results, StatusCodes.OK);
  }
}
