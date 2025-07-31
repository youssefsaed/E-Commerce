import slugify from "slugify"
import subCategoryModal from "../../../DB/model/subcategory.modal.js"
import categoryModal from "../../../DB/model/category.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import AppError from "../../utils/appError.js"
import Refactor from "../handler/reFactor.js"

const addSubCategory = async (req, res, next) => {
    const { name } = req.body
    const { category } = req.body
    const newSubCategory = new subCategoryModal({ name, slug: slugify(name), category })
    const found = await categoryModal.findById(category)
    if (!found) return next(new AppError('category id not found', 404))
    const subCategory = await newSubCategory.save()
    return res.status(201).json({ message: 'success', subCategory })
}

const getAllSubCategory = async (req, res, next) => {
    let filter = {}
    if (req.params.categoryId) {
        filter = { category: req.params.categoryId }
    }
    const apiFeatures = new ApiFeatures(subCategoryModal.find(filter), req.query)
        .paginate().filter().sort().search()
    const subCategories = await apiFeatures.reuseQuery
    return res.status(200).json({ message: 'success', subCategories })
}

const updateSubCategory = async (req, res, next) => {
    const { name, category } = req.body
    const { id } = req.params
    const found = await categoryModal.findById(category)
    if (!found) return next(new AppError('category id not found', 404))
        const result = await subCategoryModal.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true })
    if (!result) return next(new AppError('subcategory not found', 404))
        return res.status(200).json({ message: 'success', result })
}

const getSubCategory = new Refactor(subCategoryModal,'subCategory not found').getSpecificDocument()
const deleteSubCategory = new Refactor(subCategoryModal,'subcategory not found').deleteOne()

export {
    addSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}