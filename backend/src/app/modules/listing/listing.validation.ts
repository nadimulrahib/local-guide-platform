import z from "zod/v3";

export const createListingValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long")
      .max(150),

    slug: z
      .string()
      .min(3)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase and hyphen-separated"
      ),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),

    itinerary: z
      .string()
      .min(20, "Itinerary must be at least 20 characters"),

    city: z
      .string()
      .min(2)
      .max(100),

    category: z
      .string()
      .min(2)
      .max(100),

    meetingPoint: z
      .string()
      .min(5)
      .max(200),

    duration: z
      .number()
      .int()
      .positive("Duration must be greater than 0"),

    maxGroupSize: z
      .number()
      .int()
      .positive("Max group size must be greater than 0"),

    price: z
      .number()
      .positive("Price must be greater than 0"),

    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one image is required").optional(),

    isActive: z.boolean().optional(),

    guideId: z.string().cuid("Invalid Guide ID"),
  }),
});