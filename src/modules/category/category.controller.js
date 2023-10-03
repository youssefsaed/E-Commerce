import slugify from "slugify"
import categoryModal from "../../../DB/model/category.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename

    const newCategory = new categoryModal(req.body)
    const category = await newCategory.save()
    return res.json({ message: 'success', category })
}

const getAllCategory = async (req, res, next) => {

    const apiFeatures = new ApiFeatures(categoryModal.find(), req.query)
        .paginate().filter().sort().search().fields()
    const categories = await apiFeatures.reuseQuery
    return res.json({ message: 'success', page: apiFeatures.page, categories })
}


const getCategory = async (req, res, next) => {
    const { id } = req.params
    const category = await categoryModal.findById(id)
    if (!category) return next(new Error('category not found', { cause: 404 }))
    return res.json({ message: 'success', category })
}

const updateCategory = async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file.filename) {
        req.body.image = req.file.filename
    }
    const { id } = req.params
    const result = await categoryModal.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) return next(new Error('category not found', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    const result = await categoryModal.findByIdAndDelete(id)
    if (!result) return next(new Error('category not found', { cause: 404 }))
    return res.json({ message: 'success', result })
}

export {
    addCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}