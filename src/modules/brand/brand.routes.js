import { Router } from "express";
import * as brand from './brand.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addBrandSchema, brandSchema, updateBrandSchema } from "./brand.validation.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import Auth from "../../middleware/authroization.js";
import allowTo from "../../middleware/allowTo.js";
const BrandRouter = Router()


BrandRouter.route('/')
    .post(
        Auth(),
        allowTo('admin'),
        uploadSingleFile('logo', 'brand'),
        validation(addBrandSchema),
        asyncHandler(brand.addBrand)
    )
    .get(asyncHandler(brand.getAllBrand))

BrandRouter.route('/:id')
    .get(
        validation(brandSchema),
        asyncHandler(brand.getBrand)
    )
    .put(
        Auth(),
        allowTo('admin'),
        uploadSingleFile('logo', 'brand'),
        validation(updateBrandSchema),
        asyncHandler(brand.updateBrand)
    )
    .delete(
        Auth(),
        allowTo('admin'),
        validation(brandSchema),
        asyncHandler(brand.deleteBrand)
    )






export default BrandRouter