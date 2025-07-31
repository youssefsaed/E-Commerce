import { Router } from "express";
import * as categoryController from './category.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, categorySchema, updateCategorySchema } from "./category.validation.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
const categoryRouter = Router()

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter)
categoryRouter.route('/')
    .post(
        Auth(),
        allowTo('admin'),
        uploadSingleFile('image', 'category'),
        validation(addCategorySchema),
        asyncHandler(categoryController.addCategory)
    )
    .get(asyncHandler(categoryController.getAllCategory))

categoryRouter.route('/:id')
    .get(validation(categorySchema), asyncHandler(categoryController.getCategory))
    .put(
        Auth(),
        allowTo('admin'),
        uploadSingleFile('image', 'category'),
        validation(updateCategorySchema),
        asyncHandler(categoryController.updateCategory)
    )
    .delete(
        Auth(),
        allowTo('admin'),
        validation(categorySchema),
        asyncHandler(categoryController.deleteCategory)
    )



export default categoryRouter