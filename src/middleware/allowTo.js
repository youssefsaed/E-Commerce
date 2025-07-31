import AppError from "../utils/appError.js"
import asyncHandler from "../utils/errorHanddling.js"

const allowTo = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to perform this action. you are ' + req.user.role, 401))
        return next()
    })
}



export default allowTo