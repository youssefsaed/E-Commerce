import { Router } from "express";
import * as user from './user.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
import { changePasswordSchema, updateUserSchema, userSchema } from "./user.validation.js";
const userRouter = Router()


userRouter.route('/')
    .get(asyncHandler(user.getAllUser))
    .put(Auth(), allowTo('admin', 'user'), validation(updateUserSchema), asyncHandler(user.updateUser))
    .delete(Auth(), allowTo('admin', 'user'), asyncHandler(user.deleteUser))
    .patch(Auth(), allowTo('admin', 'user'), validation(changePasswordSchema), user.changePassword)


userRouter.route('/:id')
    .get(validation(userSchema),asyncHandler(user.getUser))





export default userRouter