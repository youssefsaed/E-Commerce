import jwt from "jsonwebtoken"
import userModal from "../../DB/model/user.modal.js"
import asyncHandler from "../utils/errorHanddling.js"

const Auth = () => {
    return asyncHandler(async (req, res, next) => {
        const { authroization } = req.headers
        if (!authroization) return next(new Error('token is provided'))
        if (!authroization.startsWith(process.env.BEARER)) return next(new Error('bearer is provided'))
        const decode = jwt.verify(authroization.split('__')[1], process.env.SIGNATURE)
        if (!decode?.id) return next(new Error('payload is provided'))
        const user = await userModal.findById(decode.id)
        if (!user) return next(new Error('user not found', { cause: 404 }))
        if (user.changePasswordDate) {  //>getTime milliseconds - >decode.iat seconds
            if (parseInt(user.changePasswordDate.getTime() / 1000) > decode.iat)
                return next(new Error('Invalid token', { cause: 401 }))
        }
        req.user = user
        next()
    })
}

export default Auth


