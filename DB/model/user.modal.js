import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        unique: [true, 'email is unique']
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minLength: [5, 'minLength 5 characters']
    },
    phone: {
        type: String,
        required: [true, 'phone number required']
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin','superAdmin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    changePasswordDate: Date,
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    address: [{
        city: String,
        street: String,
        phone: String
    }],
    codeVerify: String

}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, +process.env.SALTROUND)
})
userSchema.methods.cheackPassword = function (password) {
    return bcrypt.compareSync(password, this.password) ? true : false
}

const userModal = mongoose.model('user', userSchema)


export default userModal