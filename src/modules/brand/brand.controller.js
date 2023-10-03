
import slugify from "slugify"
import brandModal from "../../../DB/model/brand.modal.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addBrand = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    const newBrand = new brandModal(req.body)
    const Brand = await newBrand.save()
    return res.json({ message: 'success', Brand })
}

const getAllBrand = async (req, res, next) => {
    const apiFeatures = new ApiFeatures(brandModal.find(), req.query)
        .paginate().filter().sort().search().fields()
    const brands = await apiFeatures.reuseQuery
    return res.json({ message: 'success', page: apiFeatures.page, brands })
}


const getBrand = async (req, res, next) => {
    const { id } = req.params
    const Brand = await brandModal.findById(id)
    if (!Brand) return next(new Error('Brand not found', { cause: 404 }))
    return res.json({ message: 'success', Brand })
}

const updateBrand = async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    req.body.logo = req.file.filename
    const result = await brandModal.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) return next(new Error('fail', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteBrand = async (req, res, next) => {
    const { id } = req.params
    const result = await brandModal.findByIdAndDelete({ _id: id })
    if (!result) return next(new Error('fail', { cause: 404 }))
    return res.json({ message: 'success', result })
}

export {
    addBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand
}