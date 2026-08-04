import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { BookingController } from "./booking.controller";
import { createBookingValidation, updateBookingStatusValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth("TOURIST"),
  validateRequest(createBookingValidation),
  BookingController.createBooking
);

router.get(
  "/my-bookings",
  auth("TOURIST"),
  BookingController.getMyBookings
);

router.get(
  "/guide-bookings",
  auth("GUIDE"),
  BookingController.getGuideBookings
);

router.patch(
  "status/:id",
  auth("GUIDE"),
  validateRequest(updateBookingStatusValidation),
  BookingController.updateBookingStatus
);

router.delete(
  "/:id",
  auth("TOURIST"),
  BookingController.cancelBooking
);

export const BookingRoutes = router;