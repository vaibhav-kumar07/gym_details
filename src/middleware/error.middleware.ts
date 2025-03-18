import { Request, Response, NextFunction } from "express";
import { ValidationError, BusinessError } from "../utils/error.utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    console.log("Validation Error", err);
    return res.status(400).json({
      status: false,
      error: "Validation Error",
      details: err.details,
    });
  }

  if (err instanceof BusinessError) {
    return res.status(400).json({
      status: false,
      error: err.message,
    });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({
    status: false,
    error: "Something went wrong. Please try again later ",
  });
};

export const tryCatchHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
