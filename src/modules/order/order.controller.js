import cartModal from "../../../DB/model/cart.modal.js"
import orderModal from "../../../DB/model/order.modal.js"
import productModal from "../../../DB/model/product.modal.js"

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NwQeWL1NFd8HSBzXcfSoplxmfU8O1qh1FpU1R01m7glYg4vISQZS254NCztDbnyG0FKql4Rdbq1BG5OybvcKpbb003xiII0kF');

const order = async (req, res, next) => {
    const cart = await cartModal.findById(req.params.id)

    if (!cart) return next(new Error('Your Not have cart'))

    const newOrder = orderModal({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
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
        await cartModal.findByIdAndDelete(req.params.id)
        await productModal.bulkWrite(options)
        return res.status(201).json({ message: "success", order: order })
    }
}

const getOrder = async (req, res, next) => {
    const order = await orderModal.findOne({ user: req.user._id }).populate('cartItems.product')
    return res.status(201).json({ message: "success", order: order })
}

const getAllOrder = async (req, res, next) => {
    const orders = await orderModal.find({}).populate('cartItems.product').populate('user', 'name')
    return res.status(201).json({ message: "success", orders: orders })
}
const cancelOrder = async (req, res, next) => {
    const isCancel = await orderModal.findOneAndDelete({ user: req.user._id, _id: req.params.id })
    if (!isCancel) return next(new Error('fail', { cause: 401 }))
    return res.status(200).json({ message: 'success' })
}

const creatCheckOutSession = async (req, res, next) => {
    const cart = await cartModal.findById(req.params.id)
    if (!cart) return next(new Error('you not have cart'))
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount * 100 : cart.totalPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        customer_email: req.user.email,
        client_reference_id: cart._id,
        metadata: req.body.shippingAddress,
        success_url: `https://routeegy.github.io/Ecommerce/order`,
        cancel_url: `https://routeegy.github.io/Ecommerce/cart`,
    });
    return res.status(200).json({ message: 'success', session })
}

export {
    order,
    getOrder,
    getAllOrder,
    cancelOrder,
    creatCheckOutSession
} 