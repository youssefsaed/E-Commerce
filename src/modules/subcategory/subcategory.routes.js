import { Router } from "express";
import * as subCategoryController from './subcategory.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addSubCategorySchema, subCategorySchema, updateSubCategorySchema } from "./subcategory.validation.js";
const subCategoryRouter=Router({mergeParams:true})


subCategoryRouter.route('/')
.post(validation(addSubCategorySchema),asyncHandler(subCategoryController.addSubCategory))
.get(asyncHandler(subCategoryController.getAllSubCategory))

subCategoryRouter.route('/:id')
.get(validation(subCategorySchema),asyncHandler(subCategoryController.getSubCategory))
.put(validation(updateSubCategorySchema),asyncHandler(subCategoryController.updateSubCategory))
.delete(validation(subCategorySchema),asyncHandler(subCategoryController.deleteSubCategory))






export default subCategoryRouter