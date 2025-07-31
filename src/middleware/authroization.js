import jwt from "jsonwebtoken"
import userModal from "../../DB/model/user.modal.js"
import asyncHandler from "../utils/errorHanddling.js"
import AppError from "../utils/appError.js"

const Auth = () => {
    return asyncHandler(async (req, res, next) => {
        const { authroization } = req.headers
        if (!authroization) return next(new AppError('token is provided', 400))
        if (!authroization.startsWith(process.env.BEARER)) return next(new Error('bearer is provided'))
        const decode = jwt.verify(authroization.split('__')[1], process.env.SIGNATURE)
        if (!decode?.id) return next(new AppError('payload is provided', 400))
        const user = await userModal.findById(decode.id)
        if (!user) return next(new AppError('user not found', 404))
        if (user.changePasswordDate) {  //>getTime milliseconds - >decode.iat seconds
            if (parseInt(user.changePasswordDate.getTime() / 1000) > decode.iat)
                return next(new AppError('Invalid token', 401))
        }
        req.user = user
        next()
    })
}

export default Auth


