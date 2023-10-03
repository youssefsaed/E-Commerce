import { Router } from "express";
import * as wishlist from './wishlist.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
import { wishlistSchema } from "./wishlist.validation.js";
const wishlistRouter = Router()


wishlistRouter.route('/')
    .get(Auth(),allowTo('user'),asyncHandler(wishlist.getWishlistWithUser))

wishlistRouter.route('/:id')
    .patch(Auth(), allowTo('user'),validation(wishlistSchema), asyncHandler(wishlist.addWishlist))
    .delete(Auth(), allowTo('user'),validation(wishlistSchema), asyncHandler(wishlist.removeWishlist))


export default wishlistRouter