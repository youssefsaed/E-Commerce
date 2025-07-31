import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'product title is unique'],
        trim: true,
        required: [true, 'Product title is required'],
        minLenght: [2, 'too short product name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'product price required'],
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    ratingAvg: {
        type: Number,
        min: [1, 'rating averge must be greater than 1'],
        max: [5, 'rating averge must be less than 5'],
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        minLenght: [5, 'too short product description'],
        maxLenght: [300, 'too long product description'],
        required: [true, 'product description required'],
        trim: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        required: [true, 'product quantity required']
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {  //categoryId
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: [true, 'product category required']
    },
    subCategory: { //subcategoryId
        type: mongoose.Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'product subcategory required']

    },
    brand: { //brandId
        type: mongoose.Types.ObjectId,
        ref: 'brand',
        required: [true, 'product brand required']
    },
    imgCover: String,
    images: [String]

}, { timestamps: true, toJSON: { virtuals: true } }) //Virtuals in JSON

//virtual 
productSchema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
});

productSchema.post('init', (doc) => {
    doc.imgCover = process.env.BASE_URL + 'product/' + doc.imgCover
    doc.images = doc.images.map(path => process.env.BASE_URL + 'product/' + path)
})

//populate
productSchema.pre(/^find/, function () {
    this.populate('reviews', 'comment -_id -product')
})

const productModal = mongoose.model('product', productSchema)

export default productModal