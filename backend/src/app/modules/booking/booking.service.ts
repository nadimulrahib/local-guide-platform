import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IBooking } from "./booking.interface";
import { BookingStatus } from "@prisma/client";

const createBooking = async (touristId: string, payload: IBooking) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: payload.listingId,
    },
  });

  if (!listing) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing not found");
  }

  const price = Number(listing.price);

  const alreadyBooked = await prisma.booking.findFirst({
    where: {
      touristId,
      listingId: payload.listingId,
      bookingDate: new Date(payload.bookingDate),
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
  });

  if (alreadyBooked) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already booked this tour for this date",
    );
  }

  return prisma.booking.create({
    data: {
      touristId,

      guideId: listing.guideId,

      listingId: payload.listingId,

      bookingDate: new Date(payload.bookingDate),

      numberOfGuests: payload.numberOfGuests,
      totalAmount: price * payload.numberOfGuests,
      status: "PENDING",
    },
  });
};

const getMyBookings = async (touristId: string) => {

  return prisma.booking.findMany({
    where: {
      touristId,
    },
    include: {
      listing: true,
      guide: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getGuideBookings = async (guideId: string) => {

  return prisma.booking.findMany({
    where: {
      guideId,
    },
    include: {
      tourist: true,
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// const updateBookingStatus = async (bookingId: string, status: string) => {
//   const booking = await prisma.booking.findUnique({
//     where: {
//       id: bookingId,
//     },
//   });

//   if (!booking) {
//     throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
//   }

//   return prisma.booking.update({
//     where: {
//       id: bookingId,
//     },
//     data: {
//       status:"PENDING",
//     },
//   });
// };

const updateBookingStatus = async (
  bookingId: string,
  guideId: string,
  status: BookingStatus,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  if (booking.guideId !== guideId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status,
    },
  });
};

const cancelBooking = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
};

export const BookingService = {
  createBooking,
  getMyBookings,
  getGuideBookings,
  updateBookingStatus,
  cancelBooking,
};
