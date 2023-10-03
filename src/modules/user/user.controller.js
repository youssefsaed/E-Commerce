import { ApiFeatures } from "../../utils/ApiFeatures.js"
import userModal from "../../../DB/model/user.modal.js"
import bcrypt from 'bcryptjs'

const getAllUser = async (req, res, next) => {

    const apiFeatures = new ApiFeatures(userModal.find({}), req.query)
        .paginate().filter().sort().search().fields()
    const users = await apiFeatures.reuseQuery
    return res.json({ message: 'success', users })
}


const getUser = async (req, res, next) => {
    const user = await userModal.findById(req.params.id)
    if (!user) return next(new Error('user not found', { cause: 404 }))
    return res.json({ message: 'success', user })
}

const updateUser = async (req, res, next) => {
    const { _id } = req.user
    const result = await userModal.findByIdAndUpdate(_id, req.body, { new: true })
    if (!result) return next(new Error('user not found', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteUser = async (req, res, next) => {
    const { _id } = req.user
    const result = await userModal.findByIdAndDelete(_id)
    if (!result) return next(new Error('user not found', { cause: 404 }))
    return res.json({ message: 'success' })
}
const changePassword = async (req, res, next) => {
    const { _id } = req.user
    req.body.password = bcrypt.hashSync(req.body.password, +process.env.SALTROUND)
    req.body.changePasswordDate = Date.now()
    const result = await userModal.findByIdAndUpdate(_id, req.body, { new: true })
    if (!result) return next(new Error('fail', { cause: 400 }))
    return res.json({ message: 'success' })
}

export {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    changePassword
}