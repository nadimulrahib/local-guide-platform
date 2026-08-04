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

router.get(
  "/",
  ListingController.getListing
);

router.get(
  "/:id",
  ListingController.getListingById
);

router.get(
  "/my-listings",
  auth("GUIDE"),
  ListingController.getMyListings
);

router.patch(
  "/:id",
  auth("GUIDE"),
  upload.array("images", 5),
  parseFormData,
  ListingController.updateListing
);

router.delete(
  "/:id",
  auth("GUIDE"),
  ListingController.deleteListing
);

export const ListingRoutes = router;