import { Router } from "express";
import * as authController from './auth.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";
const authRouter = Router()




authRouter.route('/signup')
.post(
        validation(signUpSchema),
        asyncHandler(authController.signUp)
)

authRouter.route('/signin')
.post(
        validation(signInSchema),
        asyncHandler(authController.signIn)
)










export default authRouter