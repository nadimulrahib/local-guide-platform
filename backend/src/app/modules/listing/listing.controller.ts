import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ListingService } from "./listing.service";
import { Request, Response } from "express";


const createListing = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

const imageUrls = files.map(file => file.path);

  const payload = {
    ...req.body,
    images: imageUrls,
  };

  console.log(payload,"pay")
  const result = await ListingService.createListing(req.user.userId, payload);


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Listing Created Successfully",
    data: result,
  });
});

const getListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getListing(
req.query
  ); 


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Get all Listings retrieved successfully",
    data: result,
  });
});

const getListingById = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await ListingService.getListingById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Get Single Listing retrieved successfully",
    data: result,
  });
});

const getMyListings = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getMyListings(req.user.guideId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My listings retrieved successfully",
    data: result,
  });
});

const updateListing = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await ListingService.updateListing(id, req.user.userId, req.body); 

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Listing updated successfully",
    data: result,
  });
});

const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await ListingService.deleteListing(id, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Listing deleted successfully",
    data: result,
  });
});

export const ListingController = {
  createListing,
  getListing,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
};
