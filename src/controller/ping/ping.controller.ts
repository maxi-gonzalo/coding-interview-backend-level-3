import { Request, Response } from 'express';

/**
 * Get Ping api status
 *
 * @param req
 * @param res
 * @returns
 */
export const getPingResponse = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
};
