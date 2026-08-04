import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { ListingRoutes } from "../modules/listing/listing.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/listings", ListingRoutes);
router.use("/bookings", BookingRoutes);

export default router;