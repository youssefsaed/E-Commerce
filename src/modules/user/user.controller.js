import userModal from "../../../DB/model/user.modal.js"
import bcrypt from 'bcryptjs'
import AppError from "../../utils/appError.js"
import OTP from "../../utils/otp.js"
import jwt from "jsonwebtoken"
import sendEmail from "../../services/nodemailer.js"
import Refactor from "../handler/reFactor.js"

const addUser = async (req, res, next) => {
    if (await userModal.findOne({ email: req.body.email })) return next(new AppError('email is exist ', 409))
    const newUser = new userModal(req.body)
    const user = await newUser.save()
    return res.status(200).json({ message: 'success', user })
}


const updateUser = async (req, res, next) => {
    const { _id } = req.user
    const result = await userModal.findByIdAndUpdate(_id, req.body, { new: true })
    if (!result) return next(new AppError('user not found', 404))
    return res.status(200).json({ message: 'success', result })
}

const deleteUser = async (req, res, next) => {
    const deleted = await userModal.findByIdAndDelete(req.body.id)
    if (!deleted) return next(new AppError('user not found', 404))
    return res.json({ message: 'success' })
}

const changePassword = async (req, res, next) => {
    const { _id } = req.user
    req.body.password = bcrypt.hashSync(req.body.password, +process.env.SALTROUND)
    req.body.changePasswordDate = Date.now()
    const result = await userModal.findByIdAndUpdate(_id, req.body, { new: true })
    if (!result) return next(new AppError('fail', 400))
    return res.json({ message: 'success' })
}

const forgetPassword = async (req, res, next) => {
    const code = OTP()
    const user = await userModal.findOne({ email: req.body.email })
    if (!user) return next(new AppError('user not found', 404))
    const send = await sendEmail({ email: req.body.email, code })
    if (!send) return next(new AppError('fail to send', 404))
    user.codeVerify = code
    await user.save()
    const token = jwt.sign({ email: req.body.email }, process.env.SIGNATURE)
    res.redirect(`${process.env.BASE_URL}api/v1/users/resetpassword/${token}`)
}

const resetPassword = async (req, res, next) => {
    const decode = jwt.verify(req.params.token, process.env.SIGNATURE)
    const updated = await userModal.findOneAndUpdate(
        {
            email: decode.email,
            codeVerify: req.body.code
        },
        {
            password: bcrypt.hashSync(req.body.password, +process.env.SALTROUND),
            changePasswordDate: Date.now(),
            $unset: { codeVerify: "" }
        })

    if (!updated) return next(new AppError('fail', 404))
    return res.status(200).json({ message: 'success' })
}


const getUser = new Refactor(userModal, 'user not found').getSpecificDocument()
const getAllUser = new Refactor(userModal).getAll()

export {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    changePassword,
    forgetPassword,
    resetPassword
}