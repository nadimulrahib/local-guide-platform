import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../../config";
import AppError from "../../errors/AppError";
import { prisma } from "../../config/prisma";


const registerUser = async (payload: any) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return user;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password doesn't match");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_secret as jwt.Secret,
    {
      expiresIn: config.jwt_expires_in as jwt.SignOptions["expiresIn"],
    }
  );

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};