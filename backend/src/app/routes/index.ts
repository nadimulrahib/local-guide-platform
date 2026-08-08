import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { ListingRoutes } from "../modules/listing/listing.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ReviewRoutes } from "../modules/review/review.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/listings", ListingRoutes);
router.use("/bookings", BookingRoutes);
router.use("/reviews", ReviewRoutes);

export default router;