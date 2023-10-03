import slugify from "slugify"
import productModal from "../../../DB/model/product.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"


const addProduct = async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map(img=>img.filename)

    const newproduct = new productModal(req.body)
    const product = await newproduct.save()
    return res.json({ message: 'success', product })
}

const getAllProduct = async (req, res, next) => {
    const apiFeatures = new ApiFeatures(productModal.find(), req.query)
        .paginate().filter().sort().search().fields()


    const products = await apiFeatures.reuseQuery

    return res.json({ message: 'success', page: apiFeatures.page, products })
}


const getProduct = async (req, res, next) => {
    const { id } = req.params
    const product = await productModal.findById(id)
    if (!product) return next(new Error('product not found', { cause: 404 }))
    return res.json({ message: 'success', product })
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map(img=>img.filename)
    const result = await productModal.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) return next(new Error('product not found', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    const result = await productModal.findByIdAndDelete({ _id: id })
    if (!result) return next(new Error('product not found', { cause: 404 }))
    return res.json({ message: 'success', result })
}

export {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}