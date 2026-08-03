import { AnyZodObject } from "zod/v3";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
      query: req.query,
    });

    req.body = result.body;
    next();
  });
};

export default validateRequest;