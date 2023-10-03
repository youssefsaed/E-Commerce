import productModal from "../../../DB/model/product.modal.js"
import userModal from "../../../DB/model/user.modal.js"


const addWishlist = async (req, res, next) => {
    const product = await productModal.findOne({ _id: req.params.id })
    if (!product) return next(new Error('product not found'))
    const user = await userModal.findOneAndUpdate({ _id: req.user.id }, {
        $addToSet: {
            wishlist: product._id
        }

    }, { new: true })
    return res.json({ message: "success", wishlist: user.wishlist })
}
const removeWishlist = async (req, res, next) => {
    const product = await productModal.findOne({ _id: req.params.id })
    if (!product) return next(new Error('product not found'))
    const user = await userModal.findOneAndUpdate({ _id: req.user.id }, {
        $pull: {
            wishlist: product._id
        }

    }, { new: true })
    return res.json({ message: "success", wishlist: user.wishlist })
}

const getWishlistWithUser = async (req, res, next) => {
    const user = await userModal.findOne({ _id: req.user.id }).populate('wishlist')
    return res.json({ message: "success", wishlist: user.wishlist })
}

export {
    addWishlist,
    removeWishlist,
    getWishlistWithUser
}