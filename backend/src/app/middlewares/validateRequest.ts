import { AnyZodObject } from "zod/v3";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
    });

    next();
  };

export default validateRequest;