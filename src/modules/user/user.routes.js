import { Router } from "express";
import * as user from './user.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import Auth from "../../middleware/authroization.js";
import { addUserSchema, changePasswordSchema, forgetPasswordSchema, resetPasswordSchema, updateUserSchema, userSchema } from "./user.validation.js";
import allowTo from "../../middleware/allowTo.js";
const userRouter = Router()


userRouter.route('/')
    .post(Auth(), allowTo('superAdmin'), validation(addUserSchema), asyncHandler(user.addUser))
    .get(Auth(), allowTo('superAdmin'), asyncHandler(user.getAllUser))
    .put(Auth(), validation(updateUserSchema), asyncHandler(user.updateUser))
    .delete(Auth(), allowTo('superAdmin'),validation(userSchema), asyncHandler(user.deleteUser))
    .patch(Auth(), validation(changePasswordSchema), user.changePassword)
userRouter.patch('/forgetpassword', validation(forgetPasswordSchema), user.forgetPassword)
userRouter.patch('/resetpassword/:token', validation(resetPasswordSchema), user.resetPassword)


userRouter.route('/:id')
    .get(validation(userSchema), asyncHandler(user.getUser))





export default userRouter