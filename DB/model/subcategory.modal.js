import mongoose from "mongoose";

const subcategorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minLength:[2,'too short subCategory name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    category:{  //categoryId
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
},{timestamps:true})

const subCategoryModal=mongoose.model('subcategory',subcategorySchema)

export default subCategoryModal