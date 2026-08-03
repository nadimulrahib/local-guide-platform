import { prisma } from "../../config/prisma";

const createListing = async (
  userId: string,
  payload: any
) => {
  return prisma.listing.create({
    data: {
      ...payload,
      guideId: userId,
    },
  });
};

export const ListingService = {
  createListing,
};