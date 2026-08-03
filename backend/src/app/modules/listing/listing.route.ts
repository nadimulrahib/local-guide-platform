import express from "express";

import auth from "../../middlewares/auth";

import { ListingController } from "./listing.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createListingValidationSchema } from "./listing.validation";
import { upload } from "../../middlewares/multer";
import parseFormData from "../../middlewares/parsedData";

const router = express.Router();

router.post(
  "/create-listing",
  auth("GUIDE"),
  upload.array("images", 5),
  parseFormData,
  validateRequest(createListingValidationSchema),
  ListingController.createListing
);

export const ListingRoutes = router;