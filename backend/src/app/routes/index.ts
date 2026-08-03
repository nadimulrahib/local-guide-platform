import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { ListingRoutes } from "../modules/listing/listing.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/listings", ListingRoutes);

export default router;