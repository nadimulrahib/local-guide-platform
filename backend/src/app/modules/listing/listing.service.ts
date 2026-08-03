import { prisma } from "../../config/prisma";

const createListing = async (userId: string, payload: any) => {
  return prisma.listing.create({
    data: {
      ...payload,
      guideId: userId,
    },
  });
};

const getListing = async () => {
  const listings = await prisma.listing.findMany({
    include: {
      guide: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });
  return listings;
};

export const ListingService = {
  createListing,
  getListing,
};
