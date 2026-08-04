import z from "zod/v3";

export const createBookingValidation = z.object({
  body: z.object({
    listingId: z.string(),
    bookingDate: z.string(),
    numberOfGuests: z.coerce.number().min(1),
  }),
});


export const updateBookingStatusValidation = z.object({
  body: z.object({
    status: z.enum([
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
    ]),
  }),
});