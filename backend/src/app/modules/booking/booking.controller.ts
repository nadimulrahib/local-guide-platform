import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking request sent successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getMyBookings(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My bookings retrieved successfully",
    data: result,
  });
});

const getGuideBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getGuideBookings(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Guide bookings retrieved successfully",
    data: result,
  });
});

// const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const result = await BookingService.updateBookingStatus(
//     Array.isArray(id) ? id[0] : id,
//     status,
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Booking status updated successfully",
//     data: result,
//   });
// });


const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookingId = Array.isArray(id) ? id[0] : id;

  const result = await BookingService.updateBookingStatus(
    bookingId,
    req.user.userId,
    req.body.status
    
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking status updated successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookingId = Array.isArray(id) ? id[0] : id;

  const result = await BookingService.cancelBooking(bookingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getMyBookings,
  getGuideBookings,
  updateBookingStatus,
  cancelBooking,
};
