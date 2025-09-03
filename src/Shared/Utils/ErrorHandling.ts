import { StatusCodes } from '../Enums/StatusCodes';
import { IErrorBase } from '../Interfaces/IErrorBase';

export class ClientError implements IErrorBase {
  message: string;
  statusCode: StatusCodes;
  additionalInfo: any;
  name: string;

  constructor(
    message: string,
    statusCode: StatusCodes,
    additionalInfo: any = {},
    name: string = 'BadRequestException',
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.additionalInfo = additionalInfo;
  }
}

export class BadRequestException extends ClientError {
  constructor(message: string, additionalInfo: any = {}, name: string = 'BadRequestException') {
    super(message, StatusCodes.BadRequest, additionalInfo, name);
  }
}

export class UnauthorizedException extends ClientError {
  constructor(message: string, additionalInfo: any = {}) {
    super(message, StatusCodes.UnAuthorized, additionalInfo, 'UnauthorizedException');
  }
}

export class NotFoundException extends ClientError {
  constructor(message: string, additionalInfo: any = {}) {
    super(message, StatusCodes.NotFound, additionalInfo, 'NotFoundException');
  }
}


export class InternalServerException implements IErrorBase {
  message: string;
  statusCode: StatusCodes;
  additionalInfo: any;
  name: string;

  constructor(message: string, additionalInfo: any = {}) {
    this.message = message;
    this.statusCode = StatusCodes.InternalServerError;
    this.name = 'InternalServerException';
    this.additionalInfo = additionalInfo;
  }
}