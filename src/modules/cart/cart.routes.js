import { Router } from "express";
import * as cart from './cart.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import { CartSchema, addCartSchema, updateCartSchema } from "./cart.validation.js";
import allowTo from "../../middleware/allowTo.js";

const cartRouter = Router()


cartRouter.route('/')
    .post(Auth(), allowTo('user'), validation(addCartSchema), asyncHandler(cart.addCart))
    .patch(Auth(), allowTo('user'), asyncHandler(cart.applyCoupon))
    .get(Auth(), allowTo('user', 'admin'), asyncHandler(cart.getCart))

cartRouter.get('/allCart', asyncHandler(cart.getAllCart))


cartRouter.route('/:id')
    .put(Auth(), allowTo('user'), validation(updateCartSchema), asyncHandler(cart.updateQuantity))
    .delete(Auth(), allowTo('admin', 'user'), validation(CartSchema), asyncHandler(cart.deleteProductFromCart))






export default cartRouter