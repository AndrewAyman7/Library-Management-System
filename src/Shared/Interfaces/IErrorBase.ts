import { StatusCodes } from '../Enums/StatusCodes';

export interface IResponseBase {
  message: string;
}

export interface IErrorBase extends IResponseBase {
  message: string;
  statusCode: StatusCodes;
  additionalInfo: any;
}
