import { Request, Response } from 'express';
import { BorrowerService } from '../../BL/Services/BorrowerService';
import { ResponseHandlingService } from '../../Shared/Services/ResponseHandlingService';
import { StatusCodes } from '../../Shared/Enums/StatusCodes';

export class BorrowerController {
  private readonly service: BorrowerService;

  constructor() {
    this.service = new BorrowerService();
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
    return new ResponseHandlingService(res, { message: 'Borrower updated' }, StatusCodes.OK);
  }

  public async delete(req: Request, res: Response) {
    await this.service.delete(Number(req.params.id));
    return new ResponseHandlingService(res, { message: 'Borrower deleted' }, StatusCodes.OK);
  }
}