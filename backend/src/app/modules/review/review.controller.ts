import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ReviewService } from "./review.service";
import { Request, Response } from "express";

const createReview = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.createReview(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

const getListingReviews = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.getListingReviews(
    req.params.listingId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getMyReviews = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.getMyReviews(
    req.user.userId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My reviews retrieved successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.updateReview(
    req.params.id as string,
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.deleteReview(
    req.params.id as string,
    req.user.userId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review deleted successfully",
    data: result,
  });
});

const getListingRating = catchAsync(async (req:Request, res:Response) => {
  const result = await ReviewService.getListingRating(
    req.params.listingId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Listing rating retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getListingReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getListingRating,
};