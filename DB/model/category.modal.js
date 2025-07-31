import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is unique'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    image: String,
    slug: {
        type: String,
        lowercase: true,
        required: true
    }
}, { timestamps: true })

categorySchema.post('init', (doc) => {
    doc.image = process.env.BASE_URL + 'category/' + doc.image
})
const categoryModal = mongoose.model('category', categorySchema)

export default categoryModal