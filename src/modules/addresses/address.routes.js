import { Router } from "express";
import * as address from './address.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
import { addAddressSchema, removeAddressSchema } from "./address.validation.js";

const addressRouter = Router()


addressRouter.route('/')
    .patch(Auth(), allowTo('user'), validation(addAddressSchema), asyncHandler(address.addAddress))
    .get(Auth(), allowTo('user'), asyncHandler(address.getAddressWithUser))

addressRouter.route('/:id')
    .delete(Auth(), allowTo('user'), validation(removeAddressSchema), asyncHandler(address.removeAddress))


export default addressRouter