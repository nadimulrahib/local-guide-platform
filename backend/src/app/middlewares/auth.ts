import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../config";
import AppError from "../errors/AppError";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    req.user = decoded;

    if (roles.length && !roles.includes(decoded.role)) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
    }

    next();
  };
};

export default auth;