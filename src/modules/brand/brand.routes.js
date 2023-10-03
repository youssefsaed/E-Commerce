import { Router } from "express";
import * as brand from './brand.controller.js'
import asyncHandler from "../../utils/errorHanddling.js";
import { validation } from "../../middleware/validation.js";
import { addBrandSchema, brandSchema, updateBrandSchema } from "./brand.validation.js";
import {uploadSingleFile} from "../../middleware/fileUpload.js";
const BrandRouter = Router()


BrandRouter.route('/')
    .post(uploadSingleFile('logo', 'brand'), validation(addBrandSchema), asyncHandler(brand.addBrand))
    .get(asyncHandler(brand.getAllBrand))

BrandRouter.route('/:id')
    .get(validation(brandSchema), asyncHandler(brand.getBrand))
    .put(uploadSingleFile('logo', 'brand'), validation(updateBrandSchema), asyncHandler(brand.updateBrand))
    .delete(validation(brandSchema), asyncHandler(brand.deleteBrand))






export default BrandRouter