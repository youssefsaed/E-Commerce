import { Router } from "express";
import * as product from './product.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addProductSchema, productSchema, updateProductSchema } from "./product.validation.js";
import { uploadFiles} from "../../middleware/fileUpload.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
const productRouter = Router()
let arrayFields = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 7 }]

productRouter.route('/')
    .post(Auth(),allowTo('admin'), uploadFiles(arrayFields, 'product'), validation(addProductSchema), asyncHandler(product.addProduct))
    .get(asyncHandler(product.getAllProduct))

productRouter.route('/:id')
    .get(validation(productSchema), asyncHandler(product.getProduct))
    .put(Auth(),allowTo('admin'),uploadFiles(arrayFields, 'product'), validation(updateProductSchema), asyncHandler(product.updateProduct))
    .delete(Auth(),allowTo('admin'),validation(productSchema), asyncHandler(product.deleteProduct))





export default productRouter