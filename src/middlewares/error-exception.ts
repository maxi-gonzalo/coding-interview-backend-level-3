import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public status: number = null;
  public message: any = null;
  constructor(code: string = ErrorCode.UnknownError, message: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.message = message;
    switch (code) {
      case ErrorCode.Unauthorized:
        this.status = 401;
        break;
      case ErrorCode.BadRequest:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
