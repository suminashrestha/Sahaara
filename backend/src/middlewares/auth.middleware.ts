import { NextFunction, Request, Response } from "express";

const authenticateWithJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { authenticateWithJwt };
