import { NextFunction, Request, Response } from 'express';
import * as core from 'express-serve-static-core';

export type AsyncController<
  ReqBody = any,
  ResBody = any,
  Params = core.ParamsDictionary,
  Query = qs.ParsedQs,
> = (
  req: Request<Params, any, ReqBody, Query>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<Response>;
