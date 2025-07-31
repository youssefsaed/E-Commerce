
import slugify from "slugify"
import brandModal from "../../../DB/model/brand.modal.js"
import AppError from "../../utils/appError.js"
import Refactor from "../handler/reFactor.js"

const addBrand = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    const newBrand = new brandModal(req.body)
    const Brand = await newBrand.save()
    return res.status(201).json({ message: 'success', Brand })
}

const updateBrand = async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    req.body.logo = req.file.filename
    const result = await brandModal.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (!result) return next(new AppError('Brand not found', 404 ))
        return res.status(200).json({ message: 'success', result })
}

const getAllBrand = new Refactor(brandModal).getAll()
const getBrand = new Refactor(brandModal,'Brand not found').getSpecificDocument()
const deleteBrand = new Refactor(brandModal,'Brand not found').deleteOne()

export {
    addBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand
}