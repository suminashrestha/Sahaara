import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the error for debugging
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
  });
};

export default errorHandler;
