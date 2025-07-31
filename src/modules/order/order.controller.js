import cartModal from "../../../DB/model/cart.modal.js"
import orderModal from "../../../DB/model/order.modal.js"
import productModal from "../../../DB/model/product.modal.js"
import AppError from "../../utils/appError.js";
import Refactor from "../handler/reFactor.js";


const cashOrder = async (req, res, next) => {
    const cart = await cartModal.findById(req.params.id)
    if (!cart) return next(new AppError('Your Not have cart', 404))

    const newOrder = orderModal({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body,
        totalOrderPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    })
    const order = await newOrder.save()
    if (order) {
        let options = cart.cartItems.map(item => ({

            updateOne: {
                "filter": { _id: item.product },
                "update": { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }

        }))
        await productModal.bulkWrite(options)
        await cartModal.findByIdAndDelete(req.params.id)
        return res.status(201).json({ message: "success", order: order })
    }
}

const getOrder = async (req, res, next) => {
    const order = await orderModal.findOne({ user: req.user._id })
    return res.status(200).json({ message: "success", order: order })
}

const cancelOrder = async (req, res, next) => {
    const isCancel = await orderModal.findOneAndDelete({ user: req.user._id, _id: req.params.id })
    if (!isCancel) return next(new AppError('fail', 401))
    return res.status(200).json({ message: 'success' })
}

const getAllOrder = new Refactor(orderModal).getAll()


export {
    cashOrder,
    getOrder,
    getAllOrder,
    cancelOrder,
} 