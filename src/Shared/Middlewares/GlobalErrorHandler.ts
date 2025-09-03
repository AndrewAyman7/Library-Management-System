import { NextFunction, Request, Response } from 'express';
import { IErrorBase } from '../../Shared/Interfaces/IErrorBase';
import { InternalServerException } from '../Utils/ErrorHandling';

export const globalErrorHandler = (
  error: IErrorBase,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(error instanceof InternalServerException)) {
    return res.status(error.statusCode).json({ ...error });
  }
  console.log(error, 'ERROR');

  res.status(error.statusCode).json({ ...error });
};
