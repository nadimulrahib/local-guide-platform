import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AuthService } from "./auth.service";

const register = catchAsync(async (req: any, res: any) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Registered Successfully",
    data: result,
  });
});

const login = catchAsync(async (req: any, res: any) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req:any, res:any) => {
  const result = await AuthService.getMyProfile(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile Retrieved Successfully",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  getMyProfile
};