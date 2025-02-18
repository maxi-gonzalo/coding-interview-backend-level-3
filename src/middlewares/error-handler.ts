import { Request, Response, NextFunction } from 'express';
import { ErrorModel } from './error-model';
import { ErrorCode } from './error-code';
import { ErrorException } from './error-exception';

/**
 * Middleware to handle different kind of errors.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(err: any, req: Request, res: Response) {
  console.log('Error middleware middleware called.');
  console.error('Error:', err);
  console.log('Path:', req.path);
  if (err instanceof ErrorException) {
    console.log('Known Error.');
    res.status(err.status).send(err);
  } else {
    // unhandled errors.
    res.status(500).send({
      code: ErrorCode.UnknownError,
      status: 500,
      message: err.message,
      success: false,
    } as ErrorModel);
  }
}
