import express from "express";

import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidation,
  registerValidation,
} from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerValidation),
  AuthController.register
);

router.post(
  "/login",
  validateRequest(loginValidation),
  AuthController.login
);

router.get("/me",auth("ADMIN","GUIDE","TOURIST"), AuthController.getMyProfile);

export const AuthRoutes = router;