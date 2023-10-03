import jwt from "jsonwebtoken"
import userModal from "../../../DB/model/user.modal.js"

const signUp = async (req, res, next) => {

    const isExist = await userModal.findOne({ email: req.body.email })
    if (isExist) next(new Error('email is exist', { cause: 409 }))
    const newUser = new userModal(req.body)
    const user = await newUser.save()
    return res.status(201).json({ message: 'success', user })
}


const signIn = async (req, res, next) => {
    const user = await userModal.findOne({ email: req.body.email })
    if (!user) next(new Error('email not exist'))
    if (!user.cheackPassword(req.body.password)) return next(new Error('email or password Invalid', { cause: 400 }))
    const token = jwt.sign({ id: user._id }, process.env.SIGNATURE)
    return res.status(200).json({ message: 'success', token })
}

export {
    signUp,
    signIn
}