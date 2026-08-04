import { is } from "zod/locales";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IListing } from "./listing.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";

const createListing = async (userId: string, payload: IListing) => {
  return prisma.listing.create({
    data: {
      ...payload,
      guideId: userId,
    },
  });
};

const getListing = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(query)
    .search(["title", "description"])
    .filter();

  const { skip, take } = queryBuilder.paginate();
  const page = Number(query.page) || 1;
  const limit = take;

  const where = (queryBuilder as any).where;

  const result = await prisma.listing.findMany({
    where,
    skip,
    take: limit,
    orderBy: queryBuilder.sort(),
    include: {
      guide: {
        select: {
          id: true,
          name: true,
          profileImage: true,
          averageRating: true,
        },
      },
    },
  });

  const total = await prisma.listing.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const getListingById = async (id: string) => {
  return prisma.listing.findUnique({
    where: { id },
    include: {

      guide: {
        select: {
          id: true,
          name: true,
          profileImage: true,
          averageRating: true,
        },
      },
      reviews:true
    } , 
  });
}

const getMyListings = async (guideId: string) => {
  // console.log(guideId,'guideId')
  return prisma.listing.findMany({
    where: { guideId:guideId },
  });
};

const updateListing = async (id: string, userId: string, payload: Partial<IListing>) => {

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    throw new AppError(404, "Listing not found");
  }

  if (listing.guideId !== userId) {
    throw new AppError(403, "You are not authorized to update this listing");
  }

  return prisma.listing.update({
    where: { id },
    data: payload,
  });
}

const deleteListing = async (id: string, userId: string) => {

  const listing = await prisma.listing.findUnique({
    where: { id },
  });


  if (!listing) {
    throw new AppError(404, "Listing not found");
  }

  if (listing.guideId !== userId) {
    throw new AppError(403, "You are not authorized to delete this listing");
  }

  return prisma.listing.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
}

export const ListingService = {
  createListing,
  getListing,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
};

