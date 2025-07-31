import { Router } from "express";
import * as subCategoryController from './subcategory.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addSubCategorySchema, subCategorySchema, updateSubCategorySchema } from "./subcategory.validation.js";
import allowTo from "../../middleware/allowTo.js";
import Auth from "../../middleware/authroization.js";
const subCategoryRouter = Router({ mergeParams: true })


subCategoryRouter.route('/')
    .post(
        Auth(),
        allowTo('admin'),
        validation(addSubCategorySchema),
        asyncHandler(subCategoryController.addSubCategory)
    )
    .get(asyncHandler(subCategoryController.getAllSubCategory))

subCategoryRouter.route('/:id')
    .get(
        validation(subCategorySchema),
        asyncHandler(subCategoryController.getSubCategory)
    )
    .put(
        Auth(),
        allowTo('admin'),
        validation(updateSubCategorySchema),
        asyncHandler(subCategoryController.updateSubCategory)
    )
    .delete(
        Auth(),
        allowTo('admin'),
        validation(subCategorySchema),
        asyncHandler(subCategoryController.deleteSubCategory)
    )






export default subCategoryRouter