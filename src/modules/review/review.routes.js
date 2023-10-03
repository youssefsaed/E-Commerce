import { Router } from "express";
import * as review from './review.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
import { addReviewSchema, reviewSchema, updateReviewSchema } from "./review.validation.js";
const reviewRouter = Router()


reviewRouter.route('/')
    .get(asyncHandler(review.getAllReview))
    .post(Auth(), validation(addReviewSchema), asyncHandler(review.addReview))

reviewRouter.route('/:id')
    .put(Auth(), allowTo('user'), validation(updateReviewSchema), asyncHandler(review.updateReview))
    .delete(Auth(), allowTo('admin', 'user'), validation(reviewSchema), asyncHandler(review.deleteReview))

reviewRouter.get('/getReview/:id',validation(reviewSchema), asyncHandler(review.getReview))
export default reviewRouter