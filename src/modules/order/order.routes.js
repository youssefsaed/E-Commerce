import { Router } from "express";
import * as order from './order.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import { OrderSchema, cancelOrderScehma } from "./order.validation.js";
import allowTo from "../../middleware/allowTo.js";

const orderRouter = Router()


orderRouter.route('/')
    .get(Auth(), allowTo('user'), asyncHandler(order.getOrder))
orderRouter.get('/orders', asyncHandler(order.getAllOrder))




orderRouter.route('/:id')
    .post(Auth(), allowTo('user'), validation(OrderSchema), asyncHandler(order.order))
orderRouter.post('/checkout/:id', Auth(), allowTo('user'), validation(OrderSchema), asyncHandler(order.creatCheckOutSession))
    .delete(Auth(), allowTo('user'), validation(cancelOrderScehma), asyncHandler(order.cancelOrder))






export default orderRouter