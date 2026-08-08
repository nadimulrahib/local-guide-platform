import httpStatus from "http-status";

import AppError from "../../errors/AppError";

import { ICreateReview } from "./review.interface";
import { prisma } from "../../config/prisma";

const createReview = async (
  touristId: string,
  payload: ICreateReview
) => {
  const { listingId, rating, comment } = payload;

  // 1. Check listing
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Listing not found"
    );
  }

  // 2. Check completed booking
  const booking = await prisma.booking.findFirst({
    where: {
      touristId,
      listingId,
      status: "COMPLETED",
    },
  });

  if (!booking) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can review only after completing the tour"
    );
  }

  // 3. Check duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      touristId_listingId: {
        touristId,
        listingId,
      },
    },
  });

  if (existingReview) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this tour"
    );
  }

  // 4. Create review
  const review = await prisma.review.create({
    data: {
      touristId,
      listingId,
      guideId: booking.guideId,
      rating,
      comment,
    },
  });

  return review;
};


const getListingReviews = async (listingId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      listingId,
    },

    include: {
      tourist: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};


const getMyReviews = async (touristId: string) => {
  return prisma.review.findMany({
    where: {
      touristId,
    },

    include: {
      listing: {
        select: {
          id: true,
          title: true,
          images: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};


const updateReview = async (
  reviewId: string,
  touristId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Review not found"
    );
  }

  if (review.touristId !== touristId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to update this review"
    );
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });

  return updatedReview;
};

const deleteReview = async (
  reviewId: string,
  touristId: string
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Review not found"
    );
  }

  if (review.touristId !== touristId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to delete this review"
    );
  }

  return prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
};

const getListingRating = async (listingId: string) => {
  const result = await prisma.review.aggregate({
    where: {
      listingId,
    },

    _avg: {
      rating: true,
    },

    _count: {
      rating: true,
    },
  });

  return {
    averageRating: result._avg.rating ?? 0,
    totalReviews: result._count.rating,
  };
};

export const ReviewService = {
  createReview,
  getListingReviews,
  getMyReviews,
  getListingRating,
  updateReview,
  deleteReview,
};