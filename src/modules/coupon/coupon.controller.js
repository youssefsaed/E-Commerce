
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import couponModal from "../../../DB/model/coupon.modal.js"
import QRCode from "qrcode"
import AppError from "../../utils/appError.js"
import Refactor from "../handler/reFactor.js"

const addCoupon = async (req, res, next) => {
    const newCoupon = new couponModal(req.body)
    const Coupon = await newCoupon.save()
    return res.json({ message: 'success', Coupon })
}

const getCoupon = async (req, res, next) => {
    const { id } = req.params
    const Coupon = await couponModal.findById(id)
    if (!Coupon) return next(new AppError('Coupon not found', 404 ))
        const url = await QRCode.toDataURL(Coupon.code)
    return res.json({ message: 'success', Coupon, QRCode: url })
}

const updateCoupon = async (req, res, next) => {
    const { id } = req.params
    const result = await couponModal.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) return next(new AppError('fail', 404 ))
        return res.status(200).json({ message: 'success', result })
}

const getAllCoupon = new Refactor(couponModal).getAll()
const deleteCoupon =new Refactor(couponModal,'Coupon not found').deleteOne()

export {
    addCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}