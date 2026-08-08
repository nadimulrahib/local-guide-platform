import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { ReviewController } from "./review.controller";
import { createReviewValidationSchema, updateReviewValidationSchema } from "./review.validation";

const router = express.Router();

router.post(
  "/create-review",
  auth("TOURIST"),
  validateRequest(createReviewValidationSchema),
  ReviewController.createReview
);

router.get(
  "/my-reviews",
  auth("TOURIST"),
  ReviewController.getMyReviews
);

router.get(
  "/:listingId",
  ReviewController.getListingReviews
);
router.get(
  "/rating/:listingId",
  ReviewController.getListingRating
);


router.patch(
  "/:id",
  auth("TOURIST"),
  validateRequest(updateReviewValidationSchema),
  ReviewController.updateReview
);

router.delete(
  "/:id",
  auth("TOURIST"),
  ReviewController.deleteReview
);



export const ReviewRoutes = router;