import { Router } from "express";
import * as categoryController from './category.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, categorySchema, updateCategorySchema } from "./category.validation.js";
import {uploadSingleFile} from "../../middleware/fileUpload.js";
const categoryRouter=Router()

categoryRouter.use('/:categoryId/subcategories',subCategoryRouter)
categoryRouter.route('/')
.post(uploadSingleFile('image','category'),validation(addCategorySchema),asyncHandler(categoryController.addCategory))
.get(asyncHandler(categoryController.getAllCategory))

categoryRouter.route('/:id')
.get(validation(categorySchema),asyncHandler(categoryController.getCategory))
.put(uploadSingleFile('image','category'),validation(updateCategorySchema),asyncHandler(categoryController.updateCategory))
.delete(validation(categorySchema),asyncHandler(categoryController.deleteCategory))






export default categoryRouter