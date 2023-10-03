import asyncHandler from "../utils/errorHanddling.js"

const allowTo = (...role) => {
    return asyncHandler(async (req, res, next) => {
        if (!role.includes(req.user.role)) return next(new Error('not authoraized'))
        next()
    })
}

export default allowTo