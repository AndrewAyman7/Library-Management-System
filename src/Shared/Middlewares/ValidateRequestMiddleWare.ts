import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '../Utils/ErrorHandling';



export const validateRequest =
  <T extends object>(dto: new () => T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const modelDTO: T = plainToInstance(dto, req.body);

    const errors: ValidationError[] = await validate(modelDTO);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => ({
        property: error.property,
        message: Object.values(error.constraints || {})[0],
      }));

      return next(new BadRequestException('Invalid Data', errorMessages));
    }

    req.body = modelDTO;
    next();
  };
