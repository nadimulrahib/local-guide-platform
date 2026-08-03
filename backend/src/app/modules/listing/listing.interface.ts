import { Decimal } from "@prisma/client/runtime/client";

export interface IListing {
  title: string;
  slug: string;
  description: string;
  itinerary: string;
  city: string;
  category: string;
  meetingPoint: string;
  duration: number;
  maxGroupSize: number;
  price: Decimal | number;
  images: string[];
  isActive?: boolean;
  guideId: string;
}