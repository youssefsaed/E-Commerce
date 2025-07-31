import slugify from "slugify"
import categoryModal from "../../../DB/model/category.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import Refactor from "../handler/reFactor.js"
import AppError from "../../utils/appError.js"


const addCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    if (req.file.filename) {
        req.body.image = req.file.filename
    }
    const newCategory = new categoryModal(req.body)
    const category = await newCategory.save()
    return res.status(201).json({ message: 'success', category })
}


const updateCategory = async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file.filename) {
        req.body.image = req.file.filename
    }
    const result = await categoryModal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!result) return next(new AppError('category not found', 404))
        return res.status(200).json({ message: 'success', result })
}

const getAllCategory = new Refactor(categoryModal).getAll()
const getCategory = new Refactor(categoryModal, 'category not found').getSpecificDocument()
const deleteCategory = new Refactor(categoryModal, 'category not found').deleteOne()

export {
    addCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}