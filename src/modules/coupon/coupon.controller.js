
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import couponModal from "../../../DB/model/coupon.modal.js"
import QRCode from "qrcode"
const addCoupon = async (req, res, next) => {
    const newCoupon = new couponModal(req.body)
    const Coupon = await newCoupon.save()
    return res.json({ message: 'success', Coupon })
}

const getAllCoupon = async (req, res, next) => {
    const apiFeatures = new ApiFeatures(couponModal.find(), req.query)
        .paginate().filter().sort().search().fields()
    const Coupons = await apiFeatures.reuseQuery
    return res.json({ message: 'success', page: apiFeatures.page, Coupons })
}


const getCoupon = async (req, res, next) => {
    const { id } = req.params
    const Coupon = await couponModal.findById(id)
    if (!Coupon) return next(new Error('Coupon not found', { cause: 404 }))
    const url = await QRCode.toDataURL(Coupon.code)
    return res.json({ message: 'success', Coupon, QRCode: url })
}

const updateCoupon = async (req, res, next) => {
    const { id } = req.params
    const result = await couponModal.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) return next(new Error('fail', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteCoupon = async (req, res, next) => {
    const { id } = req.params
    const result = await couponModal.findByIdAndDelete(id)
    if (!result) return next(new Error('fail', { cause: 404 }))
    return res.json({ message: 'success', result })
}

export {
    addCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}