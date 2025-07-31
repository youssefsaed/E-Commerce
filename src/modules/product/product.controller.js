import slugify from "slugify"
import productModal from "../../../DB/model/product.modal.js"
import Refactor from "../handler/reFactor.js"
import AppError from "../../utils/appError.js"


const addProduct = async (req, res, next) => {
    // req.body.slug = slugify(req.body.title)
    // req.body.imgCover = req.files.imgCover[0].filename
    // req.body.images = req.files.images.map(img => img.filename)

    const newproduct = new productModal({
        ...req.body,
        slug:slugify(req.body.title),
        imgCover: req.files.imgCover[0].filename,
        images:req.files.images.map(img => img.filename)
    })
    const product = await newproduct.save()
    return res.status(201).json({ message: 'success', product })
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    const result = await productModal.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) return next(new AppError('product not found', 404))
    return res.status(200).json({ message: 'success', result })
}

const getAllProduct = new Refactor(productModal).getAll()
const getProduct = new Refactor(productModal, 'product not found').getSpecificDocument()
const deleteProduct = new Refactor(productModal, 'product not found').deleteOne()

export {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}