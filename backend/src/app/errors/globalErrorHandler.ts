import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = 500;

  let message = "Something Went Wrong";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;