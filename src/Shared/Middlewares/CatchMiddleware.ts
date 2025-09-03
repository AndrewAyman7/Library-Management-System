import { NextFunction, Request, Response } from 'express';
import { ClientError, InternalServerException } from '../Utils/ErrorHandling';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((reason: any) => {
      if (!(reason instanceof ClientError)) {
        reason = new InternalServerException(reason.message, reason);
      }

      next(reason);
    });
  };
};