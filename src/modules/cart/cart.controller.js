import cartModal from "../../../DB/model/cart.modal.js"
import couponModal from "../../../DB/model/coupon.modal.js"
import productModal from "../../../DB/model/product.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

function totalCalc(cart) {
    let totalPrice = 0
    if (!cart.cartItems.length) {
        cart.totalPrice = 0
    }
    cart.cartItems.map(elm => {
        totalPrice += elm.quantity * elm.price
        cart.totalPrice = totalPrice
    })

}
const addCart = async (req, res, next) => {
    const product = await productModal.findById(req.body.product)
    if (!product) return next(new Error('product not found', { cause: 404 }))
    req.body.price = product.price
    const checkCart = await cartModal.findOne({ user: req.user._id })
    if (!checkCart) {
        const cart = new cartModal({ user: req.user._id, cartItems: [req.body] })
        totalCalc(cart)
        await cart.save()
        return res.json({ message: 'success', cart })
    }
    const cartItem = checkCart.cartItems.find(elm => elm.product == req.body.product)
    if (cartItem) {
        cartItem.quantity += req.body.quantity || 1
    }
    else {
        checkCart.cartItems.push(req.body)
    }

    totalCalc(checkCart)

    if (checkCart.discount) {
        checkCart.totalPriceAfterDiscount = checkCart.totalPrice - (checkCart.totalPrice * checkCart.discount) / 100
    }
    await checkCart.save()
    return res.json({ message: 'success', cart: checkCart })

}

const deleteProductFromCart = async (req, res, next) => {
    const checkCart = await cartModal.findOne({ user: req.user._id })
    if (!checkCart) return next(new Error('cart not found', { cause: 404 }))

    const cartItem = checkCart.cartItems.find(elm => elm._id == req.params.id)
    if (!cartItem) return next(new Error('cart item not found', { cause: 404 }))

    const cart = await cartModal.findOneAndUpdate({ user: req.user._id }, {
        $pull:
            { cartItems: { _id: req.params.id } }
    }, { new: true })

    totalCalc(cart)

    if (cart.discount) {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
    }
    await cart.save()
    return res.json({ message: 'success', cart: cart })
}


const updateQuantity = async (req, res, next) => {
    const checkCart = await cartModal.findOne({ user: req.user._id })
    if (!checkCart) return next(new Error('cart not found', { cause: 404 }))

    const cartItem = checkCart.cartItems.find(elm => elm._id == req.params.id)
    if (!cartItem) return next(new Error('cart item not found', { cause: 404 }))

    cartItem.quantity = req.body.quantity
    totalCalc(checkCart)

    if (checkCart.discount) {
        checkCart.totalPriceAfterDiscount = checkCart.totalPrice - (checkCart.totalPrice * checkCart.discount) / 100
    }
    await checkCart.save()
    return res.json({ message: 'success', cart: checkCart })
}

const getCart = async (req, res, next) => {
    const cart = await cartModal.findOne({ user: req.user._id }).populate('cartItems.product')
    if (!cart) return next(new Error('cart not found', { cause: 404 }))
    return res.json({ message: 'success', cart })
}

const getAllCart = async (req, res, next) => {
    const apiFeatures = new ApiFeatures(cartModal.find(), req.query)
        .paginate().filter().sort().search().fields()
    const carts = await apiFeatures.reuseQuery
    return res.json({ message: 'success', page: apiFeatures.page, carts })
}

const applyCoupon = async (req, res, next) => {
    const coupon = await couponModal.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    if (!coupon) return next(new Error('coupon not active', { cause: 404 }))

    const cart = await cartModal.findOne({ user: req.user._id })
    if (!cart) return next(new Error('cart not found', { cause: 404 }))

    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount

    totalCalc(cart)
    await cart.save()

    return res.status(201).json({ message: 'success', cart })

}

export {
    addCart,
    deleteProductFromCart,
    updateQuantity,
    getCart,
    getAllCart,
    applyCoupon
}