import { ApiFeatures } from "../../utils/ApiFeatures.js"
import AppError from "../../utils/appError.js"



class Refactor {
    constructor(model, errorMessage = 'document not found') {
        this.model = model
        this.errorMessage = errorMessage
    }
    deleteOne() {
        return async (req, res, next) => {
            const result = await this.model.findByIdAndDelete(req.params.id)
            if (!result) return next(new AppError(this.errorMessage, 404))
            return res.status(200).json({ message: 'success', result })
        }
    }
    getAll() {
        return async (req, res, next) => {
            const apiFeatures = new ApiFeatures(this.model.find(), req.query)
                .paginate().filter().sort().search()
            const documents = await apiFeatures.reuseQuery
            return res.status(200).json({ message: 'success', page: apiFeatures.page, documents })
        }
    }

    getSpecificDocument() {
        return async (req, res, next) => {
            const document = await this.model.findById(req.params.id)
            if (!document) return next(new AppError(this.errorMessage, 404))
            return res.status(200).json({ message: 'success', document })
        }
    }
}
export default Refactor