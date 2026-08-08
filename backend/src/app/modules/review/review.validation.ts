import z from "zod/v3";

export const createReviewValidationSchema = z.object({
  body: z.object({
    listingId: z.string().min(1, "Listing ID is required"),

    rating: z.coerce
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),

    comment: z
      .string()
      .min(5, "Comment must be at least 5 characters")
      .max(500, "Comment cannot exceed 500 characters"),
  }),
});


export const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.coerce
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5")
      .optional(),

    comment: z
      .string()
      .min(5, "Comment must be at least 5 characters")
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),
  }),
});