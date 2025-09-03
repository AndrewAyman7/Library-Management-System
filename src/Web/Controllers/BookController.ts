import { Request, Response } from 'express';
import { BookService } from '../../BL/Services/BookService';
import { StatusCodes } from '../../Shared/Enums/StatusCodes';
import { ResponseHandlingService } from '../../Shared/Services/ResponseHandlingService';

export class BookController {
  private readonly service: BookService;

  constructor() {
    this.service = new BookService();
  }

  public async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    return new ResponseHandlingService(res, result, StatusCodes.Created);
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.service.getAll();
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  public async getById(req: Request, res: Response) {
    const result = await this.service.getById(Number(req.params.id));
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  public async update(req: Request, res: Response) {
    await this.service.update(Number(req.params.id), req.body);
    return new ResponseHandlingService(res, { message: 'Book updated' }, StatusCodes.OK);
  }

  public async delete(req: Request, res: Response) {
    await this.service.delete(Number(req.params.id));
    return new ResponseHandlingService(res, { message: 'Book deleted' }, StatusCodes.OK);
  }

  public async search(req: Request, res: Response) {
    const query = req.query.q as string;
    const result = await this.service.search(query);
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }
}
