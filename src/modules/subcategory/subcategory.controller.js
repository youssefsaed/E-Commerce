import slugify from "slugify"
import subCategoryModal from "../../../DB/model/subcategory.modal.js"
import categoryModal from "../../../DB/model/category.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addSubCategory = async (req, res, next) => {
    const { name } = req.body
    const { category } = req.body
    const newSubCategory = new subCategoryModal({ name, slug: slugify(name), category })
    const check = await categoryModal.findById(category)
    if (!check) return next(new Error('category id not found', { cause: 404 }))
    const subCategory = await newSubCategory.save()
    return res.json({ message: 'success', subCategory })
}

const getAllSubCategory = async (req, res, next) => {
    let filter = {}
    if (req.params.categoryId) {
        filter = { category: req.params.categoryId }
    }
    const apiFeatures = new ApiFeatures(subCategoryModal.find(filter), req.query)
        .paginate().filter().sort().search().fields()
    const subCategories = await apiFeatures.reuseQuery
    return res.json({ message: 'success', subCategories })
}


const getSubCategory = async (req, res, next) => {
    const { id } = req.params
    const subCategory = await subCategoryModal.findById(id)
    if (!subCategory) return next(new Error('subCategory not found', { cause: 404 }))
    return res.json({ message: 'success', subCategory })
}

const updateSubCategory = async (req, res, next) => {
    const { name, category } = req.body
    const { id } = req.params
    const check = await categoryModal.findById(category)
    if (!check) return next(new Error('category id not found', { cause: 404 }))
    const result = await subCategoryModal.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true })
    if (!result) return next(new Error('subcategory not found', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteSubCategory = async (req, res, next) => {
    const { id } = req.params
    const result = await subCategoryModal.findByIdAndDelete({ _id: id })
    if (!result) return next(new Error('subcategory not found', { cause: 404 }))
    return res.json({ message: 'success', result })
}

export {
    addSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}