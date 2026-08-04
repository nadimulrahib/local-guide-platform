import { is } from "zod/locales";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IListing } from "./listing.interface";

const createListing = async (userId: string, payload: IListing) => {
  return prisma.listing.create({
    data: {
      ...payload,
      guideId: userId,
    },
  });
};

const getListing = async (query: Record<string, any>) => {
  const {
    searchTerm,
    city,
    category,
    minPrice,
    maxPrice,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const where: any = {
    isActive: true,
  };

  if (city) where.city = city;
  if (category) where.category = category;

  if (searchTerm) {
    where.OR = [
      {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const result = await prisma.listing.findMany({
    where,

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    orderBy: {
      [sortBy]: sortOrder,
    },

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

  const total = await prisma.listing.count({ where });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
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

const getMyListings = async (userId: string) => {
  return prisma.listing.findMany({
    where: { guideId: userId },
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

