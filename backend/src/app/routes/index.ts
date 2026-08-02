import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";

const router = express.Router();

router.use("/auth", AuthRoutes);

export default router;