import { Router } from "express";
import * as coupon from './coupon.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addcouponSchema, couponSchema, updatecouponSchema } from "./coupon.validation.js";
import allowTo from "../../middleware/allowTo.js";
import Auth from "../../middleware/authroization.js";
const couponRouter = Router()


couponRouter.route('/')
    .post(Auth(), allowTo('admin'), validation(addcouponSchema), asyncHandler(coupon.addCoupon))
    .get(Auth(), allowTo('admin'), asyncHandler(coupon.getAllCoupon))

couponRouter.route('/:id')
    .get(Auth(), allowTo('admin'), validation(couponSchema), asyncHandler(coupon.getCoupon))
    .put(Auth(), allowTo('admin'), validation(updatecouponSchema), asyncHandler(coupon.updateCoupon))
    .delete(Auth(), allowTo('admin'), validation(couponSchema), asyncHandler(coupon.deleteCoupon))






export default couponRouter