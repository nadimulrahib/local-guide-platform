import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ListingService } from "./listing.service";


const createListing = catchAsync(async (req: any, res: any) => {
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

export const ListingController = {
  createListing,
};